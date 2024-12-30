import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import Cookies from 'js-cookie'
import { type User } from '../types/user'

interface AuthState {
  user: User | null
  token: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  login: (user: User, token: string, refreshToken: string, tenantId: string, warehouseId: string, remember?: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      login: (user: User, token: string, refreshToken: string, tenantId: string, warehouseId: string, remember = false) => {
        const cookieOptions = {
          expires: remember ? 180 : 1,
          secure: true,
          sameSite: 'Strict' as const,
          httpOnly: true
        }
        console.log(user, 'user')
        console.log(token, 'token')
        console.log(refreshToken, 'refreshToken')
        console.log(tenantId, 'tenantId')
        console.log(warehouseId, 'warehouseId')

        if (refreshToken) {
          Cookies.set('refresh_token', refreshToken, {
            ...cookieOptions,
            path: '/api/auth/refresh'
          })
        }

        Cookies.set('token', token, cookieOptions)
        Cookies.set('tenant_id', tenantId, cookieOptions)
        Cookies.set('warehouse_id', warehouseId, cookieOptions)

        set({
          user,
          token,
          refreshToken,
          isAuthenticated: true
        })
      },
      logout: () => {
        Cookies.remove('token')
        Cookies.remove('tenant_id')
        Cookies.remove('warehouse_id')
        Cookies.remove('refresh_token')
        set({ user: null, token: null, refreshToken: null, isAuthenticated: false })
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
)
