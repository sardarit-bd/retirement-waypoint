import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth-client';

export async function middleware(request) {
  const session = await getSession();
  const isAuthenticated = !!session?.data;
  const path = request.nextUrl.pathname;

  // Auth routes - redirect if already authenticated
  if (path === '/auth' && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Protected routes - redirect to auth if not authenticated
  if (path.startsWith('/dashboard') && !isAuthenticated) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  if (path.startsWith('/admin') && !isAuthenticated) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/auth', '/dashboard/:path*', '/admin/:path*'],
};