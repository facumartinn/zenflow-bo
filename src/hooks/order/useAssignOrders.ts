/* eslint-disable @typescript-eslint/explicit-function-return-type */
// hooks/useAssignOrder.ts
import { useAtom } from 'jotai'
import { updateOrder } from '@/src/services/order'
import { ordersAtom } from '@/src/store/orderAtom'
import { type HeaderTypes } from '@/src/types'
import { type Order } from '@/src/types/order'

export const useAssignOrder = () => {
  const [, setOrders] = useAtom(ordersAtom)

  const assignAndUpdateOrder = async (orders: Order[], headers: HeaderTypes) => {
    try {
      await updateOrder(orders)
      setOrders(orders)
    } catch (error) {
      console.error(error)
    }
  }

  return { assignAndUpdateOrder }
}
