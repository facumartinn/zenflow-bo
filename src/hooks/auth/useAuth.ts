/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type HeaderTypes } from '@/src/types'
import { useSession } from 'next-auth/react'

const useAuthenticatedFetch = () => {
  const { data: session } = useSession()

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const authenticatedFetch = async (url: string, options: HeaderTypes = {}) => {
    // Asegúrate de que session?.accessToken está disponible
    if (!session?.accessToken) {
      throw new Error('No session token available')
    }

    // Define los headers que siempre quieres enviar
    const headers = {
      Authorization: session.accessToken, // Usa el accessToken de la sesión
      tenantId: session.user.tenant_id.toString(), // Asegúrate de convertirlo a string
      warehouseId: session.user.warehouse_id.toString() // Asegúrate de convertirlo a string
    }

    // Realiza la solicitud con los headers añadidos
    const response = await fetch(url, { ...options, headers })
    return response
  }

  return authenticatedFetch
}

export default useAuthenticatedFetch
