/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useAtom } from 'jotai'
import { warehouseConfigAtom } from '@/src/store/configAtom'
import { localWarehouseConfigAtom } from '../store/configAtom'

export const useWarehouseConfig = () => {
  const [warehouseConfig, setWarehouseConfig] = useAtom(warehouseConfigAtom)
  return { warehouseConfig, setWarehouseConfig }
}

export const useLocalWarehouseConfig = () => {
  const [localWarehouseConfig, setLocalWarehouseConfig] = useAtom(localWarehouseConfigAtom)
  return { localWarehouseConfig, setLocalWarehouseConfig }
}
