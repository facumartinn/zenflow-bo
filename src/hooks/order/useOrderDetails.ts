/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { fetchOrderDetailById } from '@/src/services/orderDetail'
import { type OrderDetail } from '@/src/types/order'
import { useQuery } from 'react-query'

export const useOrderDetail = (orderId: number) => {
  const orderDetail = useQuery(['orderdetail', orderId], async () => await fetchOrderDetailById(orderId), {
    refetchOnWindowFocus: false
  })
  return orderDetail?.data?.data.data as OrderDetail[]
}
