import { atom } from 'jotai'
import { type Tenant } from '../types/order'
import { type Config } from '../types/warehouse'

export const tenantAtom = atom<Tenant>({ id: 0, name: '' })
export const warehouseConfigAtom = atom<Config | any>({})
export const localWarehouseConfigAtom = atom<Config | any>({})
