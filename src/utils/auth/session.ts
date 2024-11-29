/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type User } from '@/src/types/user'
import { useAuthStore } from '@/src/store/authStore'

export const getSession = () => {
  const state = useAuthStore.getState()
  return {
    user: state.user,
    token: state.token,
    isAuthenticated: state.isAuthenticated
  }
}

export const setSession = async (user: User, token: string) => {
  await new Promise<void>((resolve) => {
    useAuthStore.getState().login(user, token)
    resolve()
  })
}

export const clearSession = () => {
  useAuthStore.getState().logout()
}
