/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { fetchConfigByWarehouseId, updateConfigByWarehouseId } from '@/src/services/config'
import { warehouseConfigAtom } from '@/src/store/configAtom'
import { type Config } from '@/src/types/warehouse'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { useMutation, useQuery } from 'react-query'

export const useSystemPreferences = () => {
  // const queryClient = useQueryClient()
  const [, setWarehouseConfig] = useAtom(warehouseConfigAtom)
  const query = useQuery(['config'], async () => await fetchConfigByWarehouseId(), {
    refetchOnWindowFocus: true
  })

  useEffect(() => {
    if (query.data?.data) {
      setWarehouseConfig(query.data?.data as Config)
    }
  }, [query])

  const mutation = useMutation(async ({
    config
  }: { tenantId: number, warehouseId: number, config: Config }) => await updateConfigByWarehouseId(config), {
    onSuccess: (config) => {
      setWarehouseConfig(JSON.parse(config.data as string) as Config)
    },
    onError: (error) => {
      // Manejo de error
      console.error('Error al actualizar la configuración', error)
    }
  })

  return { ...query.data?.data, updateConfig: mutation.mutate }
}
