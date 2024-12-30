/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type User } from '@/src/types/user'
import { useAuthStore } from '@/src/store/authStore'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

export const getSession = () => {
  const state = useAuthStore.getState()
  const cookieToken = Cookies.get('token')

  // Si no hay token en las cookies, limpiamos el estado
  if (!cookieToken) {
    clearSession()
    return {
      user: null,
      token: null,
      isAuthenticated: false
    }
  }

  return {
    user: state.user,
    token: cookieToken,
    isAuthenticated: !!cookieToken
  }
}

export const setSession = async (user: User, token: string) => {
  const decodedToken = jwtDecode<{ tenant_id: string, warehouse_id: string }>(token)
  await useAuthStore.getState().login(user, token, '', decodedToken.tenant_id as string, decodedToken.warehouse_id as string, true)
}

export const clearSession = () => {
  useAuthStore.getState().logout()
}
