/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '../store/authStore'

export function AuthGuard ({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { token, isAuthenticated } = useAuthStore()

  useEffect(() => {
    if (!token) {
      router.push('/login')
    }
  }, [token, router])

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
