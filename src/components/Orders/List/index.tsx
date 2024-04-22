/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import { ListCard } from '@/src/components/Orders/ListCard'
import { type Order } from '@/src/types/order'
import { Heading, List } from '@chakra-ui/react'

export default function OrderList ({ orders, selectedOrders, onSelectOrder }: { orders: Order[], selectedOrders: number[], onSelectOrder: (orderNumber: number) => void }) {
  return (
    <List overflowY='scroll' pb={24}>
      {orders?.length > 0
        ? <>
          {orders?.map((order: Order) => {
            return (
            <ListCard
              key={order.id}
              orderNumber={order.id}
              assignedTo={order.User?.name}
              articlesCount={32}
              deliveryStatus="24F"
              preparationStatus={'En preparación'}
              onSelect={() => { onSelectOrder(order.id) }}
              isChecked={selectedOrders.includes(order.id)}
            />
            )
          })}
          <Heading fontSize={12}>Hola Padre, hasta aca llegaste!</Heading>
        </>
        : <Heading fontSize={14}>No hay pedidos en este momento</Heading>
    }
    </List>
  )
}
