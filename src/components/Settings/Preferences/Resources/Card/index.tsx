import React from 'react'
import {
  Box,
  Input,
  IconButton,
  VStack,
  HStack
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

interface ShiftCardProps {
  resourceName: string
  onResourceChange: (name: string) => void
  onDelete: () => void
}

export const ResourceCard: React.FC<ShiftCardProps> = ({ resourceName, onResourceChange, onDelete }) => {
  return (
    <Box w="full" p={4} bg="white" boxShadow="sm" borderRadius="lg" borderWidth="1px">
      <VStack align="stretch">
        <HStack justifyContent="space-between">
          <Input value={resourceName} onChange={(e) => { onResourceChange(e.target.value) }} />
          <IconButton
            aria-label="Delete resource"
            colorScheme='none'
            color='black'
            icon={<DeleteIcon />}
            onClick={onDelete}
          />
        </HStack>
      </VStack>
    </Box>
  )
}
