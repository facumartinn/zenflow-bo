/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { DefaultButton } from '@/src/components/Button'
import { useUsers } from '@/src/hooks/user/useUser'
import { selectedOrdersAtom } from '@/src/store/navigationAtom'
import { type User } from '@/src/types/user'
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
  InputGroup
} from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useState } from 'react'

interface AssignModalProps {
  assignOrders: any
  isOpen: boolean
  onClose: () => void
}

export const AssignOrdersModal = ({ assignOrders, isOpen, onClose }: AssignModalProps) => {
  const { data: users } = useUsers(2)
  const [assignedTo, setAssignedTo] = useState(0)
  const [selectedOrders] = useAtom(selectedOrdersAtom)

  const onAssign = () => {
    const updates = selectedOrders?.map(order => ({
      id: order,
      user_id: assignedTo === 0 ? null : assignedTo
    }))
    assignOrders({ orders: updates })
    onClose()
  }
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
    <ModalOverlay />
    <ModalContent width='430px'>
      <ModalHeader fontSize={32} pb={0}>Asignar picker</ModalHeader>
      <ModalBody pt={0}>
        <Text fontSize={14} color='#808081'>Asigna pedidos a uno o varios pickers para que sean ellos los únicos que lo puedan preparar.</Text>
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
        </InputGroup>
      </ModalBody>
      <ModalFooter display='flex' flexDirection='column' >
        <DefaultButton type='primary' label='GUARDAR CAMBIOS' onClick={onAssign} />
        <Button mt={4} variant='none' onClick={onClose}>ATRÁS</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  )
}
