/* eslint-disable @typescript-eslint/explicit-function-return-type */

import axiosInstance from '../../utils/axiosInstance'

export const fetchAllUsers = async () => {
  return await axiosInstance.get('/users/')
}

export const fetchUsersByRole = async (roleId: number) => {
  return await axiosInstance.get(`/users/by-role/${roleId}`)
}

export const fetchUserById = async (userId: number) => {
  return await axiosInstance.get(`/users/${userId}`)
}

export const createUser = async (userData: number) => {
  return await axiosInstance.post('/users/', userData)
}

export const updateUser = async (userId: number, updatedData: number) => {
  return await axiosInstance.put(`/users/${userId}`, updatedData)
}
