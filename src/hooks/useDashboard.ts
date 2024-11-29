/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useOrders } from './useOrders'
import { useOrderStats } from './useOrderStats'
import { useSystemPreferences } from './useConfig'
import { useWarehouseConfig } from './useWarehouseConfig'
import { type FilterParamTypes } from '@/src/types'

export const useDashboard = (filters: FilterParamTypes) => {
  const { orders, assignOrders, isLoading: ordersLoading, handleTabSelection } = useOrders(filters)
  const { data: stats, isLoading: statsLoading } = useOrderStats()
  const { isLoading: preferencesLoading } = useSystemPreferences()
  const { warehouseConfig, isLoading: configLoading } = useWarehouseConfig()

  const isLoading = ordersLoading || statsLoading || preferencesLoading || configLoading

  return {
    orders,
    stats,
    warehouseConfig,
    assignOrders,
    isLoading,
    handleTabSelection
  }
}
