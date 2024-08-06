/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type HeaderTypes } from '@/src/types'
import { useSession } from 'next-auth/react'

const useAuthenticatedFetch = () => {
  const { data: session } = useSession()

  const authenticatedFetch = async (url: string, options: HeaderTypes = {}) => {
    if (!session?.accessToken) {
      throw new Error('No session token available')
    }

    const headers = {
      Authorization: session.accessToken,
      tenantId: session.user.tenant_id.toString(),
      warehouseId: session.user.warehouse_id.toString()
    }

    const response = await fetch(url, { ...options, headers })
    return response
  }

  return authenticatedFetch
}

export default useAuthenticatedFetch
