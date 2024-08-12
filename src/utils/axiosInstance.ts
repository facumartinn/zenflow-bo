// utils/axiosInstance.js
import axios from 'axios'
import { getSession } from 'next-auth/react'

const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_URL || 'https://zenflow-api-daq3y.ondigitalocean.app' // Define aquí la URL base de tu API
})

axiosInstance.interceptors.request.use(async (config) => {
  const session = await getSession()
  if (session) {
    config.headers['Access-Control-Allow-Origin'] = '*'
    config.headers['Content-Type'] = 'application/json'
    config.headers.Authorization = session.accessToken // Asume que accessToken está disponible
    config.headers['x-tenant-id'] = session.user.tenant_id // Asegúrate de que estos campos existen
    config.headers['x-warehouse-id'] = session.user.warehouse_id
  }
  return config
}, async (error) => {
  return await Promise.reject(error)
})

export default axiosInstance
