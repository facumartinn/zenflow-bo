/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/src/utils/auth/token'

export async function GET () {
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  if (!token) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 })
  }

  try {
    const decoded = await verifyToken(token.value)
    return NextResponse.json({ isAuthenticated: true, user: decoded })
  } catch {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 })
  }
}
