import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth-client';

export async function middleware(request) {
  // Always fetch fresh session
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

  // Add cache control headers to prevent stale data
  const response = NextResponse.next();
  
  if (isAuthenticated) {
    response.headers.set('Cache-Control', 'no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
  }

  return response;
}

export const config = {
  matcher: ['/auth', '/dashboard/:path*', '/admin/:path*', '/verify-email'],
};