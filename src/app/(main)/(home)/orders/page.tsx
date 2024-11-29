/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import { Grid, GridItem } from '@chakra-ui/react'
import { Header } from '@/src/components/Header'
import { TabButtons } from '@/src/components/Tabs'
import { Filters } from '@/src/components/Filters'
import OrderList from '@/src/components/Orders/List'
import { ToastMessage } from '@/src/components/Toast'
import { OrdersSkeleton } from '@/src/components/Skeleton/Orders'
import { MountOrdersModal } from '@/src/components/Modal/Orders/MountOrders'
import { AssignOrdersModal } from '@/src/components/Modal/Orders/AssignOrders'
import { ScheduleOrdersModal } from '@/src/components/Modal/Orders/ScheduleOrders'
import { DeleteModal } from '@/src/components/Modal/DeleteModal'
import { ExpiredOrdersDrawer } from '@/src/components/Modal/Orders/ExpiredOrders'
import { useOrders } from '@/src/hooks/useOrders'

export default function OrdersPage () {
  const {
    selectedOrders,
    orderCounter,
    orders,
    warehouseConfig,
    assignOrders,
    updateOrderStatus,
    isLoading,
    handleSelectAll,
    handleTabSelection,
    expiredOrders,
    modals: {
      mount: { isOpen: isMountModalOpen, onOpen: onMountModalOpen, onClose: onMountModalClose },
      assign: { isOpen: isAssignModalOpen, onOpen: onAssignModalOpen, onClose: onAssignModalClose },
      schedule: { isOpen: isScheduleModalOpen, onOpen: onScheduleModalOpen, onClose: onScheduleModalClose },
      delete: { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose },
      expired: { isOpen: isExpiredOrdersModalOpen, onOpen: onExpiredOrdersModalOpen, onClose: onExpiredOrdersModalClose }
    }
  } = useOrders()

  if (isLoading) {
    return <OrdersSkeleton />
  }

  return (
    <Grid
      h="100vh"
      px={{ base: 4, md: 8 }}
      py={{ base: 4, md: 6 }}
      gap={{ base: 4, md: 6 }}
      templateRows={{
        base: 'auto auto auto auto 1fr',
        md: 'auto auto auto auto 1fr'
      }}
      templateColumns="1fr"
      overflow="hidden"
    >
      <GridItem>
        <Header
          title="Pedidos"
          showButton={false}
        />
      </GridItem>

      <GridItem>
        <TabButtons
          urlPathName="ordersPage"
          orderCounter={orderCounter}
          onClick={handleTabSelection}
        />
      </GridItem>

      <GridItem>
        <Filters
          onSelectAll={handleSelectAll}
          onMountOrders={onMountModalOpen}
          onAssignOrders={onAssignModalOpen}
          onScheduleOrders={onScheduleModalOpen}
          onDeleteOrders={onDeleteModalOpen}
          ordersLength={orders?.data?.data?.length ?? 0}
        />
      </GridItem>

      {expiredOrders?.length > 0 && (
        <GridItem>
          <ToastMessage
            title={`${expiredOrders?.length} pedidos atrasados`}
            description='Para que se preparen tenés que reprogramarlos.'
            status='warning'
            onClick={onExpiredOrdersModalOpen}
          />
        </GridItem>
      )}

      <GridItem
        position="relative"
        overflowY="auto"
        pr={{ base: 0, md: 4 }}
      >
        <OrderList
          orders={orders?.data?.data}
          warehouseConfig={warehouseConfig}
          isLoading={isLoading}
          isHomePage={false}
        />
      </GridItem>

      <MountOrdersModal
        title='Subir pedidos'
        description='Los cambios se aplicarán a todos los pedidos seleccionados.'
        buttonLabel='SUBIR PEDIDO'
        warehouseConfig={warehouseConfig}
        selectedOrders={selectedOrders}
        assignOrders={assignOrders}
        isOpen={isMountModalOpen}
        onClose={onMountModalClose}
      />

      <AssignOrdersModal
        assignOrders={assignOrders}
        isOpen={isAssignModalOpen}
        onClose={onAssignModalClose}
      />

      <DeleteModal
        type='order'
        updateOrderStatus={updateOrderStatus}
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalClose}
      />

      <ScheduleOrdersModal
        warehouseConfig={warehouseConfig}
        assignOrders={assignOrders}
        isOpen={isScheduleModalOpen}
        onClose={onScheduleModalClose}
      />

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
