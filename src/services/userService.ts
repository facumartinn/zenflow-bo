/* eslint-disable @typescript-eslint/explicit-function-return-type */

import axiosInstance from '../utils/axiosInstance'

export const fetchAllUsers = async () => {
  return await axiosInstance.get('/users/')
}

export const fetchUsersByRole = async (roleId: number) => {
  const response = await axiosInstance.get(`/users/by-role/${roleId}`)
  return response.data.data
}

export const fetchUserById = async (userId: number) => {
  return await axiosInstance.get(`/users/${userId}`)
}

export const createUser = async (userData: any) => {
  return await axiosInstance.post('/users/', userData)
}

export const updateUser = async (userId: number, updatedData: any) => {
  return await axiosInstance.put(`/users/${userId}`, updatedData)
}
