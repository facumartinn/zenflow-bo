/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './utils/auth/token'

export async function middleware (request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth')

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url))
  }

  if (token && isAuthPage) {
    try {
      await verifyToken(token)
      return NextResponse.redirect(new URL('/', request.url))
    } catch {
      return NextResponse.next()
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|static).*)'
  ]
}
