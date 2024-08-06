/* eslint-disable @typescript-eslint/explicit-function-return-type */

import axiosInstance from '../utils/axiosInstance'
import { type Order } from '../types/order'

export const fetchOrderDetailById = async (orderId: number) => {
  return await axiosInstance.get(`/order-details/${orderId}`)
}

export const updateOrder = async (data: Order[]) => {
  return await axiosInstance.put('/order-details/update', data)
}
