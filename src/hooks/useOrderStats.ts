/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useAtom } from 'jotai'
import { orderStatsAtom } from '@/src/store/orderAtom'
import { useQuery } from '@tanstack/react-query'
import { fetchOrderStats } from '@/src/services/orderService'
import { useEffect } from 'react'
import { type State } from '@/src/types/order'

export const useOrderStats = () => {
  const [, setOrderStats] = useAtom(orderStatsAtom)

  const query = useQuery({
    queryKey: ['order-stats'],
    queryFn: async () => await fetchOrderStats(),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchInterval: 30000 // Refresh every 30 seconds
  })

  useEffect(() => {
    if (query.data?.data) {
      setOrderStats(query.data?.data.data as State[])
    }
  }, [query.data, setOrderStats])

  return {
    ...query,
    refetch: query.refetch
  }
}
