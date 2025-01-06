/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { List, VStack, Text, Box } from '@chakra-ui/react'
import { OrderCard } from '../Card'
import { type Order } from '@/src/types/order'
import { SkeletonList } from '../../Skeleton/List'
import { useMemo } from 'react'
import { selectedOrdersAtom } from '@/src/store/navigationAtom'
import { useAtom } from 'jotai'
import { formatDateToLocal } from '@/src/utils/date'
import { type Config } from '@/src/types/warehouse'
import { OrderStateEnum } from '@/src/types/order'

interface OrderListProps {
  orders: Order[]
  isLoading: boolean
  activeTab?: string
  warehouseConfig: Config
}

type GroupedOrders = Record<string, {
  date: string
  dateObj: Date
  shifts: Record<string, Order[]>
}>

export const OrderList = ({ orders = [], isLoading, activeTab, warehouseConfig }: OrderListProps) => {
  const [selectedOrders, setSelectedOrders] = useAtom(selectedOrdersAtom)

  const handleSelectOrder = (orderId: number) => {
    setSelectedOrders((prev) => {
      if (prev.includes(orderId)) {
        return prev.filter(id => id !== orderId)
      } else {
        return [...prev, orderId]
      }
    })
  }

  const getShiftName = (scheduleId: number | null | undefined) => {
    if (!scheduleId || !warehouseConfig?.use_shifts?.status) return 'Sin turno'

    const shift = warehouseConfig.use_shifts.shifts.find(s => s.id === scheduleId)
    if (!shift) return 'Sin turno'

    return `Turno de ${shift.name}`
  }

  const filteredAndGroupedOrders = useMemo(() => {
    // Primero filtramos los pedidos según el tab activo
    const filteredOrders = orders.filter(order => {
      if (!activeTab) return true
      if (activeTab === 'unprepared') {
        return [
          OrderStateEnum.NEW,
          OrderStateEnum.READY_TO_PICK,
          OrderStateEnum.SCHEDULED,
          OrderStateEnum.IN_PREPARATION,
          OrderStateEnum.PACKING,
          OrderStateEnum.DELIVERING
        ].includes(order.state_id ?? 0)
      } else if (activeTab === 'ready') {
        return [OrderStateEnum.FINISHED, OrderStateEnum.DELETED].includes(order.state_id ?? 0)
      }
      return true
    })

    // Luego agrupamos por fecha y turno
    const grouped: GroupedOrders = {}

    filteredOrders.forEach(order => {
      const date = order.assembly_date ? formatDateToLocal(order.assembly_date) : 'Sin fecha'
      const dateObj = order.assembly_date ? new Date(order.assembly_date) : new Date(0)
      const shift = getShiftName(order.assembly_schedule)

      if (!grouped[date]) {
        grouped[date] = {
          date,
          dateObj,
          shifts: {}
        }
      }

      if (!grouped[date].shifts[shift]) {
        grouped[date].shifts[shift] = []
      }

      grouped[date].shifts[shift].push(order)
    })

    // Ordenar las fechas de más reciente a más antigua
    const sortedDates = Object.entries(grouped)
      .sort(([, a], [, b]) => b.dateObj.getTime() - a.dateObj.getTime())

    // Ordenar los turnos según el orden en warehouseConfig
    const sortedGrouped = sortedDates.reduce<GroupedOrders>((acc, [date, group]) => {
      const sortedShifts = Object.entries(group.shifts)
        .sort(([a], [b]) => {
          // Si no hay turnos configurados, mantener el orden actual
          if (!warehouseConfig?.use_shifts?.status) return 0

          // Encontrar los IDs de los turnos
          const shiftA = warehouseConfig.use_shifts.shifts.find(s => s.name === a)
          const shiftB = warehouseConfig.use_shifts.shifts.find(s => s.name === b)

          // Si alguno no tiene turno, ponerlo al final
          if (!shiftA) return 1
          if (!shiftB) return -1

          return shiftA.id - shiftB.id
        })
        .reduce((shiftAcc, [shift, orders]) => ({
          ...shiftAcc,
          [shift]: orders
        }), {})

      acc[date] = {
        ...group,
        shifts: sortedShifts
      }
      return acc
    }, {})

    return sortedGrouped
  }, [orders, activeTab, warehouseConfig])

  if (isLoading) {
    return <SkeletonList />
  }

  return (
    <Box
      height="calc(100vh - 250px)"
      overflowY="auto"
      sx={{
        '&::-webkit-scrollbar': {
          width: '8px',
          borderRadius: '8px',
          backgroundColor: '#F5F5F5'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#DEE2E6',
          borderRadius: '8px'
        }
      }}
    >
      <VStack spacing={8} align="stretch" pb={8}>
        {Object.entries(filteredAndGroupedOrders).map(([date, dateGroup]) => (
          <Box key={date}>
            <Text fontSize="16px" fontWeight="bold" mb={4}>{date}</Text>
            <VStack spacing={6} align="stretch">
              {Object.entries(dateGroup.shifts).map(([shift, shiftOrders]) => (
                <Box key={shift}>
                  <Text fontSize="16px" fontWeight="medium" mb={4}>{shift}</Text>
                  <List spacing={0}>
                    {shiftOrders.map((order) => (
                      <OrderCard
                        key={order.id}
                        order={order}
                        onSelect={handleSelectOrder}
                        isSelected={selectedOrders.includes(order.id)}
                      />
                    ))}
                  </List>
                </Box>
              ))}
            </VStack>
          </Box>
        ))}
      </VStack>
    </Box>
  )
}
