/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import { ListCard } from '@/src/components/Orders/ListCard'
import { type Order } from '@/src/types/order'
import { Heading, List } from '@chakra-ui/react'
import { type TabValue } from '../../Tabs'
import { Pagination } from './Pagination'

interface OrderListProps {
  orders: Order[]
  selectedOrders?: number[]
  isLoading: boolean
  onSelectOrder?: (orderNumber: number) => void
  onDateChange?: (date: string) => void
  activeTab: TabValue
  shouldPaginate?: boolean
}

export default function OrderList ({ orders, selectedOrders, isLoading, onSelectOrder, onDateChange, activeTab, shouldPaginate }: OrderListProps) {
  const isChecked = (orderId: number) => selectedOrders ? selectedOrders.includes(orderId) : false

  return (
    <>
      <List overflowY='scroll' pb={activeTab === 'pending' ? 4 : 24} h={activeTab === 'pending' ? '80%' : '100%'}>
        {isLoading
          ? <Heading fontSize={14}>Cargando...</Heading>
          : orders?.length > 0
            ? <>
              {orders?.map((order: Order) => {
                return (
                <ListCard
                  key={order.id}
                  orderNumber={order.id}
                  assignedTo={order.Users ? order.Users.name : 'Todos'}
                  articlesCount={32}
                  deliveryStatus="24F"
                  preparationStatus={order.state_id}
                  onSelect={() => { onSelectOrder && onSelectOrder(order.id) }}
                  isChecked={isChecked(order.id)}
                />
                )
              })}
            </>
            : <Heading fontSize={14}>No hay pedidos.</Heading>
        }
      </List>
      {shouldPaginate && onDateChange ? <Pagination onDateChange={onDateChange} /> : null}
    </>
  )
}
