/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { assignOrders, fetchFilteredOrders, fetchOrderStates, fetchOrderStats, updateOrderStatus } from '../services/orderService'
import { type FilterParamTypes } from '@/src/types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useAtom } from 'jotai'
import { activeTabAtom, orderCounterAtom, selectedOrdersAtom } from '@/src/store/navigationAtom'
import { orderStatesAtom, orderStatsAtom } from '@/src/store/orderAtom'
import { type State } from '@/src/types/order'
import { ToastMessage } from '@/src/components/Toast'
import { useToast } from '@chakra-ui/toast'

export const useOrders = (params: FilterParamTypes) => {
  const [, setOrderCounter] = useAtom(orderCounterAtom)
  const [selectedOrders, setSelectedOrders] = useAtom(selectedOrdersAtom)
  const toast = useToast()
  const [activeTab] = useAtom(activeTabAtom)
  const orders = useQuery({
    queryKey: ['orders', params],
    queryFn: async () => await fetchFilteredOrders(params),
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (orders.data?.data && activeTab === 'new') {
      setOrderCounter(orders.data?.data.data.length as number)
    }
  }, [orders])

  const assignOrder = useMutation(
    {
      mutationFn: async (data: any) => {
        const response = await assignOrders(data)
        return response
      },
      onSuccess: async (data) => {
        await orders.refetch()
        toast({
          isClosable: true,
          duration: 2000,
          position: 'top-right',
          render: () => <ToastMessage title={`${JSON.parse(data?.config?.data as string)?.orders?.length} pedidos subidos`} description='Ya está listo para que los pickers lo preparen' status='success' />
        })
        setSelectedOrders([])
      },
      onError: (error: any) => {
        console.error('Error al actualizar la configuración', error)
      }
    }
  )

  const updateOrder = useMutation(
    {
      mutationFn: async (data: any) => {
        const response = await updateOrderStatus(data.orders as number[], data.stateId as number)
        return { response: response.data, stateId: data.stateId }
      },
      onSuccess: async (data) => {
        await orders.refetch()
        toast({
          isClosable: true,
          duration: 2000,
          position: 'top-right',
          render: () => <ToastMessage title={data.stateId === 6 ? 'Eliminados correctamente' : `${selectedOrders?.length} pedidos subidos`} description={`${selectedOrders?.length} pedidos fueron eliminados`} status='success' />
        })
        setSelectedOrders([])
      },
      onError: (error: any) => {
        console.error('Error al actualizar la configuración', error)
      }
    }
  )

  return { data: orders, assignOrders: assignOrder.mutate, updateOrderStatus: updateOrder.mutate }
}

export const useOrderStates = () => {
  const [, setOrderStates] = useAtom(orderStatesAtom)
  const response = useQuery({
    queryKey: ['order-states'],
    queryFn: async () => await fetchOrderStates(),
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (response.data?.data) {
      setOrderStates(response.data?.data as State[])
    }
  }, [response])

  return response
}

export const useOrderStats = () => {
  const [, setOrderStats] = useAtom(orderStatsAtom)
  const stats = useQuery({
    queryKey: ['order-stats'],
    queryFn: async () => await fetchOrderStats(),
    refetchOnWindowFocus: true,
    refetchOnMount: true
  })

  useEffect(() => {
    if (stats.data?.data) {
      setOrderStats(stats.data?.data.data as State[])
    }
  }, [stats])

  return { data: stats }
}
