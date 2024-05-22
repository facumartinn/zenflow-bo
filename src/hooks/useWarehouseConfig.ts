/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useAtom } from 'jotai'
import { warehouseConfigAtom } from '@/src/store/configAtom'

export const useWarehouseConfig = () => {
  const [warehouseConfig, setWarehouseConfig] = useAtom(warehouseConfigAtom)

  return { warehouseConfig, setWarehouseConfig }
}
