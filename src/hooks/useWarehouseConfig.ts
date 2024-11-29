/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useAtom } from 'jotai'
import { warehouseConfigAtom } from '@/src/store/configAtom'
import { localWarehouseConfigAtom } from '../store/configAtom'
import { type Config } from '../types/warehouse'

export const useWarehouseConfig = () => {
  const [warehouseConfig, setWarehouseConfig] = useAtom(warehouseConfigAtom)
  const isLoading = !warehouseConfig || Object.keys(warehouseConfig as Config).length === 0
  return { warehouseConfig, setWarehouseConfig, isLoading }
}

export const useLocalWarehouseConfig = () => {
  const [localWarehouseConfig, setLocalWarehouseConfig] = useAtom(localWarehouseConfigAtom)
  return { localWarehouseConfig, setLocalWarehouseConfig }
}
