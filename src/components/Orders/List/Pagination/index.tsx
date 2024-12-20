/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Button, Flex, Input, useColorMode } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { filtersAtom, selectedOrdersAtom } from '@/src/store/navigationAtom'
import { useAtom } from 'jotai'
import { getFormattedDay } from '@/src/utils/queryParams'

interface PaginationProps {
  date?: string
}

export const Pagination = ({ date }: PaginationProps) => {
  const [filters, setFilters] = useAtom(filtersAtom)
  const [, setSelectedOrders] = useAtom(selectedOrdersAtom)
  const { colorMode } = useColorMode()
  const currentDate = filters?.assemblyDate || getFormattedDay()

  const handleDateChange = (newDate: string) => {
    setFilters((prev) => ({ ...prev, assemblyDate: getFormattedDay(newDate) }))
    setSelectedOrders([])
  }

  const handlePreviousDay = () => {
    const date = new Date(currentDate)
    date.setDate(date.getDate() - 1)
    handleDateChange(date.toISOString())
  }

  const handleNextDay = () => {
    const date = new Date(currentDate)
    date.setDate(date.getDate() + 1)
    handleDateChange(date.toISOString())
  }

  return (
    <Flex
      align="center"
      justifyContent="center"
      px={4}
      py={6}
      mt="auto"
      borderTop="1px solid"
      borderColor={colorMode === 'dark' ? 'darkMode.border.primary' : 'gray.200'}
      bg={colorMode === 'dark' ? 'darkMode.bg.secondary' : 'white'}
    >
      <Button
        leftIcon={<ChevronLeftIcon />}
        variant='ghost'
        onClick={handlePreviousDay}
        color="brand.500"
        _hover={{
          bg: colorMode === 'dark' ? 'whiteAlpha.200' : 'brand.50'
        }}
      >
        Anterior
      </Button>

      <Input
        type='date'
        value={currentDate}
        onChange={(e) => { handleDateChange(e.target.value) }}
        textAlign="left"
        w='220px'
        mx={4}
        bg={colorMode === 'dark' ? 'darkMode.bg.tertiary' : 'white'}
        borderColor={colorMode === 'dark' ? 'darkMode.border.primary' : 'gray.200'}
        color={colorMode === 'dark' ? 'darkMode.text.primary' : 'inherit'}
        _hover={{
          borderColor: colorMode === 'dark' ? 'darkMode.border.secondary' : 'gray.300'
        }}
      />

      <Button
        rightIcon={<ChevronRightIcon />}
        variant='ghost'
        onClick={handleNextDay}
        color="brand.500"
        _hover={{
          bg: colorMode === 'dark' ? 'whiteAlpha.200' : 'brand.50'
        }}
      >
        Siguiente
      </Button>
    </Flex>
  )
}
