/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'
import { Box, useDisclosure } from '@chakra-ui/react'
import { useOrders } from '@/src/hooks/useOrders'
import { OrderList } from '@/src/components/Orders/List'
import { OrdersActions } from '@/src/components/Orders/Actions'
import { useAtom } from 'jotai'
import { activeTabAtom, selectedOrdersAtom, filtersAtom } from '@/src/store/navigationAtom'
import { useWarehouseConfig } from '@/src/hooks/useWarehouseConfig'
import { Header } from '@/src/components/Header'
import { TabButtons } from '@/src/components/Tabs'
import { MountOrdersModal } from '@/src/components/Modal/Orders/MountOrders'
import { DeleteModal } from '@/src/components/Modal/DeleteModal'
import { EmptyState } from '@/src/components/EmptyState'
import { type DateRange } from 'react-day-picker'

export default function OrdersPage () {
  const { orders, isLoading, handleSearch, handleTabSelection, assignOrders, deleteOrders, pagination } = useOrders()
  const { warehouseConfig } = useWarehouseConfig()
  const [activeTab] = useAtom(activeTabAtom)
  const [selectedOrders] = useAtom(selectedOrdersAtom)
  const [, setFilters] = useAtom(filtersAtom)
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure()
  const { isOpen: isScheduleModalOpen, onOpen: onScheduleModalOpen, onClose: onScheduleModalClose } = useDisclosure()

  const handleDelete = () => {
    deleteOrders(selectedOrders)
    onDeleteModalClose()
  }

  const handleDateChange = (dateRange: DateRange | undefined) => {
    if (!dateRange?.from) return

    const selectedDate = dateRange.from
    if (!selectedDate) return

    // Obtener la fecha en formato YYYY-MM-DD manteniendo la zona horaria local
    const year = selectedDate.getFullYear()
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
    const day = String(selectedDate.getDate()).padStart(2, '0')
    const formattedDate = `${year}-${month}-${day}`

    setFilters((prev) => {
      const newFilters = {
        ...prev,
        assemblyDate: formattedDate
      }
      return newFilters
    })
  }

  return (
    <>
      <Box p={8}>
        <Header
          title="Pedidos"
          showButton={false}
        />
        <Box display="flex" flexDirection="row" justifyContent="space-between" gap={4} my={8}>
          <TabButtons
            urlPathName="ordersPage"
            ordersLength={orders?.length ?? 0}
            onClick={handleTabSelection}
          />
          <OrdersActions
            selectedOrders={selectedOrders}
            onDelete={onDeleteModalOpen}
            onEdit={onScheduleModalOpen}
            onSearch={handleSearch}
            onDateChange={handleDateChange}
          />
        </Box>
        <Box mt={4}>
          {!isLoading && orders?.length === 0
            ? <EmptyState message="No hay pedidos para enviar" />
            : <OrderList
                orders={orders ?? []}
                isLoading={isLoading}
                activeTab={activeTab}
                warehouseConfig={warehouseConfig}
                pagination={pagination}
              />
          }
        </Box>
      </Box>

      <MountOrdersModal
        title="Editar pedidos"
        description="Los cambios se aplicarán a los pedidos seleccionados."
        buttonLabel="GUARDAR"
        selectedOrders={selectedOrders}
        warehouseConfig={warehouseConfig}
        assignOrders={assignOrders}
        isOpen={isScheduleModalOpen}
        onClose={onScheduleModalClose}
      />

      <DeleteModal
        title="¿Eliminar pedidos seleccionados?"
        subtitle="No vas a poder recuperar los pedidos"
        onDelete={handleDelete}
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalClose}
      />
    </>
  )
}
