import axios from 'axios'
import { getSession } from './auth/session'

const axiosInstance = axios.create({
  baseURL: 'https://zenflow-api-daq3y.ondigitalocean.app',
  timeout: 100000
})

axiosInstance.interceptors.request.use(async (config) => {
  const { token, user } = getSession()

  if (token && user) {
    config.headers['Access-Control-Allow-Origin'] = '*'
    config.headers['Content-Type'] = 'application/json'
    config.headers.Authorization = token
    config.headers['x-tenant-id'] = user.tenant_id
    config.headers['x-warehouse-id'] = user.warehouse_id
  }
  return config
}, async (error) => {
  return await Promise.reject(error)
})

export default axiosInstance
