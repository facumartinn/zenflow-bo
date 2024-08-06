/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import OrderList from '@/src/components/Orders/List'
import { Stats } from '@/src/components/Statistics'
import { Grid, GridItem, useDisclosure } from '@chakra-ui/react'
import './common.css'
import { TabButtons } from '@/src/components/Tabs'
import { useSession } from 'next-auth/react'
import { useOrderStates, useOrderStats, useOrders } from '@/src/hooks/useOrders'
import { Header } from '@/src/components/Header'
import { useSystemPreferences } from '@/src/hooks/useConfig'
import { useAtom } from 'jotai'
import { activeTabAtom, filtersAtom } from '@/src/store/navigationAtom'
import { useWarehouseConfig } from '@/src/hooks/useWarehouseConfig'
import { useEffect } from 'react'
import { OrderStateEnum } from '@/src/types/order'
import { getFormattedDay } from '@/src/utils/queryParams'
import { ToastMessage } from '@/src/components/Toast'
import { ExpiredOrdersDrawer } from '@/src/components/Modal/Orders/ExpiredOrders'

// const stats = [
//   { status: 'pending', title: 'Pedidos pendientes', count: 30, icon: 'pendientes' },
//   { status: OrderStateEnum.IN_PREPARATION, title: 'En preparacion', count: 3, icon: 'preparacion' },
//   { status: OrderStateEnum.COMPLETED, title: 'Pedidos finalizados', count: 24, icon: 'finalizados' },
//   { title: 'Pickers activos', count: 7, icon: 'activos' }
// ]

export default function Home () {
  useOrderStates()
  useOrderStats()
  useSystemPreferences()
  const [filters, setFilters] = useAtom(filtersAtom)
  const [, setActiveTab] = useAtom(activeTabAtom)
  const { warehouseConfig } = useWarehouseConfig()
  const { data: session } = useSession()
  const { data: orders, assignOrders } = useOrders(filters)
  const { data: stats } = useOrderStats()
  const urlPathName = 'homePage'

  const { isOpen: isExpiredOrdersModalOpen, onOpen: onExpiredOrdersModalOpen, onClose: onExpiredOrdersModalClose } = useDisclosure()

  useEffect(() => {
    const initializeTab = async () => {
      setActiveTab('pending')
      setFilters({ stateId: [OrderStateEnum.READY_TO_PICK, OrderStateEnum.PROGRAMMED, OrderStateEnum.IN_PREPARATION], assemblyDate: getFormattedDay() })
      try {
        await stats?.refetch()
        await orders?.refetch()
      } catch (error) {
        console.error('Failed to refetch orders:', error)
      }
    }
    void initializeTab()
  }, [])

  const expiredOrders = stats.data?.data?.data.find((stat: any) => stat.name === 'expired_orders')?.orders

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
          <Header title={session?.user.Tenants.name} showButton={false} />
        </GridItem>
        <GridItem m={4} area="tabs" h="100%">
          <Stats stats={stats.data?.data?.data} />
        </GridItem>
        <GridItem m={4} area="filters" h="100%">
          <TabButtons urlPathName={urlPathName} orderCounter={orders?.data?.data?.length} onClick={orders.refetch} />
        </GridItem>
        <GridItem m={4} area="main" h={`${orders?.data?.data.length * 110}px`} overflowY="auto" flexGrow={1}>
          {expiredOrders?.length > 0 ? <ToastMessage title={`${expiredOrders?.length} pedidos atrasados`} description='Para que se preparen tenés que reprogramarlos.' status='warning' onClick={onExpiredOrdersModalOpen} /> : null}
          <OrderList
            orders={orders?.data?.data.data}
            warehouseConfig={warehouseConfig}
            isLoading={orders.isLoading}
            isHomePage={true} />
        </GridItem>
      </Grid>
      <ExpiredOrdersDrawer
        warehouseConfig={warehouseConfig}
        assignOrders={assignOrders}
        isOpen={isExpiredOrdersModalOpen}
        onClose={onExpiredOrdersModalClose}
        orders={expiredOrders} />
    </main>
  )
}
