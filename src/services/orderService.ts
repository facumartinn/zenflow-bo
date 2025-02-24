/* eslint-disable @typescript-eslint/explicit-function-return-type */

import axiosInstance from '../utils/axiosInstance'
import type { FilterParamTypes } from '../types/index'
import { type Order } from '../types/order'
import { type QueryParams, objectToQueryString } from '../utils/queryParams'

export const fetchAllOrders = async () => {
  return await axiosInstance.get('/orders/')
}

export const fetchFilteredOrders = async (params: FilterParamTypes & { page?: number, limit?: number }) => {
  const { startDate, endDate, assemblyDate, ...restParams } = params

  const queryParams: QueryParams = {
    ...restParams,
    page: params.page ?? 1,
    limit: params.limit ?? 20,
    assemblyDate: assemblyDate ?? ''
  }

  const queryString = objectToQueryString(queryParams)

  const response = await axiosInstance.get(`/orders/filtered?${queryString}`)

  return {
    orders: response.data.data.orders ?? [],
    total: response.data.data.pagination.total ?? 0,
    currentPage: response.data.data.pagination.page ?? 1,
    totalPages: response.data.data.pagination.totalPages ?? 1
  }
}

export const fetchOrderById = async (orderId: number) => {
  return await axiosInstance.get(`/orders/${orderId}`)
}

export const createOrders = async (data: Order[]) => {
  return await axiosInstance.post('/orders/create', data)
}

export const updateOrderStatus = async (data: number[], stateId: number) => {
  return await axiosInstance.post(`/orders/update-status/${stateId}`, data)
}

export const assignOrders = async (data: any) => {
  return await axiosInstance.put('/orders/assign', data)
}

export const deleteOrders = async (orderIds: number[]) => {
  return await axiosInstance.delete('/orders/delete', { data: { orderIds } })
}

export const fetchOrderStates = async () => {
  return await axiosInstance.get('/states')
}

export const fetchOrderStats = async () => {
  return await axiosInstance.get('/orders/order-stats')
}

export const fetchDailyStats = async () => {
  return await axiosInstance.get('/orders/daily-stats')
}
