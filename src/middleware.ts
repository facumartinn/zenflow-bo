/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware (request: NextRequest) {
  const token = request.cookies.get('token')
  const tenantId = request.cookies.get('tenant_id')
  const warehouseId = request.cookies.get('warehouse_id')

  // Si estamos en la página de login y hay token, redirigimos a home
  if (request.nextUrl.pathname === '/auth/sign-in') {
    if (token && tenantId && warehouseId) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
  }

  // Si no estamos en login y no hay token, redirigimos a login
  if (!token || !tenantId || !warehouseId) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
