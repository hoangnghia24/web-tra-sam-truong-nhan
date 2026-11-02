import { z } from 'zod';
import { JsonStoreError } from './json-store';

const MAX_BODY_BYTES = 16_384;
const WINDOW_MS = 60_000;
const limits = new Map<string, { count: number; until: number }>();

export class ApiInputError extends Error {
  constructor(message: string, public readonly status = 400) { super(message); }
}

export async function validatedBody<T>(request: Request, schema: z.ZodType<T>): Promise<T> {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) throw new ApiInputError('Yêu cầu khác nguồn không được phép', 403);
  if (!request.headers.get('content-type')?.toLowerCase().includes('application/json')) throw new ApiInputError('Cần gửi JSON');
  const text = await request.text();
  if (Buffer.byteLength(text, 'utf8') > MAX_BODY_BYTES) throw new ApiInputError('Nội dung quá lớn', 413);
  let parsed: unknown;
  try { parsed = JSON.parse(text); } catch { throw new ApiInputError('JSON không hợp lệ'); }
  const result = schema.safeParse(parsed);
  if (!result.success) throw new ApiInputError('Dữ liệu không hợp lệ: ' + result.error.issues.map((issue) => issue.message).join('; '));
  return result.data;
}

export function enforceRateLimit(request: Request, bucket: string, max = 12) {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const key = `${bucket}:${forwarded || 'local'}`;
  const now = Date.now();
  const current = limits.get(key);
  if (!current || current.until <= now) { limits.set(key, { count: 1, until: now + WINDOW_MS }); return; }
  if (current.count >= max) throw new ApiInputError('Bạn gửi quá nhanh. Vui lòng thử lại sau một phút.', 429);
  current.count += 1;
  if (limits.size > 5000) for (const [entry, value] of limits) if (value.until <= now) limits.delete(entry);
}

export function errorResponse(error: unknown): Response {
  if (error instanceof ApiInputError) return Response.json({ error: error.message }, { status: error.status });
  if (error instanceof JsonStoreError && error.causeCode === 'NOT_FOUND') return Response.json({ error: 'Không tìm thấy bản ghi' }, { status: 404 });
  console.error('API error:', error);
  return Response.json({ error: 'Không thể xử lý yêu cầu lúc này.' }, { status: 500 });
}
