/* eslint-disable @typescript-eslint/explicit-function-return-type */
// hooks/useFilteredOrders.js
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { getFilteredOrders } from '../services/orderService' // Ajusta la ruta al archivo correspondiente
import { orderDataAtom, orderErrorAtom, orderLoadingAtom } from '../store/orderAtom'
import type { HeaderTypes, ParamTypes } from '../types/orderTypes'

const useFilteredOrders = async (params: ParamTypes, headers: HeaderTypes) => {
  const [orders, setOrders] = useAtom(orderDataAtom)
  const [, setLoading] = useAtom(orderLoadingAtom)
  const [, setError] = useAtom(orderErrorAtom)

  useEffect(() => {
    let isMounted = true
    const fetchOrders = async () => {
      setLoading(true)
      try {
        const response = await getFilteredOrders(params, headers)
        if (isMounted) {
          setOrders(response.data)
          setError(null)
        }
      } catch (error) {
        if (isMounted) {
          setError(error)
          setOrders([])
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }
    fetchOrders().catch((error) => {
      console.error('Failed to fetch orders', error)
      setError(error)
    })

    // Función de limpieza en caso de que el componente se desmonte
    return () => {
      isMounted = false
    }
  }, [params, headers, setOrders, setLoading, setError])

  return orders
}

export default useFilteredOrders
