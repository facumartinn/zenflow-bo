// store/orderAtoms.js
import { atom } from 'jotai'

export const orderDataAtom = atom<any>([])
export const orderLoadingAtom = atom<boolean>(true)
export const orderErrorAtom = atom<any>(null)
