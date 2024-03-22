/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextMiddlewareWithAuth, withAuth, type NextAuthMiddlewareOptions } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

const handler: NextMiddlewareWithAuth = (request) => {
  const session = request.nextauth

  if (!session) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.nextUrl.origin))
  }
}

const options: NextAuthMiddlewareOptions = {
  pages: {
    signIn: '/auth/sign-in'
  }
}

export default withAuth(handler, options)

export const config = { matcher: '/((?!api|static|.*\\..*|_next).*)' }
