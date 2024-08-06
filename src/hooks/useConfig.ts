/* eslint-disable @typescript-eslint/explicit-function-return-type */
// 'use client'
import { fetchConfigByWarehouseId, updateConfigByWarehouseId } from '@/src/services/configService'
import { localWarehouseConfigAtom, warehouseConfigAtom } from '@/src/store/configAtom'
import { type Config } from '@/src/types/warehouse'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useSystemPreferences = () => {
  const [, setWarehouseConfig] = useAtom(warehouseConfigAtom)
  const [, setLocalWarehouseConfig] = useAtom(localWarehouseConfigAtom)
  const { data, refetch, isLoading, isError } = useQuery({
    queryKey: ['config'],
    queryFn: async () => {
      const response = await fetchConfigByWarehouseId()
      setWarehouseConfig(response.data as Config)
      setLocalWarehouseConfig(response.data as Config)
      return response.data
    },
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (data?.data) {
      setWarehouseConfig(data.data as Config)
      setLocalWarehouseConfig(data.data as Config)
    }
  }, [data, setWarehouseConfig])

  const mutation = useMutation({
    mutationFn: async (config: Config) => {
      const response = await updateConfigByWarehouseId(config)
      setWarehouseConfig(response.data as Config)
      setLocalWarehouseConfig(response.data as Config)
      return response.data
    },
    onSuccess: (updatedConfig: Config) => {
      setWarehouseConfig(updatedConfig)
      setLocalWarehouseConfig(updatedConfig)
    },
    onError: (error: any) => {
      console.error('Error al actualizar la configuración', error)
    }
  })

  return { isLoading, isError, configRefetch: refetch, updateConfig: mutation.mutate }
}
