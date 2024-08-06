import { atom } from 'jotai'
import { type State, type Order } from '../types/order'
import { type FilterParamTypes } from '../types'

export const ordersAtom = atom<Order[]>([])
export const orderFilterParamsAtom = atom<FilterParamTypes>({})
export const orderStatesAtom = atom<State[]>([])
export const orderStatsAtom = atom<any>({})
