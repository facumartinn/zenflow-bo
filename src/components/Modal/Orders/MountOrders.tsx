/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { DefaultButton } from '@/src/components/Button'
import { useOrderStats } from '@/src/hooks/useOrderStats'
import { useUsers } from '@/src/hooks/useUser'
import { OrderStateEnum } from '@/src/types/order'
import { getFormattedDay } from '@/src/utils/queryParams'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Select,
  InputGroup,
  Input
} from '@chakra-ui/react'
import { useState } from 'react'

interface AssignModalProps {
  title?: string
  description?: string
  buttonLabel?: string
  selectedOrders: number[]
  warehouseConfig: any
  assignOrders: any
  isOpen: boolean
  onClose: () => void
  onExpiredModalClose?: () => void
}

export const MountOrdersModal = ({ title, description, buttonLabel = 'SUBIR PEDIDO', selectedOrders, warehouseConfig, assignOrders, isOpen, onClose, onExpiredModalClose }: AssignModalProps) => {
  const { data: users } = useUsers(2)
  const [assignedTo, setAssignedTo] = useState(0)
  const [preparationDate, setPreparationDate] = useState('')
  const [shiftId, setShiftId] = useState(0)
  const { refetch: refetchStats } = useOrderStats()

  const onAssign = async () => {
    const updates = selectedOrders?.map(order => ({
      id: order,
      user_id: assignedTo === 0 ? null : assignedTo,
      assembly_date: getFormattedDay(preparationDate),
      assembly_schedule: shiftId
    }))
    assignOrders({ orders: updates, newStateId: OrderStateEnum.READY_TO_PICK })
    await refetchStats()
    onClose()
    onExpiredModalClose && onExpiredModalClose()
  }
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
    <ModalOverlay />
    <ModalContent width='430px'>
      <ModalHeader fontSize={32} pb={0}>{title}</ModalHeader>
      <ModalBody pt={0}>
        <Text fontSize={14} color='#808081'>{description}</Text>
        <InputGroup mt={8} display='flex' flexDirection='column' >
          <Text mb='4px' fontSize={14} fontWeight={500}>Asignado a</Text>
            <Select
            value={assignedTo}
            onChange={(e) => { setAssignedTo(Number(e.target.value)) }} mb={4}>
                <option value={0}>Todos</option>
            {Array.isArray(users?.data?.data) && users.data.data.map((user: any) => (
                <option key={user.id} value={user.id}>{user.name}</option>
            ))}
            </Select>
          <Text mb='4px' fontSize={14} fontWeight={500}>Fecha de preparación</Text>
          <Input
            type="date"
            value={preparationDate}
            onChange={(e) => { setPreparationDate(e.target.value) }}
            placeholder="Seleccionar fecha" mb={4} />
          {warehouseConfig?.use_shifts?.status && (
            <>
              <Text mb='4px' fontSize={14} fontWeight={500}>Turno</Text>
              <Select
                value={shiftId}
                onChange={(e) => { console.log(e.target.value); setShiftId(Number(e.target.value)) }}
                mb={4}>
                  <option value={0}>Sin Turno</option>
                {warehouseConfig?.use_shifts?.shifts.map((shift: any) => (
                  <option key={shift.id} value={shift.id}>{shift.name}</option>
                ))}
              </Select>
            </>

          )}
        </InputGroup>
      </ModalBody>
      <ModalFooter display='flex' flexDirection='column' >
        <DefaultButton type='primary' label={buttonLabel} onClick={onAssign} />
        <Button mt={4} variant='none' onClick={onClose}>ATRÁS</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  )
}
