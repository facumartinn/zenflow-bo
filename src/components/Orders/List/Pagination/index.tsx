/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import { Button, Flex, Input, InputGroup } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

interface PaginationProps {
  date?: string
  onPreviousClick?: () => void
  onNextClick?: () => void
  onDateChange: (e: string) => void
}

export const Pagination = ({ date, onPreviousClick, onNextClick, onDateChange }: PaginationProps) => {
  const today = new Date()
  return (
    <Flex align="center" justify="center" p={4}>
      <Button leftIcon={<ChevronLeftIcon />} variant='none' onClick={onPreviousClick}>
        Anterior
      </Button>

      <InputGroup w='220px'>
        <Input type='date' defaultValue={today.toString()} value={date} onChange={(e) => { onDateChange(e.target.value) }} textAlign="left" bg='white' />
      </InputGroup>

      <Button rightIcon={<ChevronRightIcon />} variant='none' onClick={onNextClick}>
        Siguiente
      </Button>
    </Flex>
  )
}
