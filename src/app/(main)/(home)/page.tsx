/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import OrderList from '@/src/components/Orders/List'
import { Stats } from '@/src/components/Statistics'
import { Grid, GridItem, useDisclosure } from '@chakra-ui/react'
import './common.css'
import { TabButtons } from '@/src/components/Tabs'
import { Header } from '@/src/components/Header'
import { useAtom } from 'jotai'
import { activeTabAtom, filtersAtom } from '@/src/store/navigationAtom'
import { useEffect } from 'react'
import { OrderStateEnum } from '@/src/types/order'
import { getFormattedDay } from '@/src/utils/queryParams'
import { ToastMessage } from '@/src/components/Toast'
import { ExpiredOrdersDrawer } from '@/src/components/Modal/Orders/ExpiredOrders'
import { useAuthStore } from '@/src/store/authStore'
import { DashboardSkeleton } from '@/src/components/Skeleton/Dashboard'
import { useDashboard } from '@/src/hooks/useDashboard'

export default function Home () {
  const [filters, setFilters] = useAtom(filtersAtom)
  const [, setActiveTab] = useAtom(activeTabAtom)
  const { user } = useAuthStore()
  const { orders, stats, warehouseConfig, assignOrders, isLoading } = useDashboard(filters)
  const urlPathName = 'homePage'

  const { isOpen: isExpiredOrdersModalOpen, onOpen: onExpiredOrdersModalOpen, onClose: onExpiredOrdersModalClose } = useDisclosure()

  useEffect(() => {
    const initializeTab = async () => {
      setActiveTab('pending')
      setFilters({
        stateId: [
          OrderStateEnum.READY_TO_PICK,
          OrderStateEnum.SCHEDULED,
          OrderStateEnum.IN_PREPARATION
        ],
        assemblyDate: getFormattedDay()
      })
    }
    void initializeTab()
  }, [])

  const expiredOrders = stats?.data?.data?.data.find(
    (stat: any) => stat.name === 'expired_orders'
  )?.orders

  if (isLoading) {
    return <DashboardSkeleton />
  }

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
          <Header title={user?.Tenants?.name} showButton={false} />
        </GridItem>
        <GridItem m={4} area="tabs" h="100%">
          <Stats stats={stats?.data?.data?.data} />
        </GridItem>
        <GridItem m={4} area="filters" h="100%">
          <TabButtons
            urlPathName={urlPathName}
            orderCounter={orders?.data?.data?.length}
            onClick={orders?.refetch}
          />
        </GridItem>
        <GridItem m={4} area="main" h={`${orders?.data?.data?.length * 110}px`} overflowY="auto" flexGrow={1}>
          {expiredOrders?.length > 0 && (
            <ToastMessage
              title={`${expiredOrders.length} pedidos atrasados`}
              description='Para que se preparen tenés que reprogramarlos.'
              status='warning'
              onClick={onExpiredOrdersModalOpen}
            />
          )}
          <OrderList
            orders={orders?.data?.data?.data}
            warehouseConfig={warehouseConfig}
            isLoading={isLoading}
            isHomePage={true}
          />
        </GridItem>
      </Grid>
      <ExpiredOrdersDrawer
        warehouseConfig={warehouseConfig}
        assignOrders={assignOrders}
        isOpen={isExpiredOrdersModalOpen}
        onClose={onExpiredOrdersModalClose}
        orders={expiredOrders}
      />
    </main>
  )
}
