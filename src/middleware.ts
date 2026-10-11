import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET || 'super-secret-development-key';
  return new TextEncoder().encode(secret);
};

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = request.nextUrl;
  const ALLOWED_ORIGIN = 'https://the-kidpreneur-journey.com';
  const hostname = request.headers.get('host') || '';

  // 1. Subdomain Routing
  let rewritten = false;
  if (hostname.startsWith('api.') && !pathname.startsWith('/api')) {
    url.pathname = `/api${pathname}`;
    rewritten = true;
  } else if (hostname.startsWith('admin.') && !pathname.startsWith('/admin') && !pathname.startsWith('/api')) {
    url.pathname = `/admin${pathname}`;
    rewritten = true;
  }

  const activePathname = rewritten ? url.pathname : pathname;

  // 2. Auth & CORS Logic

  // Handle preflight requests for API routes
  if (activePathname.startsWith('/api') && request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  // Protect /admin routes (except /admin/login)
  if (activePathname.startsWith('/admin') && !activePathname.startsWith('/admin/login')) {
    const adminToken = request.cookies.get('admin_token')?.value;

    if (!adminToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const { payload } = await jwtVerify(adminToken, getJwtSecretKey());
      
      // Strict role enforcement
      if (payload.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    } catch {
      // Token is invalid or expired
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('admin_token');
      return response;
    }
  }

  // Prevent logged-in admins from accessing /admin/login again
  if (activePathname === '/admin/login') {
    const adminToken = request.cookies.get('admin_token')?.value;
    if (adminToken) {
      try {
        const { payload } = await jwtVerify(adminToken, getJwtSecretKey());
        if (payload.role === 'ADMIN') {
          return NextResponse.redirect(new URL('/admin', request.url));
        }
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
  }

  // Forward the request (either rewrite or next)
  const response = rewritten ? NextResponse.rewrite(url) : NextResponse.next();
  
  if (activePathname.startsWith('/api')) {
    response.headers.set('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
