/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Flex, InputGroup, InputLeftElement, Input, Button } from '@chakra-ui/react'
import { SearchIcon, CalendarIcon } from '@chakra-ui/icons'
import { DefaultButton } from '@/src/components/Button'
import Colors from '@/src/theme/Colors'
import { TrashSvg } from '../../svg/trashSvg'
import { type DateRange } from 'react-day-picker'

interface OrdersActionsProps {
  selectedOrders: number[]
  onDelete: () => void
  onEdit: () => void
  onSearch: (value: string) => void
  onDateChange: (dateRange: DateRange | undefined) => void
}

export const OrdersActions = ({
  selectedOrders,
  onDelete,
  onEdit,
  onSearch,
  onDateChange
}: OrdersActionsProps) => {
  return selectedOrders?.length > 0
    ? (
    <Flex gap={4} alignItems="center">
        <Button
          onClick={onDelete}
          borderRadius="full"
          backgroundColor="transparent"
          border="1px"
          borderColor={Colors.mainBlue}
          p={0}
          w={10}
          h={10}
        >
          <TrashSvg color={Colors.mainBlue} />
        </Button>
      <DefaultButton
        label="EDITAR"
        onClick={onEdit}
      />
    </Flex>
      )
    : (
    <Flex gap={4} alignItems="center">
      <InputGroup maxW="200px">
        <InputLeftElement pointerEvents="none">
          <CalendarIcon color="#B7BEC4" />
        </InputLeftElement>
        <Input
          type="date"
          onChange={(e) => {
            // Crear la fecha usando el valor del input directamente (YYYY-MM-DD)
            const dateStr = e.target.value
            const [year, month, day] = dateStr.split('-').map(Number)

            // Crear la fecha en la zona horaria local
            const selectedDate = new Date(year, month - 1, day, 12, 0, 0, 0)

            const dateRange = {
              from: selectedDate,
              to: selectedDate
            }
            onDateChange(dateRange)
          }}
          borderRadius="xl"
          border="1px solid #B7BEC4"
          _focus={{ borderColor: Colors.mainBlue }}
          color="#4A5568"
        />
      </InputGroup>
      <InputGroup maxW="400px">
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="#B7BEC4" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Buscar..."
          onChange={(e) => { onSearch(e.target.value) }}
          borderRadius="xl"
          border="1px solid #B7BEC4"
          _placeholder={{ color: '#B7BEC4' }}
          _focus={{ borderColor: Colors.mainBlue }}
        />
      </InputGroup>
    </Flex>
      )
}
