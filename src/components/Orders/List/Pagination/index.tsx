/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import { Button, Flex, Input, InputGroup } from '@chakra-ui/react'
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
      borderColor="gray.200"
      bg="white"
    >
      <Button
        leftIcon={<ChevronLeftIcon />}
        variant='none'
        onClick={handlePreviousDay}
        color="#2D41FC"
        _hover={{ bg: '#A0AAFF4D' }}
      >
        Anterior
      </Button>

      <InputGroup w='220px'>
        <Input
          type='date'
          value={currentDate}
          onChange={(e) => { handleDateChange(e.target.value) }}
          textAlign="left"
          bg='white'
        />
      </InputGroup>

      <Button
        rightIcon={<ChevronRightIcon />}
        variant='none'
        onClick={handleNextDay}
        color="#2D41FC"
        _hover={{ bg: '#A0AAFF4D' }}
      >
        Siguiente
      </Button>
    </Flex>
  )
}
