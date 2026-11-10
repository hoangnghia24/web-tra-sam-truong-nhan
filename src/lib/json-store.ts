import { randomUUID } from 'node:crypto';
import { access, copyFile, mkdir, open, readFile, rename, unlink } from 'node:fs/promises';
import { dirname, isAbsolute, join, resolve, sep } from 'node:path';
import type { z } from 'zod';

type Identified = { id: string };

export class JsonStoreError extends Error {
  constructor(message: string, public readonly causeCode: 'PATH' | 'MISSING' | 'INVALID' | 'DUPLICATE' | 'NOT_FOUND' | 'IO') {
    super(message);
    this.name = 'JsonStoreError';
  }
}

export function createJsonStore(root = join(process.cwd(), 'data')) {
  // The root is explicitly the local data directory (or an isolated test directory).
  // Suppress broad output tracing of unrelated workspace files, including the PDF reference.
  const rootPath = resolve(/*turbopackIgnore: true*/ root);
  const queues = new Map<string, Promise<unknown>>();

  function pathFor(relativePath: string) {
    if (isAbsolute(relativePath) || !/^(content|seed|runtime)[\\/]/.test(relativePath)) {
      throw new JsonStoreError('Đường dẫn JSON không hợp lệ', 'PATH');
    }
    const file = resolve(rootPath, relativePath);
    if (!file.startsWith(rootPath + sep) || !file.endsWith('.json')) {
      throw new JsonStoreError('Đường dẫn JSON vượt phạm vi dữ liệu', 'PATH');
    }
    return file;
  }

  function serialize<T>(file: string, task: () => Promise<T>): Promise<T> {
    const previous = queues.get(file) ?? Promise.resolve();
    const operation = previous.then(task, task);
    queues.set(file, operation.catch(() => undefined));
    return operation;
  }

  async function exists(file: string) {
    try { await access(file); return true; } catch { return false; }
  }

  async function parseFile<T>(file: string, schema: z.ZodType<T>): Promise<T> {
    let text: string;
    try { text = await readFile(file, 'utf8'); }
    catch { throw new JsonStoreError(`Không đọc được ${file}`, 'IO'); }
    try { return schema.parse(JSON.parse(text)); }
    catch { throw new JsonStoreError(`JSON không hợp lệ tại ${file}; file đã được giữ nguyên`, 'INVALID'); }
  }

  async function writeInternal<T>(file: string, value: T, schema: z.ZodType<T>, checkExisting = true) {
    const validated = schema.parse(value);
    await mkdir(dirname(file), { recursive: true });
    const alreadyExists = await exists(file);
    if (alreadyExists && checkExisting) await parseFile(file, schema);
    const temporary = `${file}.${randomUUID()}.tmp`;
    try {
      const handle = await open(temporary, 'wx');
      try { await handle.writeFile(JSON.stringify(validated, null, 2) + '\n', 'utf8'); await handle.sync(); }
      finally { await handle.close(); }
      if (alreadyExists) await copyFile(file, `${file}.bak`);
      await rename(temporary, file);
    } catch (error) {
      try { await unlink(temporary); } catch { /* temporary file may not exist */ }
      throw new JsonStoreError(`Không thể ghi JSON tại ${file}: ${error instanceof Error ? error.message : String(error)}`, 'IO');
    }
  }

  async function ensureInternal<T>(relativePath: string, schema: z.ZodType<T>): Promise<T> {
    const file = pathFor(relativePath);
    if (await exists(file)) return parseFile(file, schema);
    if (!relativePath.startsWith('runtime/')) throw new JsonStoreError(`Thiếu file nội dung: ${relativePath}`, 'MISSING');
    const seed = pathFor(`seed/${relativePath.slice('runtime/'.length)}`);
    // A read must also work on deployments where the application directory is read-only.
    // The first mutation creates the runtime file through writeInternal.
    return (await exists(seed)) ? parseFile(seed, schema) : schema.parse([]);
  }

  function readJson<T>(relativePath: string, schema: z.ZodType<T>): Promise<T> {
    const file = pathFor(relativePath);
    return serialize(file, () => ensureInternal(relativePath, schema));
  }

  function ensureJsonFile<T>(relativePath: string, schema: z.ZodType<T>): Promise<T> {
    const file = pathFor(relativePath);
    return serialize(file, async () => {
      const value = await ensureInternal(relativePath, schema);
      if (!(await exists(file)) && relativePath.startsWith('runtime/')) await writeInternal(file, value, schema, false);
      return value;
    });
  }

  function writeJsonAtomic<T>(relativePath: string, value: T, schema: z.ZodType<T>): Promise<void> {
    const file = pathFor(relativePath);
    return serialize(file, async () => { await writeInternal(file, value, schema); });
  }

  function appendRecord<T extends Identified>(relativePath: string, record: T, recordSchema: z.ZodType<T>): Promise<T> {
    const file = pathFor(relativePath);
    const arraySchema = recordSchema.array();
    return serialize(file, async () => {
      const records = await ensureInternal(relativePath, arraySchema);
      const validated = recordSchema.parse(record);
      if (records.some((item) => item.id === validated.id)) throw new JsonStoreError(`ID đã tồn tại: ${validated.id}`, 'DUPLICATE');
      await writeInternal(file, [...records, validated], arraySchema);
      return validated;
    });
  }

  function updateRecord<T extends Identified>(relativePath: string, id: string, update: (record: T) => T, recordSchema: z.ZodType<T>): Promise<T> {
    const file = pathFor(relativePath);
    const arraySchema = recordSchema.array();
    return serialize(file, async () => {
      const records = await ensureInternal(relativePath, arraySchema);
      const index = records.findIndex((item) => item.id === id);
      if (index < 0) throw new JsonStoreError(`Không tìm thấy ID: ${id}`, 'NOT_FOUND');
      const changed = recordSchema.parse(update(records[index]));
      if (changed.id !== id) throw new JsonStoreError('Không được thay đổi ID', 'INVALID');
      const next = [...records]; next[index] = changed;
      await writeInternal(file, next, arraySchema);
      return changed;
    });
  }

  function deleteRecord<T extends Identified>(relativePath: string, id: string, recordSchema: z.ZodType<T>): Promise<boolean> {
    const file = pathFor(relativePath);
    const arraySchema = recordSchema.array();
    return serialize(file, async () => {
      const records = await ensureInternal(relativePath, arraySchema);
      const next = records.filter((item) => item.id !== id);
      if (next.length === records.length) return false;
      await writeInternal(file, next, arraySchema);
      return true;
    });
  }

  return { readJson, writeJsonAtomic, appendRecord, updateRecord, deleteRecord, ensureJsonFile };
}

export const { readJson, writeJsonAtomic, appendRecord, updateRecord, deleteRecord, ensureJsonFile } = createJsonStore();
