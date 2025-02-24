/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useAtom } from 'jotai'
import {
  activeTabAtom,
  filtersAtom,
  orderCounterAtom,
  selectedOrdersAtom,
  unpreparedOrdersAtom,
  readyOrdersAtom,
  currentOrdersAtom
} from '@/src/store/navigationAtom'
import { useDisclosure, useToast } from '@chakra-ui/react'
import { OrderStateEnum, type Order } from '@/src/types/order'
import { useEffect, useState, useCallback, useMemo } from 'react'
import { assignOrders as assignOrdersService, fetchFilteredOrders, updateOrderStatus as updateOrderStatusService, deleteOrders as deleteOrdersService } from '../services/orderService'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ToastMessage } from '@/src/components/Toast'
import { type FilterParamTypes } from '@/src/types'
import { useWarehouseConfig } from './useWarehouseConfig'
import { useOrderStats } from './useOrderStats'

export const useOrders = (params?: FilterParamTypes) => {
  const toast = useToast()
  const [selectedOrders, setSelectedOrders] = useAtom(selectedOrdersAtom)
  const [activeTab, setActiveTab] = useAtom(activeTabAtom)
  const [orderCounter, setOrderCounter] = useAtom(orderCounterAtom)
  const [filters, setFilters] = useAtom(filtersAtom)
  const [, setUnpreparedOrders] = useAtom(unpreparedOrdersAtom)
  const [, setReadyOrders] = useAtom(readyOrdersAtom)
  const [currentOrders] = useAtom(currentOrdersAtom)
  const { warehouseConfig } = useWarehouseConfig()
  const { data: stats, refetch: refetchStats } = useOrderStats()
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)

  // Memoizar los filtros
  const currentFilters = useMemo(() => ({
    ...params ?? filters,
    page,
    limit: 20
  }), [params, filters, page])

  // Modal controls
  const mountModal = useDisclosure()
  const assignModal = useDisclosure()
  const scheduleModal = useDisclosure()
  const deleteModal = useDisclosure()
  const expiredModal = useDisclosure()

  const { data, refetch: refetchOrders, isLoading } = useQuery({
    queryKey: ['orders', currentFilters],
    queryFn: async () => {
      const response = await fetchFilteredOrders(currentFilters)
      const newOrders = response.orders

      // Solo actualizar el caché de la tab activa con los nuevos datos
      switch (activeTab) {
        case 'unprepared':
          setUnpreparedOrders([...newOrders] as Order[])
          break
        case 'ready':
          setReadyOrders([...newOrders] as Order[])
          break
      }

      return response
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 30000,
    gcTime: 60000,
    enabled: true
  })

  // Limpiar selección cuando cambia la tab
  useEffect(() => {
    setSelectedOrders([])
    setPage(1) // Reset page when tab changes
  }, [activeTab, setSelectedOrders])

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

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

  const deleteOrdersMutation = useMutation({
    mutationFn: async (orderIds: number[]) => {
      const response = await deleteOrdersService(orderIds)
      return response
    },
    onSuccess: async () => {
      await refetchOrders()
      toast({
        isClosable: true,
        duration: 2000,
        position: 'top-right',
        render: () => <ToastMessage title="Pedidos eliminados" description={`${selectedOrders.length} pedidos fueron eliminados`} status='success' />
      })
      setSelectedOrders([])
    }
  })

  useEffect(() => {
    if (currentOrders && activeTab === 'unprepared') {
      setOrderCounter(currentOrders.length)
    }
  }, [currentOrders, activeTab, setOrderCounter])

  const handleTabSelection = async () => {
    // Solo refrescar las estadísticas
    await refetchStats()
  }

  const handleSelectAll = () => {
    if (!currentOrders) return
    const filteredOrders = currentOrders.filter((order: Order) => order.state_id !== OrderStateEnum.IN_PREPARATION)
    const selectedOrderIds = filteredOrders.map((order: Order) => order.id)
    setSelectedOrders(selectedOrderIds)
  }

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term)
  }, [])

  // Filtrar los pedidos basados en el término de búsqueda
  const filteredOrders = useMemo(() => {
    return data?.orders?.filter((order: Order) => {
      if (!searchTerm) return true
      return order.id.toString().includes(searchTerm)
    }) || []
  }, [data?.orders, searchTerm])

  const expiredOrders = useMemo(() => {
    return stats?.data?.data?.data?.find((stat: any) => stat.name === 'expired_orders')?.orders
  }, [stats])

  return {
    // Data
    orders: filteredOrders,
    stats,
    warehouseConfig,
    selectedOrders,
    filters,
    activeTab,
    orderCounter,
    expiredOrders,
    pagination: {
      currentPage: data?.currentPage ?? 1,
      totalItems: data?.total ?? 0,
      itemsPerPage: 20,
      onPageChange: handlePageChange,
      totalPages: data?.totalPages ?? 1
    },

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
    },
    handleSearch,
    deleteOrders: deleteOrdersMutation.mutate
  }
}
