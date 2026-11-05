import { randomUUID } from 'node:crypto';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { z } from 'zod';
import { createJsonStore, JsonStoreError } from './json-store';

const recordSchema = z.object({ id: z.uuid(), value: z.number().int() });
let root: string;

beforeEach(async () => {
  root = await mkdtemp(join(tmpdir(), 'truong-nhan-store-test-'));
  await mkdir(join(root, 'seed'));
  await writeFile(join(root, 'seed', 'records.json'), '[]\n', 'utf8');
});

afterEach(async () => {
  if (root.startsWith(tmpdir()) && root.includes('truong-nhan-store-test-')) await rm(root, { recursive: true, force: true });
});

describe('JSON storage', () => {
  it('initializes from seed, serializes concurrent appends, and survives a new store instance', async () => {
    const store = createJsonStore(root);
    expect(await store.readJson('runtime/records.json', recordSchema.array())).toEqual([]);
    await expect(readFile(join(root, 'runtime', 'records.json'), 'utf8')).rejects.toMatchObject({ code: 'ENOENT' });
    const records = Array.from({ length: 25 }, (_, value) => ({ id: randomUUID(), value }));
    await Promise.all(records.map((record) => store.appendRecord('runtime/records.json', record, recordSchema)));
    const freshStore = createJsonStore(root);
    const persisted = await freshStore.readJson('runtime/records.json', recordSchema.array());
    expect(persisted).toHaveLength(25);
    expect(persisted.map((record) => record.value).sort((a, b) => a - b)).toEqual(Array.from({ length: 25 }, (_, i) => i));
    expect(JSON.parse(await readFile(join(root, 'runtime', 'records.json.bak'), 'utf8'))).toHaveLength(24);
  });

  it('refuses duplicate IDs and keeps malformed JSON untouched', async () => {
    const store = createJsonStore(root);
    const record = { id: randomUUID(), value: 7 };
    await store.appendRecord('runtime/records.json', record, recordSchema);
    await expect(store.appendRecord('runtime/records.json', record, recordSchema)).rejects.toMatchObject({ causeCode: 'DUPLICATE' });
    const file = join(root, 'runtime', 'records.json');
    await writeFile(file, '{broken', 'utf8');
    await expect(store.appendRecord('runtime/records.json', { id: randomUUID(), value: 8 }, recordSchema)).rejects.toBeInstanceOf(JsonStoreError);
    expect(await readFile(file, 'utf8')).toBe('{broken');
  });

  it('updates and deletes a specific record without changing other records', async () => {
    const store = createJsonStore(root);
    const first = { id: randomUUID(), value: 1 };
    const second = { id: randomUUID(), value: 2 };
    await store.appendRecord('runtime/records.json', first, recordSchema);
    await store.appendRecord('runtime/records.json', second, recordSchema);
    const changed = await store.updateRecord('runtime/records.json', first.id, (record) => ({ ...record, value: 9 }), recordSchema);
    expect(changed.value).toBe(9);
    expect(await store.deleteRecord('runtime/records.json', second.id, recordSchema)).toBe(true);
    expect(await store.readJson('runtime/records.json', recordSchema.array())).toEqual([changed]);
  });

  it('rejects traversal outside the data root', async () => {
    const store = createJsonStore(root);
    expect(() => store.readJson('runtime/../../secret.json', recordSchema.array())).toThrowError(JsonStoreError);
  });
});
