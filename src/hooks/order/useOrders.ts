/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { orderStatesAtom } from '@/src/store/orderAtom'
import { assignOrders, fetchFilteredOrders, fetchOrderStates } from '../../services/order'
import { type FilterParamTypes } from '@/src/types'
import { useMutation, useQuery } from 'react-query'
import { type State } from '@/src/types/order'
import { useEffect } from 'react'
import { useAtom } from 'jotai'

export const useOrders = (params: FilterParamTypes) => {
  const orders = useQuery(['orders', params], async () => await fetchFilteredOrders(params), {
    refetchOnWindowFocus: false
  })

  const { mutate, isLoading, isSuccess } = useMutation(async (data: any) => await assignOrders(data), {
    onSuccess: async (data) => {
      await orders.refetch()
    },
    onError: (error) => {
      console.error('Error al actualizar la configuración', error)
    }
  })

  return { data: orders, assignOrders: mutate, isAssignSuccess: isSuccess, isAssignLoading: isLoading }
}

export const useOrderStates = () => {
  const [, setOrderStates] = useAtom(orderStatesAtom)
  const response = useQuery(['order-states'], async () => await fetchOrderStates(), {
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (response.data?.data) {
      setOrderStates(response.data?.data as State[])
    }
  }, [response])

  return response
}
