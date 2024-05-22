/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { DefaultButton } from '@/src/components/Button'
import { useUsers } from '@/src/hooks/user/useUser'
import { selectedOrdersAtom } from '@/src/store/navigationAtom'
import { OrderStateEnum } from '@/src/types/order'
import { type User } from '@/src/types/user'
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
import { useAtom } from 'jotai'
import { useState } from 'react'

interface AssignModalProps {
  warehouseConfig: any
  assignOrders: any
  isOpen: boolean
  onClose: () => void
}

export const MountOrdersModal = ({ warehouseConfig, assignOrders, isOpen, onClose }: AssignModalProps) => {
  const { data: users } = useUsers(2)
  const [assignedTo, setAssignedTo] = useState(0)
  const [preparationDate, setPreparationDate] = useState('')
  const [shiftId, setShiftId] = useState(0)
  const [selectedOrders] = useAtom(selectedOrdersAtom)

  const onAssign = () => {
    const updates = selectedOrders?.map(order => ({
      id: order,
      user_id: assignedTo === 0 ? null : assignedTo,
      assembly_date: getFormattedDay(preparationDate),
      assembly_schedule: shiftId
    }))
    assignOrders({ orders: updates, newStateId: OrderStateEnum.READY_TO_PICK })
    onClose()
  }
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
    <ModalOverlay />
    <ModalContent width='430px'>
      <ModalHeader fontSize={32} pb={0}>Subir pedidos</ModalHeader>
      <ModalBody pt={0}>
        <Text fontSize={14} color='#808081'>Los cambios se aplicarán a todos los pedidos seleccionados.</Text>
        <InputGroup mt={8} display='flex' flexDirection='column' >
          <Text mb='4px' fontSize={14} fontWeight={500}>Asignado a</Text>
            <Select
            value={assignedTo}
            onChange={(e) => { setAssignedTo(Number(e.target.value)) }} mb={4}>
                <option value={0}>Todos</option>
            {users?.data?.data?.data.map((user: User) => (
                <option key={user.id} value={user.id}>{user.name}</option>
            ))}
            </Select>
          <Text mb='4px' fontSize={14} fontWeight={500}>Fecha de preparación</Text>
          <Input
            type="date"
            value={preparationDate}
            onChange={(e) => { setPreparationDate(e.target.value) }}
            placeholder="Seleccionar fecha" mb={4} />
          {warehouseConfig?.use_shifts.status && (
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
        <DefaultButton type='primary' label='SUBIR PEDIDO' onClick={onAssign} />
        <Button mt={4} variant='none' onClick={onClose}>ATRÁS</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  )
}
