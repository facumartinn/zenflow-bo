import { atom } from 'jotai'
import { type Tenant } from '../types/order'
import { type Config } from '../types/warehouse'

export const tenantAtom = atom<Tenant>({ id: 0, name: '' })
export const warehouseConfigAtom = atom<Config>({
  automatic_picking: { status: false },
  use_shifts: { status: false, shifts: [] },
  use_resources: { status: false, resources: [] }

})
