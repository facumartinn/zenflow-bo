/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useOrders, useOrderStats, useOrderStates } from './useOrders'
import { useSystemPreferences } from './useConfig'
import { useWarehouseConfig } from './useWarehouseConfig'
import { type FilterParamTypes } from '@/src/types'

export const useDashboard = (filters: FilterParamTypes) => {
  const { data: orders, assignOrders } = useOrders(filters)
  const ordersLoading = orders?.isLoading
  const { data: stats } = useOrderStats()
  const statsLoading = stats?.isLoading
  const { isLoading: preferencesLoading } = useSystemPreferences()
  const { warehouseConfig, isLoading: configLoading } = useWarehouseConfig()
  const { isLoading: statesLoading } = useOrderStates()

  const isLoading = ordersLoading || statsLoading || preferencesLoading || configLoading || statesLoading

  return { orders, stats, warehouseConfig, assignOrders, isLoading }
}
