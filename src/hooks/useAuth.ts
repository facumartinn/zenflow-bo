/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type HeaderTypes } from '@/src/types'
import { useAuthStore } from '@/src/store/authStore'

const useAuthenticatedFetch = () => {
  const { token, user } = useAuthStore()

  const authenticatedFetch = async (url: string, options: HeaderTypes = {}) => {
    if (!token) {
      throw new Error('No authentication token available')
    }

    const headers = {
      Authorization: token,
      tenantId: user?.tenant_id.toString() ?? '',
      warehouseId: user?.warehouse_id.toString() ?? ''
    }

    const response = await fetch(url, { ...options, headers })
    return response
  }

  return authenticatedFetch
}

export default useAuthenticatedFetch
