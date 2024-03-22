/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import { ListCard } from '@/src/components/Orders/ListCard'
import { List } from '@chakra-ui/react'

export default function OrderList ({ orders }: any) {
  return (
    <List>
      <ListCard
        orderNumber={12340987983}
        assignedTo="Martin Katz"
        articlesCount={32}
        deliveryStatus="24F"
        preparationStatus="En preparación"
       />
       <ListCard
        orderNumber={12340987983}
        assignedTo="Todos"
        articlesCount={32}
        deliveryStatus="Sin asignar"
        preparationStatus="Sin asignar"
       />
       <ListCard
        orderNumber={12340987983}
        assignedTo="Todos"
        articlesCount={32}
        deliveryStatus="Sin asignar"
        preparationStatus="En preparación"
       />
       <ListCard
        orderNumber={12340987983}
        assignedTo="Todos"
        articlesCount={32}
        deliveryStatus="Sin asignar"
        preparationStatus="En preparación"
       />
    </List>
  )
}
