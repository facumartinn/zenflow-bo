/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { DefaultButton } from '@/src/components/Button'
import { ToastMessage } from '@/src/components/Toast'
import { selectedOrdersAtom } from '@/src/store/navigationAtom'
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
  Input,
  useToast
} from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useState } from 'react'

interface AssignModalProps {
  warehouseConfig: any
  assignOrders: any
  isOpen: boolean
  onClose: () => void
}

export const ScheduleOrdersModal = ({ warehouseConfig, assignOrders, isOpen, onClose }: AssignModalProps) => {
  const toast = useToast()
  const [preparationDate, setPreparationDate] = useState('')
  const [shiftId, setShiftId] = useState(1)
  const [selectedOrders, setSelectedOrders] = useAtom(selectedOrdersAtom)

  const onAssign = () => {
    const updates = selectedOrders?.map(order => ({
      id: order,
      assembly_date: getFormattedDay(preparationDate),
      assembly_schedule: shiftId
    }))
    assignOrders({ orders: updates })
    toast({
      isClosable: true,
      duration: 2000,
      position: 'top-right',
      render: () => <ToastMessage title={'Programado con éxito'} description={`Se programaron ${updates?.length} pedidos`} status='success' />
    })
    setSelectedOrders([])
    onClose()
  }
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
    <ModalOverlay />
    <ModalContent width='430px'>
      <ModalHeader fontSize={32} pb={0}>Programar pedidos</ModalHeader>
      <ModalBody pt={0}>
        <InputGroup mt={8} display='flex' flexDirection='column'>
          <Text mb='4px' fontSize={14} fontWeight={500}>Fecha</Text>
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
                defaultValue={warehouseConfig?.use_shifts?.shifts[0]?.id}
                onChange={(e) => { setShiftId(Number(e.target.value)) }}
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
      <ModalFooter display='flex' flexDirection='column'>
        <DefaultButton type='primary' label='GUARDAR CAMBIOS' onClick={onAssign} />
        <Button mt={4} variant='none' onClick={onClose}>ATRÁS</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  )
}
