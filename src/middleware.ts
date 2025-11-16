import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(
    process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME as string,
  )?.value;
  if (!accessToken) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('from', request.url);

    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*'],
};
