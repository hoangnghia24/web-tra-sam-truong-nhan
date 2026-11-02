import { NextResponse } from 'next/server';
import { z } from 'zod';
import { ApiInputError, enforceRateLimit, errorResponse, validatedBody } from '@/lib/api';
import { ADMIN_COOKIE, createAdminSession, verifyAdminPassword } from '@/lib/admin-auth';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    enforceRateLimit(request, 'admin-login', 5);
    const { password } = await validatedBody(request, z.object({ password: z.string().min(1).max(200) }));
    if (!(await verifyAdminPassword(password))) throw new ApiInputError('Mật khẩu không đúng.', 401);
    const response = NextResponse.json({ authenticated: true });
    response.cookies.set(ADMIN_COOKIE, createAdminSession(), { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 8 * 60 * 60, path: '/' });
    return response;
  } catch (error) { return errorResponse(error); }
}
