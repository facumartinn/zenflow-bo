import axios from 'axios'
import Cookies from 'js-cookie'
import { clearSession } from './auth/session'
import { jwtDecode } from 'jwt-decode'

interface JWTPayload {
  tenant_id: string
  warehouse_id: string
  // ... otros claims
}

const axiosInstance = axios.create({
  // baseURL: 'https://zenflow-api-daq3y.ondigitalocean.app',
  baseURL: 'http://192.168.0.22:4000', // Reemplaza con la URL base de tu API
  timeout: 100000
})

axiosInstance.interceptors.request.use(async (config) => {
  const token = Cookies.get('token')
  console.log(token, 'asdkmaskdmaskdsa0')

  if (token) {
    try {
      // Decodificamos el token para obtener los claims
      const decodedToken = jwtDecode<JWTPayload>(token)
      console.log(decodedToken, 'asdkmaskdmaskdsa')
      // Verificamos que los IDs coincidan con los almacenados
      const storedTenantId = Cookies.get('tenant_id')
      const storedWarehouseId = Cookies.get('warehouse_id')
      console.log(storedTenantId, 'asdkmaskdmaskdsa1')
      console.log(storedWarehouseId, 'asdkmaskdmaskdsa2')

      if (
        decodedToken.tenant_id !== storedTenantId ||
        decodedToken.warehouse_id !== storedWarehouseId
      ) {
        // Si no coinciden, es un intento de manipulación
        clearSession()
        window.location.href = '/auth/sign-in'
        throw new Error('Security validation failed')
      }

      config.headers['Access-Control-Allow-Origin'] = '*'
      config.headers['Content-Type'] = 'application/json'
      config.headers.Authorization = token
      config.headers['x-tenant-id'] = decodedToken.tenant_id
      config.headers['x-warehouse-id'] = decodedToken.warehouse_id
    } catch (error) {
      clearSession()
      window.location.href = '/auth/sign-in'
      throw new Error('Invalid token')
    }
  }
  return config
}, async (error) => {
  return await Promise.reject(error)
})

// Agregamos un interceptor de respuesta para manejar 401s
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      clearSession()
      window.location.href = '/auth/sign-in'
    }
    return await Promise.reject(error)
  }
)

export default axiosInstance
