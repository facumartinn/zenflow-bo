/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/src/utils/auth/token'

export async function withAuth (request: NextRequest) {
  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url))
  }

  try {
    const decoded = await verifyToken(token)
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('Authorization', token)
    requestHeaders.set('x-user-data', JSON.stringify(decoded))

    return NextResponse.next({
      request: {
        headers: requestHeaders
      }
    })
  } catch {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url))
  }
}
