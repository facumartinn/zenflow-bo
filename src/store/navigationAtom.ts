// src/atoms/orderAtoms.js
import { atom } from 'jotai'
import { OrderStateEnum } from '@/src/types/order'
import { type FilterParamTypes } from '../types'
import { type TabValue } from '../components/Tabs'
import { type Order } from '@/src/types/order'

export const selectedOrdersAtom = atom<number[]>([])
export const filtersAtom = atom<FilterParamTypes>({
  stateId: [
    OrderStateEnum.NEW,
    OrderStateEnum.READY_TO_PICK,
    OrderStateEnum.SCHEDULED,
    OrderStateEnum.IN_PREPARATION,
    OrderStateEnum.PACKING,
    OrderStateEnum.DELIVERING
  ]
})
export const activeTabAtom = atom<TabValue>('unprepared')
export const orderCounterAtom = atom(0)

// Atoms para cachear los pedidos de cada tab
export const unpreparedOrdersAtom = atom<Order[]>([])
export const inProcessOrdersAtom = atom<Order[]>([])
export const readyOrdersAtom = atom<Order[]>([])

// Atom derivado que selecciona el array correcto según la tab activa
export const currentOrdersAtom = atom(
  (get) => {
    const activeTab = get(activeTabAtom)
    const unprepared = get(unpreparedOrdersAtom)
    const inProcess = get(inProcessOrdersAtom)
    const ready = get(readyOrdersAtom)

    switch (activeTab) {
      case 'unprepared':
        return unprepared
      case 'in_process':
        return inProcess
      case 'ready':
        return ready
      default:
        return []
    }
  }
)
