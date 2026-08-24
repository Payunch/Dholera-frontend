import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('admin_access_token')?.value;

    const secretStr = process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET;

    // Protect all admin routes except login
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        if (!secretStr) {
            console.error("Missing JWT Secret in middleware");
            return new NextResponse("Server Configuration Error: Missing JWT Secret", { status: 500 });
        }

        if (!token) {
            const url = request.nextUrl.clone();
            url.pathname = '/admin/login';
            return NextResponse.redirect(url);
        }
        try {
            const secret = new TextEncoder().encode(secretStr);
            await jwtVerify(token, secret, { algorithms: ['HS256'] });
        } catch (err) {
            const url = request.nextUrl.clone();
            url.pathname = '/admin/login';
            return NextResponse.redirect(url);
        }
    }

    // Redirect away from login if already authenticated
    if (pathname === '/admin/login') {
        if (token && secretStr) {
            try {
                const secret = new TextEncoder().encode(secretStr);
                await jwtVerify(token, secret, { algorithms: ['HS256'] });
                const url = request.nextUrl.clone();
                url.pathname = '/admin/leads'; // Default dashboard after login
                return NextResponse.redirect(url);
            } catch (err) {
                // Token invalid, allow them to stay on login page
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
