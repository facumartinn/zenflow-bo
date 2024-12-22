/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { fetchOrderDetailById } from '@/src/services/orderDetailService'
import { type OrderDetail } from '@/src/types/order'
import { useQuery } from '@tanstack/react-query'

export const useOrderDetail = (orderId: number) => {
  const { data } = useQuery({
    queryKey: ['orderDetail', orderId],
    queryFn: async () => await fetchOrderDetailById(orderId),
    refetchOnWindowFocus: false
  })
  return data?.data.data[0] as OrderDetail[]
}
