/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import { Button, Flex, Input, InputGroup } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { filtersAtom, selectedOrdersAtom } from '@/src/store/navigationAtom'
import { useAtom } from 'jotai'
import { getFormattedDay } from '@/src/utils/queryParams'

interface PaginationProps {
  date?: string
  onPreviousClick?: () => void
  onNextClick?: () => void
}

export const Pagination = ({ date, onPreviousClick, onNextClick }: PaginationProps) => {
  const [, setFilters] = useAtom(filtersAtom)
  const [, setSelectedOrders] = useAtom(selectedOrdersAtom)

  const handleDateSelection = (date: string) => {
    setFilters((prev) => ({ ...prev, assemblyDate: getFormattedDay(date) }))
    setSelectedOrders([])
  }
  return (
    <Flex align="center" justifyContent="center" px={4} mb={16}>
      <Button leftIcon={<ChevronLeftIcon />} variant='none' onClick={onPreviousClick}>
        Anterior
      </Button>

      <InputGroup w='220px'>
        <Input type='date' placeholder={new Date().toDateString()} value={date} onChange={(e) => { handleDateSelection(e.target.value) }} textAlign="left" bg='white' />
      </InputGroup>

      <Button rightIcon={<ChevronRightIcon />} variant='none' onClick={onNextClick}>
        Siguiente
      </Button>
    </Flex>
  )
}
