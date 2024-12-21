// src/components/orders/FiltersConfig.js
import React from 'react'
import { IconButton, Button, Flex, Tooltip, useColorModeValue } from '@chakra-ui/react'
import { MdOutlinePersonAddAlt, MdOutlineEditCalendar, MdOutlineUnpublished } from 'react-icons/md'
import { PiTrash } from 'react-icons/pi'
import { type TabValue } from '../Tabs'

export interface ActionProps {
  onSelectAll: () => void
  onMountOrders: () => void
  onAssignOrders: () => void
  onScheduleOrders: () => void
  onDeleteOrders: () => void
  selectedOrders: number[]
  setSelectedOrders: (orders: number[]) => void
  ordersCount: number
}

export interface FilterConfigType {
  actions: React.FC<ActionProps>
}

// Default icon properties for reusability
const iconProps = {
  w: '6',
  h: '6',
  mr: '4',
  size: 'lg'
}

// General actions used across different tabs
const ActionComponents = {
  DeselectAll: ({ setSelectedOrders }: any) => (
    <Tooltip label='Deseleccionar'>
      <IconButton icon={<MdOutlineUnpublished size="32" />} {...iconProps} variant='none' aria-label="Deselect all orders" onClick={() => setSelectedOrders([])} />
    </Tooltip>
  ),
  Delete: ({ onDeleteOrders }: any) => (
    <Tooltip label='Eliminar'>
      <IconButton icon={<PiTrash size="32" />} {...iconProps} variant='none' aria-label="Delete order" onClick={onDeleteOrders} />
    </Tooltip>
  ),
  Assign: ({ onAssignOrders }: any) => (
    <Tooltip label='Asignar'>
      <IconButton icon={<MdOutlinePersonAddAlt size="32" />} variant='none' aria-label="Assign picker" {...iconProps} onClick={onAssignOrders} />
    </Tooltip>
  ),
  Schedule: ({ onScheduleOrders }: any) => (
    <Tooltip label='Programar'>
      <IconButton icon={<MdOutlineEditCalendar size="32" />} variant='none' {...iconProps} aria-label="Edit order" onClick={onScheduleOrders} />
    </Tooltip>
  ),
  UploadOrders: ({ onMountOrders }: any) => (
    <Button borderRadius='full' bg={useColorModeValue('#2D41FC', 'white')} color={useColorModeValue('white', 'gray.800')} px={6} py={4} _hover={{ bg: '#A0AAFF4D', color: '#2D41FC' }} onClick={onMountOrders}>
      SUBIR PEDIDOS
    </Button>
  ),
  SelectAll: ({ onSelectAll, ordersCount }: any) => (
    <Button fontSize={16} color={useColorModeValue('#2D41FC', 'white')} colorScheme='none' onClick={onSelectAll} isDisabled={ordersCount < 0} _disabled={{ color: 'grey', cursor: 'not-allowed' }}>
      SELECCIONAR TODOS
    </Button>
  )
}

export const filterConfigs: Record<Partial<TabValue>, { actions: React.FC<ActionProps> }> = {
  new: {
    actions: ({ selectedOrders, setSelectedOrders, onSelectAll, onMountOrders, onDeleteOrders, ordersCount }) => (
      <Flex justifyContent='end' alignItems='center' w='35%'>
        {selectedOrders.length > 0
          ? (
          <>
            <ActionComponents.DeselectAll setSelectedOrders={setSelectedOrders} />
            <ActionComponents.Delete onDeleteOrders={onDeleteOrders} />
            <ActionComponents.UploadOrders onMountOrders={onMountOrders} />
          </>
            )
          : (
          <ActionComponents.SelectAll onSelectAll={onSelectAll} ordersCount={ordersCount} />
            )}
      </Flex>
    )
  },
  pending: {
    actions: ({ selectedOrders, setSelectedOrders, onSelectAll, onAssignOrders, onScheduleOrders, onDeleteOrders, ordersCount }) => (
      <Flex justifyContent='end' w='35%'>
        {selectedOrders.length > 0
          ? (
          <>
            <ActionComponents.DeselectAll setSelectedOrders={setSelectedOrders} />
            <ActionComponents.Assign onAssignOrders={onAssignOrders} />
            <ActionComponents.Schedule onScheduleOrders={onScheduleOrders} />
            <ActionComponents.Delete onDeleteOrders={onDeleteOrders} />
          </>
            )
          : (
          <ActionComponents.SelectAll onSelectAll={onSelectAll} ordersCount={ordersCount} />
            )}
      </Flex>
    )
  },
  completed: {
    actions: () => <Flex justifyContent='end' w='35%' />
  },
  doing: {
    actions: () => <Flex justifyContent='end' w='35%' />
  }
}
