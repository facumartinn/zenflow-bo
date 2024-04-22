/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import { Filters } from '@/src/components/Filters'
import { Header } from '@/src/components/Header'
import OrderList from '@/src/components/Orders/List'
import { TabButtons } from '@/src/components/Tabs'
import { useOrders } from '@/src/hooks/order/useOrders'
import { Grid, GridItem } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import './common.css'
import { type Order } from '@/src/types/order'

const tabs = [
  {
    orderStateId: 1,
    label: 'Nuevos pedidos',
    value: 'new'
  },
  {
    orderStateId: 2,
    label: 'Pendientes',
    value: 'pending'
  },
  {
    orderStateId: 5,
    label: 'Finalizados',
    value: 'completed'
  }
]

// const ORDER_STATES = [
//   { id: 1, description: 'Nuevo pedido', createdAt: '2024-04-03T03:43:45.000Z', updatedAt: '2024-04-03T03:43:45.000Z' },
//   { id: 2, description: 'Listo para pickear', createdAt: '2024-04-03T03:43:45.000Z', updatedAt: '2024-04-03T03:43:45.000Z' },
//   { id: 3, description: 'Programado', createdAt: '2024-04-03T03:43:45.000Z', updatedAt: '2024-04-03T03:43:45.000Z' },
//   { id: 4, description: 'En preparación', createdAt: '2024-04-03T03:43:45.000Z', updatedAt: '2024-04-03T03:43:45.000Z' },
//   { id: 5, description: 'Finalizado', createdAt: '2024-04-03T03:43:45.000Z', updatedAt: '2024-04-03T03:43:45.000Z' },
//   { id: 6, description: 'Eliminado', createdAt: '2024-04-03T03:43:45.000Z', updatedAt: '2024-04-03T03:43:45.000Z' }
// ]

export default function OrdersPage () {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState('new')
  const [orderStateQuery, setOrderStateQuery] = useState(1)
  const { data: orders, refetch } = useOrders({ userId: session?.user?.id, stateId: orderStateQuery })
  const [selectedOrders, setSelectedOrders] = useState<number[]>([])

  const selectAllOrders = () => {
    setSelectedOrders(orders?.data?.data.map((order: Order) => order.id) as number[])
  }

  const toggleOrderSelection = (orderNumber: number) => {
    setSelectedOrders(prev => (
      prev.includes(orderNumber) ? prev.filter(id => id !== orderNumber) : [...prev, orderNumber]
    ))
  }

  const handleLoadOrders = () => {
    console.log('Subiendo los pedidos seleccionados:', selectedOrders)
    // Lógica para subir pedidos
  }

  const handleProgramPicking = () => {
    console.log('Programando picking para los pedidos seleccionados:', selectedOrders)
    // Lógica para programar picking
  }

  return (
    <main className='layout'>
      <Grid h="100vh" rowGap={4}
        templateAreas={`"title"
                        "tabs"
                        "filters"
                        "main"`}
        gridTemplateRows={'70px 55px 86px 1fr'}
        gridTemplateColumns={'1fr'}>
        <GridItem m={4} area="title">
          <Header
            title="Pedidos"
            showButton={false}
            buttonLabel='CARGAR PEDIDO'
            onClick={() => { console.log('Aca tiene que ir una funcion') }} />
        </GridItem>
        <GridItem m={4} area="tabs" h="100%">
          <TabButtons
            tabs={tabs}
            orderCounter={orders?.data?.data.length}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setOrderStateQuery={setOrderStateQuery}
            onClick={refetch} />
        </GridItem>
        <GridItem m={4} area="filters" h="100%">
          <Filters
            onSelectAll={selectAllOrders}
            selectedOrders={selectedOrders}
            onLoadOrders={handleLoadOrders}
            onProgramPicking={handleProgramPicking}
            />
        </GridItem>
        <GridItem mt={4} mx={4} area="main" overflowY="scroll">
          <OrderList
            orders={orders?.data?.data}
            selectedOrders={selectedOrders}
            onSelectOrder={toggleOrderSelection} />
        </GridItem>
      </Grid>
    </main>
  )
}
