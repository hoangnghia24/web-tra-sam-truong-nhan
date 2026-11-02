import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import bcrypt from 'bcryptjs';
import { ApiInputError } from './api';

export const ADMIN_COOKIE = 'truong_nhan_admin';
const SESSION_SECONDS = 8 * 60 * 60;

function secret() {
  const value = process.env.SESSION_SECRET;
  if (!value || value.length < 32) throw new Error('SESSION_SECRET phải có ít nhất 32 ký tự');
  return value;
}

function signature(payload: string) {
  return createHmac('sha256', secret()).update(payload).digest('hex');
}

export async function verifyAdminPassword(password: string) {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!hash || !process.env.SESSION_SECRET) throw new ApiInputError('Quản trị chưa được cấu hình.', 503);
  return bcrypt.compare(password, hash);
}

export function createAdminSession(now = Date.now()) {
  const payload = `${Math.floor(now / 1000) + SESSION_SECONDS}.${randomBytes(16).toString('hex')}`;
  return `${payload}.${signature(payload)}`;
}

export function verifyAdminSession(token: string | undefined, now = Date.now()) {
  if (!token || !process.env.SESSION_SECRET) return false;
  const parts = token.split('.');
  if (parts.length !== 3 || !/^\d+$/.test(parts[0]) || !/^[a-f0-9]{32}$/.test(parts[1]) || !/^[a-f0-9]{64}$/.test(parts[2])) return false;
  if (Number(parts[0]) <= Math.floor(now / 1000)) return false;
  const expected = Buffer.from(signature(`${parts[0]}.${parts[1]}`), 'hex');
  const actual = Buffer.from(parts[2], 'hex');
  return timingSafeEqual(expected, actual);
}

export function requireAdmin(request: Request) {
  const cookie = request.headers.get('cookie')?.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${ADMIN_COOKIE}=`));
  const token = cookie?.slice(ADMIN_COOKIE.length + 1);
  if (!verifyAdminSession(token)) throw new ApiInputError('Cần đăng nhập quản trị.', 401);
}

export function assertSameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) throw new ApiInputError('Yêu cầu khác nguồn không được phép.', 403);
}
