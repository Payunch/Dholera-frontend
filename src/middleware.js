import { NextResponse } from 'next/server';


export function middleware(request) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('admin_access_token')?.value;

    // Protect admin dashboard routes
    if (pathname.startsWith('/admin/leads')) {
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
            url.pathname = '/admin/leads';
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/leads', '/admin/leads/:path*', '/admin/login'],
};
