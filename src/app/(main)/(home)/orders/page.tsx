/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import { useAtom } from 'jotai'
import { activeTabAtom, filtersAtom, orderCounterAtom, selectedOrdersAtom } from '@/src/store/navigationAtom'
import { useWarehouseConfig } from '@/src/hooks/useWarehouseConfig'
import { useOrders } from '@/src/hooks/useOrders'
import { useSystemPreferences } from '@/src/hooks/useConfig'
import './common.css'
import { Filters } from '@/src/components/Filters'
import { Header } from '@/src/components/Header'
import OrderList from '@/src/components/Orders/List'
import { TabButtons } from '@/src/components/Tabs'
import { Grid, GridItem, useDisclosure } from '@chakra-ui/react'
import { OrderStateEnum, type Order } from '@/src/types/order'
import { MountOrdersModal } from '@/src/components/Modal/Orders/MountOrders'
import { AssignOrdersModal } from '@/src/components/Modal/Orders/AssignOrders'
import { ScheduleOrdersModal } from '@/src/components/Modal/Orders/ScheduleOrders'
import { useEffect } from 'react'
import { DeleteModal } from '@/src/components/Modal/DeleteModal'

export default function OrdersPage () {
  const urlPathName = 'ordersPage'
  useSystemPreferences()
  const [, setSelectedOrders] = useAtom(selectedOrdersAtom)
  const [, setActiveTab] = useAtom(activeTabAtom)
  const [orderCounter] = useAtom(orderCounterAtom)
  const [filters, setFilters] = useAtom(filtersAtom)
  const { warehouseConfig } = useWarehouseConfig()
  const { data: orders, assignOrders, updateOrderStatus } = useOrders(filters)
  const orderList = orders?.data?.data.data

  useEffect(() => {
    const initializeTab = async () => {
      setActiveTab('new')
      setFilters({ stateId: [OrderStateEnum.NEW] })
      try {
        await orders?.refetch()
      } catch (error) {
        console.error('Failed to refetch orders:', error)
      }
    }
    void initializeTab()
  }, [])

  const { isOpen: isMountModalOpen, onOpen: onMountModalOpen, onClose: onMountModalClose } = useDisclosure()
  const { isOpen: isAssignModalOpen, onOpen: onAssignModalOpen, onClose: onAssignModalClose } = useDisclosure()
  const { isOpen: isScheduleModalOpen, onOpen: onScheduleModalOpen, onClose: onScheduleModalClose } = useDisclosure()
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure()

  const selectAllOrders = () => {
    const filteredOrders = orderList.filter((order: Order) => order.state_id !== OrderStateEnum.IN_PREPARATION)
    const selectedOrderIds = filteredOrders.map((order: Order) => order.id)
    setSelectedOrders(selectedOrderIds as number[])
  }

  const handleTabSelection = async () => {
    await orders?.refetch()
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
          <TabButtons urlPathName={urlPathName} orderCounter={orderCounter} onClick={handleTabSelection} />
        </GridItem>
        <GridItem mt={4} mx={4} area="filters" h="100%">
          <Filters
            onSelectAll={selectAllOrders}
            onMountOrders={onMountModalOpen}
            onAssignOrders={onAssignModalOpen}
            onScheduleOrders={onScheduleModalOpen}
            onDeleteOrders={onDeleteModalOpen}
            ordersLength={orderList?.length}
            />
        </GridItem>
        <GridItem mt={4} mx={4} area="main" overflowY="scroll">
          <OrderList
            orders={orderList}
            warehouseConfig={warehouseConfig}
            isLoading={orders.isLoading}
            isHomePage={false} />
        </GridItem>
      </Grid>
      <MountOrdersModal
        warehouseConfig={warehouseConfig}
        assignOrders={assignOrders}
        isOpen={isMountModalOpen}
        onClose={onMountModalClose} />
      <AssignOrdersModal
        assignOrders={assignOrders}
        isOpen={isAssignModalOpen}
        onClose={onAssignModalClose} />
      <DeleteModal
        type='order'
        updateOrderStatus={updateOrderStatus}
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalClose} />
      <ScheduleOrdersModal
        warehouseConfig={warehouseConfig}
        assignOrders={assignOrders}
        isOpen={isScheduleModalOpen}
        onClose={onScheduleModalClose} />
    </main>
  )
}
