/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  VStack
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

interface ActionPopoverProps {
  onLoadOrders: () => void
  onProgramPicking: () => void
}

export const ActionPopover = ({ onLoadOrders, onProgramPicking }: ActionPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger>
      <Button rightIcon={<ChevronDownIcon />} borderRadius='full' bg='#2D41FC' color="white" px={8} py={4} _hover={{ bg: '#A0AAFF4D', color: '#2D41FC' }}>SUBIR PEDIDOS</Button>
      </PopoverTrigger>
      <PopoverContent w='230px'>
        <PopoverArrow />
        <PopoverBody>
          <VStack w='full' m={0} p={0}>
            <Button p={2} w="full" bg='transparent' justifyContent='flex-start' onClick={onLoadOrders} _hover={{ color: '#2D41FC' }}>
              SUBIR PEDIDOS
            </Button>
            <Button p={2} w="full" bg='transparent' justifyContent='flex-start' onClick={onProgramPicking} _hover={{ color: '#2D41FC' }}>
              PROGRAMAR PICKING
            </Button>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default ActionPopover
