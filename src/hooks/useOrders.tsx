/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useAtom } from 'jotai'
import { activeTabAtom, filtersAtom, orderCounterAtom, selectedOrdersAtom } from '@/src/store/navigationAtom'
import { useDisclosure } from '@chakra-ui/react'
import { OrderStateEnum } from '@/src/types/order'
import { useEffect } from 'react'
import { assignOrders as assignOrdersService, fetchFilteredOrders, updateOrderStatus as updateOrderStatusService } from '../services/orderService'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ToastMessage } from '@/src/components/Toast'
import { useToast } from '@chakra-ui/toast'
import { type FilterParamTypes } from '@/src/types'
import { useWarehouseConfig } from './useWarehouseConfig'
import { useOrderStats } from './useOrderStats'

export const useOrders = (params?: FilterParamTypes) => {
  const toast = useToast()
  const [selectedOrders, setSelectedOrders] = useAtom(selectedOrdersAtom)
  const [activeTab, setActiveTab] = useAtom(activeTabAtom)
  const [orderCounter, setOrderCounter] = useAtom(orderCounterAtom)
  const [filters, setFilters] = useAtom(filtersAtom)
  const { warehouseConfig } = useWarehouseConfig()
  const { data: stats, refetch: refetchStats } = useOrderStats()

  // Modal controls
  const mountModal = useDisclosure()
  const assignModal = useDisclosure()
  const scheduleModal = useDisclosure()
  const deleteModal = useDisclosure()
  const expiredModal = useDisclosure()

  const { data: orders, refetch: refetchOrders, isLoading } = useQuery({
    queryKey: ['orders', params || filters],
    queryFn: async () => await fetchFilteredOrders(params || filters),
    refetchOnWindowFocus: false,
    refetchOnMount: true
  })

  useEffect(() => {
    if (orders?.data && activeTab === 'new') {
      setOrderCounter(orders?.data?.data?.length as number)
    }
  }, [orders, activeTab, setOrderCounter])

  const assignOrdersMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await assignOrdersService(data)
      return response
    },
    onSuccess: async (data) => {
      await refetchOrders()
      toast({
        isClosable: true,
        duration: 2000,
        position: 'top-right',
        render: () => <ToastMessage title={`${JSON.parse(data?.config?.data as string)?.orders?.length} pedidos subidos`} description='Ya está listo para que los pickers lo preparen' status='success' />
      })
      setSelectedOrders([])
    }
  })

  const updateOrderStatusMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await updateOrderStatusService(data?.orders as number[], data.stateId as number)
      return { response: response.data, stateId: data.stateId }
    },
    onSuccess: async (data) => {
      await refetchOrders()
      toast({
        isClosable: true,
        duration: 2000,
        position: 'top-right',
        render: () => <ToastMessage title={data.stateId === 6 ? 'Eliminados correctamente' : `${selectedOrders?.length} pedidos subidos`} description={`${selectedOrders?.length} pedidos fueron eliminados`} status='success' />
      })
      setSelectedOrders([])
    }
  })

  const handleSelectAll = () => {
    if (!orders?.data?.data) return
    const filteredOrders = orders?.data?.data?.filter((order: any) => order.state_id !== OrderStateEnum.IN_PREPARATION)
    const selectedOrderIds = filteredOrders.map((order: any) => order.id)
    setSelectedOrders(selectedOrderIds as number[])
  }

  const handleTabSelection = async () => {
    await Promise.all([refetchOrders(), refetchStats()])
  }

  const expiredOrders = stats?.data?.data?.data?.find((stat: any) => stat.name === 'expired_orders')?.orders

  return {
    // Data
    orders,
    stats,
    warehouseConfig,
    selectedOrders,
    filters,
    activeTab,
    orderCounter,
    expiredOrders,

    // Loading state
    isLoading,

    // Actions
    assignOrders: assignOrdersMutation.mutate,
    updateOrderStatus: updateOrderStatusMutation.mutate,
    setSelectedOrders,
    setActiveTab,
    setOrderCounter,
    setFilters,
    handleSelectAll,
    handleTabSelection,
    refetchOrders,

    // Modals
    modals: {
      mount: mountModal,
      assign: assignModal,
      schedule: scheduleModal,
      delete: deleteModal,
      expired: expiredModal
    }
  }
}
