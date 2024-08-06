// src/atoms/orderAtoms.js
import { atom } from 'jotai'
import { OrderStateEnum } from '@/src/types/order'
import { type FilterParamTypes } from '../types'
import { type TabValue } from '../components/Tabs'

export const selectedOrdersAtom = atom<number[]>([])
export const filtersAtom = atom<FilterParamTypes>({ stateId: [OrderStateEnum.NEW] })
export const activeTabAtom = atom<TabValue>('new')
export const orderCounterAtom = atom(0)
