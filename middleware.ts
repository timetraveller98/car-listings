import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
const AUTH_SECRET = process.env.NEXTAUTH_SECRET;
const PUBLIC_ROUTES = [
  '/login',
  '/forget',
  '/signup',
  '/api/reset',
  '/api/verify',
  '/api/forget',
];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: AUTH_SECRET });
  const { pathname } = req.nextUrl;
  if (
    token &&
    (PUBLIC_ROUTES.includes(pathname) || pathname.startsWith('/reset-password'))
  ) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/forget',
    '/signup',
    '/reset-password/:path*',
    '/api/reset',
    '/api/verify',
    '/api/forget',
    '/admin',
  ],
};
