import { NextResponse } from 'next/server';


export function middleware(request) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('admin_access_token')?.value;

    // Protect all admin routes except login
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        if (!token) {
            const url = request.nextUrl.clone();
            url.pathname = '/admin/login';
            return NextResponse.redirect(url);
        }
    }

    // Redirect away from login if already authenticated
    if (pathname === '/admin/login') {
        if (token) {
            const url = request.nextUrl.clone();
            url.pathname = '/admin/leads'; // Default dashboard after login
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
