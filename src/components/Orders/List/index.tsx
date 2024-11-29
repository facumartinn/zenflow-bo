/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ListCard } from '@/src/components/Orders/ListCard'
import { type Order } from '@/src/types/order'
import { Box, Flex, List, Text, VStack } from '@chakra-ui/react'
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
  const shouldShowPagination = activeTab === 'new' || activeTab === 'pending' || activeTab === 'completed'
  const groupedOrders = () => {
    if (orders) {
      if (activeTab === 'pending' && warehouseConfig?.use_shifts?.status) {
        return groupOrdersByShift(orders, warehouseConfig)
      }
      if (activeTab === 'doing') {
        return groupOrdersByAssignedUser(orders)
      }
      return { default: orders }
    }
    return { default: [] }
  }
  const showCheckbox = activeTab === 'new' || activeTab === 'pending'

  useEffect(() => {
    if (isLoading) {
      setShowLoading(true)
      setTimeout(() => {
        setShowLoading(false)
      }, 1000)
    }
  }, [isLoading])

  const toggleOrderSelection = (orderNumber: number) => {
    setSelectedOrders(prev => (
      prev.includes(orderNumber) ? prev.filter(id => id !== orderNumber) : [...prev, orderNumber]
    ))
  }

  if (showLoading) {
    return <SkeletonList />
  }

  return (
    <Flex direction="column" h="100%">
      {(!orders || orders.length === 0)
        ? (
        <VStack flex="1" justify="center" spacing={4}>
          <Text fontSize="xl" color="gray.500">No hay pedidos disponibles</Text>
          <Text fontSize="md" color="gray.400">Los pedidos aparecerán aquí cuando estén disponibles</Text>
        </VStack>
          )
        : (
        <List overflowY='scroll' pb={shouldShowPagination ? 4 : 24} flex="1">
          {Object.entries(groupedOrders()).map(([shift, shiftOrders], shiftIndex) => (
            <Box key={`${shift}-${shiftIndex}`}>
              {shift !== 'default' && <Text fontSize="md" fontWeight='700' py={4}>{shift}</Text>}
              <Flex flexDirection={activeTab === 'doing' ? 'row' : 'column'} flexWrap='wrap'>
                {shiftOrders?.map((order: Order, orderIndex: number) => (
                  activeTab === 'doing'
                    ? <SimpleOrderCard
                        key={`${shift}-${order.id}-${orderIndex}`}
                        order={order}
                      />
                    : <ListCard
                        key={`${shift}-${order.id}-${orderIndex}`}
                        order={order}
                        onSelect={() => { toggleOrderSelection(order.id) }}
                        isChecked={isChecked(order.id)}
                        showCheckbox={showCheckbox}
                      />
                ))}
              </Flex>
            </Box>
          ))}
        </List>
          )}
      {!isHomePage && shouldShowPagination && <Pagination />}
    </Flex>
  )
}
