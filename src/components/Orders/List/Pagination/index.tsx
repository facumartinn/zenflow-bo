/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Button, Flex, Input, useColorModeValue } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { filtersAtom, selectedOrdersAtom } from '@/src/store/navigationAtom'
import { useAtom } from 'jotai'
import { getFormattedDay } from '@/src/utils/queryParams'
import Colors from '@/src/theme/Colors'
import { type ChangeEvent } from 'react'

export const Pagination = () => {
  const [filters, setFilters] = useAtom(filtersAtom)
  const [, setSelectedOrders] = useAtom(selectedOrdersAtom)
  const currentDate = filters?.assemblyDate ?? getFormattedDay()

  const handleDateChange = (newDate: string) => {
    setFilters((prev) => ({ ...prev, assemblyDate: getFormattedDay(newDate) }))
    setSelectedOrders([])
  }

  const handlePreviousDay = () => {
    const date = new Date(currentDate + 'T00:00:00')
    date.setDate(date.getDate() - 1)
    handleDateChange(getFormattedDay(date.toISOString()))
  }

  const handleNextDay = () => {
    const date = new Date(currentDate + 'T00:00:00')
    date.setDate(date.getDate() + 1)
    handleDateChange(getFormattedDay(date.toISOString()))
  }

  const isToday = (dateStr: string) => {
    const today = getFormattedDay()
    return dateStr === today
  }

  return (
    <Flex
      align="center"
      justifyContent="center"
      px={4}
      pt={6}
      pb={16}
      mt="auto"
      bottom={0}
      borderTop="1px solid"
      borderColor={useColorModeValue(Colors.grey3, Colors.grey3)}
      bg={useColorModeValue(Colors.white, 'gray.800')}
    >
      <Button
        leftIcon={<ChevronLeftIcon />}
        variant='ghost'
        onClick={handlePreviousDay}
        color={useColorModeValue(Colors.mainBlue, Colors.white)}
      >
        Anterior
      </Button>

      <Input
        type='date'
        value={currentDate}
        onChange={(e: ChangeEvent<HTMLInputElement>) => { handleDateChange(e.target.value) }}
        textAlign="left"
        w='220px'
        mx={4}
        bg={useColorModeValue(Colors.white, '#2D3748')}
        borderColor={useColorModeValue(Colors.grey2, 'gray.600')}
        color={useColorModeValue(Colors.black, Colors.white)}
        _hover={{
          borderColor: useColorModeValue(Colors.grey3, 'gray.500')
        }}
      />

      <Button
        rightIcon={<ChevronRightIcon />}
        variant='ghost'
        onClick={handleNextDay}
        color={useColorModeValue(Colors.mainBlue, Colors.white)}
        isDisabled={isToday(currentDate)}
      >
        Siguiente
      </Button>
    </Flex>
  )
}
