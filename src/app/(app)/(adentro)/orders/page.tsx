/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import { Filters } from '@/src/components/Filters'
import { Header } from '@/src/components/Header'
import OrderList from '@/src/components/Orders/List'
import { type Tab, TabButtons, type TabValue } from '@/src/components/Tabs'
import { useOrders } from '@/src/hooks/order/useOrders'
import { Grid, GridItem, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import './common.css'
import { OrderStateEnum, type Order } from '@/src/types/order'
import { AssignModal } from '@/src/components/Orders/Modal/Assign'
import { useWarehouseConfig } from '@/src/hooks/warehouse/useWarehouseConfig'
import { useSystemPreferences } from '@/src/hooks/config/useConfig'
import { type FilterParamTypes } from '@/src/types'
import { getFormattedDay } from '@/src/utils/queryParams'

const tabs: Tab[] = [
  {
    orderStateId: OrderStateEnum.NEW,
    label: 'Nuevos pedidos',
    value: 'new'
  },
  {
    orderStateId: OrderStateEnum.READY_TO_PICK,
    label: 'Pendientes',
    value: 'pending'
  },
  {
    orderStateId: OrderStateEnum.COMPLETED,
    label: 'Finalizados',
    value: 'completed'
  }
]

export const ORDER_STATES = [
  { id: 1, description: 'Nuevo pedido' },
  { id: 2, description: 'Listo para preparar' },
  { id: 3, description: 'Programado' },
  { id: 4, description: 'En preparación' },
  { id: 5, description: 'Finalizado' },
  { id: 6, description: 'Eliminado' }
]

// interface OrderFilters {
//   assemblyDate?: string
//   stateId?: number
//   orderId?: number
//   shift?: number
// }

// const orderFilters: OrderFilters = {
//   assemblyDate: '',
//   state: 1,
//   orderId: 0,
//   shift: 0
// }

export default function OrdersPage () {
  const urlPath = window.location.pathname
  useSystemPreferences()
  const [filters, setFilters] = useState<FilterParamTypes>({ stateId: OrderStateEnum.NEW })
  const { warehouseConfig } = useWarehouseConfig()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [activeTab, setActiveTab] = useState<TabValue>('new')
  const { data: orders, assignOrders, isAssignSuccess, isAssignLoading } = useOrders(filters)
  const orderList = orders?.data?.data.data
  const [orderCounter, setOrderCounter] = useState(orderList?.length)
  const [selectedOrders, setSelectedOrders] = useState<number[]>([])

  const selectAllOrders = () => {
    setSelectedOrders(orderList.map((order: Order) => order.id) as number[])
  }
  const deselectAllOrders = () => {
    setSelectedOrders([])
  }

  const toggleOrderSelection = (orderNumber: number) => {
    setSelectedOrders(prev => (
      prev.includes(orderNumber) ? prev.filter(id => id !== orderNumber) : [...prev, orderNumber]
    ))
  }

  const handleLoadOrders = () => {
    console.log('Subiendo los pedidos seleccionados:', selectedOrders)
    onOpen()
  }

  const handleDateSelection = (date: string) => {
    setFilters((prev) => ({ ...prev, assemblyDate: getFormattedDay(date) }))
  }

  const handleTabSelection = async () => {
    await orders?.refetch()
    setOrderCounter(orders.data?.data.data.length)
    // Lógica para programar picking
  }

  return (
    <main className='layout'>
      <Grid h="100vh" rowGap={4}
        templateAreas={`"title"
                        "tabs"
                        "filters"
                        "main"`}
        gridTemplateRows={'70px 55px 95px 1fr'}
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
            orderCounter={orderCounter}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setSelectedOrders={setSelectedOrders}
            setFilters={setFilters}
            onClick={handleTabSelection} />
        </GridItem>
        <GridItem mt={4} mx={4} area="filters" h="100%">
          <Filters
            onDeselectAll={deselectAllOrders}
            onSelectAll={selectAllOrders}
            selectedOrders={selectedOrders}
            ordersCount={orderList?.length}
            activeTab={activeTab}
            filters={filters}
            onLoadOrders={handleLoadOrders}
            />
        </GridItem>
        <GridItem mt={4} mx={4} area="main" overflowY="scroll">
          <OrderList
            orders={orderList}
            isLoading={orders.isLoading}
            selectedOrders={selectedOrders}
            onSelectOrder={toggleOrderSelection}
            onDateChange={handleDateSelection}
            activeTab={activeTab}
            shouldPaginate={activeTab === 'pending' && urlPath !== '/'} />
        </GridItem>
      </Grid>
      <AssignModal warehouseConfig={warehouseConfig} assignOrders={assignOrders} isAssignSuccess={isAssignSuccess} isAssignLoading={isAssignLoading} isOpen={isOpen} onClose={onClose} selectedOrders={selectedOrders} />
    </main>
  )
}
