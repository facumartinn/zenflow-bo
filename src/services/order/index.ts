/* eslint-disable @typescript-eslint/explicit-function-return-type */

import axiosInstance from '../../utils/axiosInstance'
import type { FilterParamTypes } from '../../types/index'
import { type Order } from '../../types/order'
import { type QueryParams, objectToQueryString } from '../../utils/queryParams'

export const fetchAllOrders = async () => {
  return await axiosInstance.get('/orders/')
}

export const fetchFilteredOrders = async (params: FilterParamTypes) => {
  return await axiosInstance.get(`/orders/filtered?${objectToQueryString(params as QueryParams)}`)
}

export const fetchOrderById = async (orderId: number) => {
  return await axiosInstance.get(`/orders/${orderId}`)
}

export const createOrders = async (data: Order[]) => {
  return await axiosInstance.post('/orders/create', data)
}

export const updateOrders = async (data: Order[]) => {
  return await axiosInstance.put('/orders/update', data)
}

export const deleteOrder = async (orderId: number) => {
  return await axiosInstance.delete(`/orders/${orderId}`)
}

export const fetchOrderStates = async () => {
  return await axiosInstance.get('/states')
}