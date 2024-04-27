/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import OrderList from '@/src/components/Orders/List'
import { Stats } from '@/src/components/Statistics'
import { Grid, GridItem } from '@chakra-ui/react'
import './common.css'
import { useState } from 'react'
import { type Tab, TabButtons, type TabValue } from '@/src/components/Tabs'
import { useSession } from 'next-auth/react'
import { useOrderStates, useOrders } from '@/src/hooks/order/useOrders'
import { Header } from '@/src/components/Header'
import { useSystemPreferences } from '@/src/hooks/config/useConfig'
import { OrderStateEnum } from '@/src/types/order'
import { type FilterParamTypes } from '@/src/types'

const stats = [
  { title: 'Pedidos pendientes', count: 30, icon: 'pendientes' },
  { title: 'En preparacion', count: 3, icon: 'preparacion' },
  { title: 'Pedidos finalizados', count: 24, icon: 'finalizados' },
  { title: 'Pedidos activos', count: 7, icon: 'activos' }
]

const tabs: Tab[] = [
  { orderStateId: OrderStateEnum.READY_TO_PICK, label: 'Pendientes', value: 'pending' },
  { orderStateId: OrderStateEnum.IN_PREPARATION, label: 'En preparación', value: 'doing' },
  { orderStateId: OrderStateEnum.COMPLETED, label: 'Finalizados', value: 'completed' }
]

export default function Home () {
  const urlPath = window.location.pathname
  useOrderStates()
  useSystemPreferences()
  const [filters, setFilters] = useState<FilterParamTypes>({ stateId: OrderStateEnum.READY_TO_PICK })
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState<TabValue>('pending')
  const { data: orders } = useOrders(filters)

  return (
    <main className='layout'>
      <Grid h="100vh" rowGap={4} overflowY="auto" flexGrow={1}
        templateAreas={`"title"
                        "tabs"
                        "filters"
                        "main"`}
        gridTemplateRows={'55px 142px 55px 1fr'}
        gridTemplateColumns={'1fr'}>
        <GridItem m={4} area="title">
          <Header title={session?.tenants?.name || ''} showButton={false} />
        </GridItem>
        <GridItem m={4} area="tabs" h="100%">
          <Stats stats={stats} />
        </GridItem>
        <GridItem m={4} area="filters" h="100%">
          <TabButtons
          tabs={tabs}
          orderCounter={orders?.data?.data?.length}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setFilters={setFilters}
          onClick={orders.refetch} />
        </GridItem>
        <GridItem m={4} area="main" h={`${orders?.data?.data.length * 110}px`} overflowY="auto" flexGrow={1}>
        <OrderList
            orders={orders?.data?.data}
            isLoading={orders.isLoading}
            activeTab={activeTab}
            shouldPaginate={activeTab === 'pending' && urlPath !== '/'} />
        </GridItem>
      </Grid>
    </main>
  )
}
