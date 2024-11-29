/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import { Grid, GridItem, useDisclosure, Box } from '@chakra-ui/react'
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
import OrderList from '@/src/components/Orders/List'
import { Stats } from '@/src/components/Statistics'

export default function Home () {
  const [filters, setFilters] = useAtom(filtersAtom)
  const [, setActiveTab] = useAtom(activeTabAtom)
  const { user } = useAuthStore()
  const { orders, stats, warehouseConfig, assignOrders, isLoading, handleTabSelection } = useDashboard(filters)
  const urlPathName = 'homePage'

  const {
    isOpen: isExpiredOrdersModalOpen,
    onOpen: onExpiredOrdersModalOpen,
    onClose: onExpiredOrdersModalClose
  } = useDisclosure()

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

  const expiredOrders = stats?.data?.data?.data?.find(
    (stat: any) => stat.name === 'expired_orders'
  )?.orders

  if (isLoading) {
    return <DashboardSkeleton />
  }

  return (
    <Grid
      h="100vh"
      px={{ base: 4, md: 8 }}
      py={{ base: 4, md: 6 }}
      gap={{ base: 4, md: 6 }}
      templateRows={{
        base: 'auto auto auto 1fr',
        md: 'auto auto auto 1fr'
      }}
      templateColumns="1fr"
      overflow="hidden"
    >
      <GridItem>
        <Header
          title={user?.Tenants?.name}
          showButton={false}
        />
      </GridItem>

      <GridItem>
        <Stats stats={stats?.data?.data} />
      </GridItem>

      <GridItem>
        <TabButtons
          urlPathName={urlPathName}
          orderCounter={orders?.data?.data?.length}
          onClick={handleTabSelection}
        />
      </GridItem>

      <GridItem
        position="relative"
        overflowY="auto"
        pr={{ base: 0, md: 4 }}
      >
        {expiredOrders?.length > 0 && (
          <Box mb={4}>
            <ToastMessage
              title={`${expiredOrders.length} pedidos atrasados`}
              description='Para que se preparen tenés que reprogramarlos.'
              status='warning'
              onClick={onExpiredOrdersModalOpen}
            />
          </Box>
        )}
        <OrderList
          orders={orders?.data?.data}
          warehouseConfig={warehouseConfig}
          isLoading={isLoading}
          isHomePage={true}
        />
      </GridItem>

      <ExpiredOrdersDrawer
        warehouseConfig={warehouseConfig}
        assignOrders={assignOrders}
        isOpen={isExpiredOrdersModalOpen}
        onClose={onExpiredOrdersModalClose}
        orders={expiredOrders}
      />
    </Grid>
  )
}
