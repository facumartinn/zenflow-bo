import axiosInstance from '@/src/utils/axiosInstance'

export const generateApiKey = async (): Promise<string> => {
  const response = await axiosInstance.post('/auth/generate-api-key')
  return response.data.data.apiKey
}

export const getApiKey = async (): Promise<string | null> => {
  const response = await axiosInstance.get('/auth/api-key')
  return response.data.data.apiKey
}

export const revokeApiKey = async (): Promise<void> => {
  await axiosInstance.post('/auth/api-key/revoke')
}
