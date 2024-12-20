/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { selectedOrdersAtom } from '@/src/store/navigationAtom'
import { OrderStateEnum } from '@/src/types/order'
import { Button, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { PiTrash } from 'react-icons/pi'

interface ConfirmationModalProps {
  type: 'order' | 'user'
  updateOrderStatus: any
  isOpen: boolean
  onClose: () => void
}

export const DeleteModal = ({ type, updateOrderStatus, isOpen, onClose }: ConfirmationModalProps) => {
  const [selectedOrders] = useAtom(selectedOrdersAtom)

  const onConfirm = () => {
    if (type === 'order') {
      const updates = selectedOrders?.map(order => ({ id: order }))
      updateOrderStatus({ orders: updates, stateId: OrderStateEnum.DELETED })
    }
    if (type === 'user') {
      console.log('delete user')
    }
    onClose()
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent borderRadius={20} width='450px' height='300px'>
        <ModalHeader pt={8} pb={0} display='flex' alignItems='center' justifyContent='center'>
          <PiTrash size="40" color='#EC0000' fontWeight={700} />
        </ModalHeader>
        <ModalBody display='flex' alignItems='center' justifyContent='center'>
            <Text align='center' width='70%' fontWeight={700} fontSize={20}>¿Estás seguro que querés eliminar el {type === 'order' ? 'pedido' : 'usuario'}?</Text>
        </ModalBody>
        <ModalFooter display='flex' flexDirection='column'>
          <Button bg='#EC0000' color='white' borderRadius='50' px={6} py={6} _hover={{ border: '2px solid', color: '#EC0000', borderColor: '#EC0000', bg: 'transparent' }} onClick={onConfirm}>
            ELIMINAR
          </Button>
          <Button bg='transparent' mt={4} borderRadius='100%' onClick={onClose}>
            ATRÁS
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
