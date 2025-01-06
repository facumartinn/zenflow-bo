/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { fetchOrderDetailById } from '@/src/services/orderDetailService'
import { type Order, type OrderDetail } from '@/src/types/order'
import { useQuery } from '@tanstack/react-query'

export const useOrderDetail = (orderId: number) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['orderDetail', orderId],
    queryFn: async () => await fetchOrderDetailById(orderId),
    refetchOnWindowFocus: false
  })
  return {
    data: data?.data.data as { details: OrderDetail[], order: Order, total_products: number },
    isLoading,
    refetch
  }
}
