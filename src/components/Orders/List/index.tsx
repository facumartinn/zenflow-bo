/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import { ListCard } from '@/src/components/Orders/ListCard'
import { type Order } from '@/src/types/order'
import { Box, Flex, List, Text } from '@chakra-ui/react'
import { Pagination } from './Pagination'
import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { activeTabAtom, selectedOrdersAtom } from '@/src/store/navigationAtom'
import { groupOrdersByAssignedUser, groupOrdersByShift } from '@/src/utils/order.utils'
import { type Config } from '@/src/types/warehouse'
import { SkeletonList } from '../../Skeleton/List'
import { SimpleOrderCard } from '../SimpleCard'

interface OrderListProps {
  orders: Order[]
  warehouseConfig: Config
  isLoading: boolean
  isHomePage?: boolean
}

export default function OrderList ({ orders, warehouseConfig, isLoading, isHomePage }: OrderListProps) {
  const [selectedOrders, setSelectedOrders] = useAtom(selectedOrdersAtom)
  const [activeTab] = useAtom(activeTabAtom)
  const isChecked = (orderId: number) => selectedOrders ? selectedOrders.includes(orderId) : false
  const [showLoading, setShowLoading] = useState(isLoading)
  const shouldPaginate = activeTab === 'pending' || activeTab === 'completed'
  const groupedOrders = () => {
    if (orders) {
      if (activeTab === 'pending' && warehouseConfig.use_shifts?.status) {
        return groupOrdersByShift(orders, warehouseConfig)
      }
      if (activeTab === 'doing') {
        return groupOrdersByAssignedUser(orders)
      }
      return { default: orders }
    }
    return { default: orders }
  }
  const showCheckbox = activeTab === 'new' || activeTab === 'pending'

  useEffect(() => {
    // Forzamos un re-render cuando cambian las configuraciones del almacén
  }, [warehouseConfig])

  const toggleOrderSelection = (orderNumber: number) => {
    setSelectedOrders(prev => (
      prev.includes(orderNumber) ? prev.filter(id => id !== orderNumber) : [...prev, orderNumber]
    ))
  }

  useEffect(() => {
    if (isLoading) {
      setShowLoading(true)
      setTimeout(() => {
        setShowLoading(false)
      }, 1000)
    }
  }, [isLoading])

  return (
    <>
      <List overflowY='scroll' pb={shouldPaginate ? 4 : 24} h={shouldPaginate ? '80%' : '100%'}>
        {showLoading
          ? <SkeletonList />
          : Object.entries(groupedOrders()).map(([shift, orders]) => (
            <Box key={shift}>
              {shift !== 'default' && <Text fontSize="md" fontWeight='700' py={4}>{shift}</Text>}
              <Flex flexDirection={activeTab === 'doing' ? 'row' : 'column'} flexWrap='wrap'>
                {orders?.map((order: Order) => (
                  activeTab === 'doing'
                    ? <SimpleOrderCard order={order} />
                    : <ListCard
                    key={order.id}
                    order={order}
                    onSelect={() => { toggleOrderSelection(order.id) }}
                    isChecked={isChecked(order.id)}
                    showCheckbox={showCheckbox}
                  />)
                )}
              </Flex>
            </Box>
          ))}
      </List>
      {shouldPaginate && !isHomePage ? <Pagination /> : null}
    </>
  )
}
