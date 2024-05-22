/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { type Config } from '@/src/types/warehouse'
import axiosInstance from '../utils/axiosInstance'

export const fetchConfigByWarehouseId = async () => {
  return await axiosInstance.get('/warehouse/config')
}

export const updateConfigByWarehouseId = async (data: Config) => {
  return await axiosInstance.put('/warehouse/config', data)
}
