import React from 'react'
import {
  Box,
  Input,
  IconButton,
  VStack,
  HStack
} from '@chakra-ui/react'
import { DeleteIcon, DragHandleIcon } from '@chakra-ui/icons'

interface ShiftCardProps {
  shiftName: string
  shiftId: number
  onShiftChange: (name: string) => void
  onDelete: () => void
}

export const ShiftCard: React.FC<ShiftCardProps> = ({ shiftName, shiftId, onShiftChange, onDelete }) => {
  return (
    <Box w="full" py={4} bg="white">
      <VStack align="stretch">
            <Box>Turno ID: {shiftId}</Box>
        <HStack justifyContent="space-between" alignItems='center'>
          <Input value={shiftName} onChange={(e) => { onShiftChange(e.target.value) }} />
          <IconButton
            aria-label="Delete shift"
            colorScheme='none'
            color='black'
            icon={<DeleteIcon />}
            onClick={onDelete}
          />
          <IconButton
            aria-label="Reorder shift"
            colorScheme='none'
            color='black'
            icon={<DragHandleIcon />}
            // Aquí debería ir la lógica para manejar el cambio de orden
          />
        </HStack>
      </VStack>
    </Box>
  )
}
