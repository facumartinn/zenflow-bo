/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useQuery } from '@tanstack/react-query'
import { fetchDailyStats } from '@/src/services/orderService'
import { formatDateToLocal } from '@/src/utils/date'

interface ScheduleStats {
  schedule: number
  pending_count: number
  finished_count: number
}

interface WeeklyStats {
  week_start: string
  total_orders: number
}

interface TopProduct {
  product_id: number
  product_name: string
  total_quantity: number
}

interface DailyStatsResponse {
  total_pending: number
  total_finished: number
  schedule_stats: ScheduleStats[]
  weekly_stats: WeeklyStats[]
  top_products: TopProduct[]
}

export const useDailyStats = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['dailyStats'],
    queryFn: async () => {
      const response = await fetchDailyStats()
      return response?.data?.data as DailyStatsResponse
    },
    refetchOnWindowFocus: true,
    refetchInterval: 30000 // Refrescar cada 30 segundos
  })

  const todayOrders = {
    pending: data?.total_pending ?? 0,
    completed: data?.total_finished ?? 0,
    schedules: data?.schedule_stats?.map(schedule => ({
      time: `${String(schedule.schedule).padStart(2, '0')}:00 a ${String(schedule.schedule + 2).padStart(2, '0')}:00`,
      pending: schedule.pending_count,
      completed: schedule.finished_count,
      progress: Math.round((schedule.finished_count / (schedule.pending_count + schedule.finished_count)) * 100)
    })) ?? []
  }

  const weeklyOrders = data?.weekly_stats?.map((stat) => ({
    date: formatDateToLocal(stat.week_start).split('/').slice(0, 2).join('/'), // Formato DD/MM
    count: stat.total_orders
  })) ?? []

  const topProducts = data?.top_products?.map((product, index) => ({
    position: index + 1,
    name: product.product_name,
    quantity: product.total_quantity,
    price: 0
  })) ?? []

  return {
    todayOrders,
    weeklyOrders,
    topProducts,
    isLoading,
    refetch
  }
}
