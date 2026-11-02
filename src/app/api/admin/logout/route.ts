import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, assertSameOrigin } from '@/lib/admin-auth';
import { errorResponse } from '@/lib/api';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const response = NextResponse.json({ authenticated: false });
    response.cookies.set(ADMIN_COOKIE, '', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 0, path: '/' });
    return response;
  } catch (error) { return errorResponse(error); }
}
