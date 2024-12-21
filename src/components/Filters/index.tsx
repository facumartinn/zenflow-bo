/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { InputGroup, InputLeftElement, Input, HStack, Text, Flex, useColorModeValue } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { getFormattedDay } from '@/src/utils/queryParams'
import { useAtom } from 'jotai'
import { activeTabAtom, filtersAtom, orderCounterAtom, selectedOrdersAtom } from '@/src/store/navigationAtom'
import { filterConfigs } from './FiltersConfig'

/*
  FILTROS
    NEW: Filtro por estado.
    PENDING: Filtro por estado, turno(si hay) y fecha de hoy(modificable).
    COMPLETED: Filtro por estado, turno(si hay) y fecha de hoy(modificable).
*/

interface FiltersProps {
  onSelectAll: () => void
  onAssignOrders: () => void
  onMountOrders: () => void
  onScheduleOrders: () => void
  onDeleteOrders: () => void
  ordersLength: number
}

export const Filters = ({
  onSelectAll,
  onMountOrders,
  onAssignOrders,
  onScheduleOrders,
  onDeleteOrders,
  ordersLength
}: FiltersProps) => {
  const [activeTab] = useAtom(activeTabAtom)
  const [ordersCount] = useAtom(orderCounterAtom)
  const [selectedOrders, setSelectedOrders] = useAtom(selectedOrdersAtom)
  const [filters] = useAtom(filtersAtom)
  const selectedDate = filters?.assemblyDate || getFormattedDay()
  const Actions = filterConfigs[activeTab]?.actions || (() => null)
  const textColor = useColorModeValue('gray.800', 'white')
  const inputBgColor = useColorModeValue('white', '#2D3748')
  return (
      <HStack mt={2} spacing={2} flexDirection={'column'} alignItems={'flex-start'}>
        <Flex w='100%' justifyContent='space-between'>
        <InputGroup w='45%' mr={4} borderRadius={'full'} bg={inputBgColor}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input type="text" placeholder="Número de pedido" color={textColor} />
        </InputGroup>
        <Actions
          selectedOrders={selectedOrders}
          setSelectedOrders={setSelectedOrders}
          onSelectAll={onSelectAll}
          ordersCount={ordersCount}
          onMountOrders={onMountOrders}
          onAssignOrders={onAssignOrders}
          onScheduleOrders={onScheduleOrders}
          onDeleteOrders={onDeleteOrders}
           />
      </Flex>
        <Text fontSize={14} mt={4} color={textColor}>{selectedDate} - {ordersLength > 0 ? ordersLength : 'No hay'} pedidos</Text>
      </HStack>
  )
}
