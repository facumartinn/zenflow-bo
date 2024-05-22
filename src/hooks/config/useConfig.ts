/* eslint-disable @typescript-eslint/explicit-function-return-type */
// 'use client'
import { fetchConfigByWarehouseId, updateConfigByWarehouseId } from '@/src/services/config'
import { warehouseConfigAtom } from '@/src/store/configAtom'
import { type Config } from '@/src/types/warehouse'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useSystemPreferences = () => {
  const [, setWarehouseConfig] = useAtom(warehouseConfigAtom)
  const { data } = useQuery({
    queryKey: ['config'],
    queryFn: async () => await fetchConfigByWarehouseId()
  })

  useEffect(() => {
    if (data?.data) {
      setWarehouseConfig(data?.data as Config)
    }
  }, [data])

  const mutation = useMutation({
    mutationFn: async ({ config }: { tenantId: number, warehouseId: number, config: Config }) => {
      const response = await updateConfigByWarehouseId(config)
      return response.data
    },
    onSuccess: (updatedConfig: Config) => {
      setWarehouseConfig(updatedConfig)
    },
    onError: (error: any) => {
      console.error('Error al actualizar la configuración', error)
    }
  })

  return { ...data?.data?.data, updateConfig: mutation.mutate }
}
