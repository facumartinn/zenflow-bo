/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Button, useToast, VStack, Input, IconButton, Flex } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai'
import { type UseShifts, type Shifts } from '@/src/types/warehouse'
import { ToastMessage } from '@/src/components/Toast'
import { ShiftCard } from './ShiftCard'

export const ShiftsList = ({ shiftsConfig, onShiftsChange }: { shiftsConfig: UseShifts, onShiftsChange: (shifts: Shifts[]) => void }) => {
  const [shifts, setShifts] = useState(shiftsConfig?.shifts || [])
  const [isAdding, setIsAdding] = useState(false)
  const [newShiftName, setNewShiftName] = useState('')
  const toast = useToast()

  useEffect(() => {
    setShifts(shiftsConfig?.shifts || [])
  }, [shiftsConfig])

  const handleStartAddingShift = () => {
    setIsAdding(true)
    setNewShiftName('')
  }

  const handleConfirmAddShift = () => {
    if (!newShiftName.trim()) {
      toast({
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
        render: () => <ToastMessage title={'Error'} description={'El nombre del turno no puede estar vacío.'} status='error' />
      })
      return
    }
    const newShift = {
      id: shifts.length > 0 ? Math.max(...shifts.map(shift => shift.id)) + 1 : 1,
      name: newShiftName
    }
    const newShifts = [...shifts, newShift]
    setShifts(newShifts)
    onShiftsChange(newShifts)
    setIsAdding(false)
  }

  const handleShiftChange = (id: number, newName: string) => {
    const updatedShifts = shifts.map(shift =>
      shift.id === id ? { ...shift, name: newName } : shift
    )
    setShifts(updatedShifts)
    onShiftsChange(updatedShifts)
  }

  const handleDeleteShift = (id: number) => {
    const filteredShifts = shifts.filter(shift => shift.id !== id)
    setShifts(filteredShifts)
    onShiftsChange(filteredShifts)
  }

  const handleCancelAddShift = () => {
    setIsAdding(false)
  }

  return (
    <VStack mt={4} spacing={4} align='start' w="full">
      {shiftsConfig?.status && (
        <>
          {shifts.map(shift => (
            <ShiftCard
              key={shift.id}
              shiftId={shift.id}
              shiftName={shift.name}
              onShiftChange={(newName) => { handleShiftChange(shift.id, newName) }}
              onDelete={() => { handleDeleteShift(shift.id) }}
            />
          ))}
          {isAdding && (
            <Flex w='full' flexDirection='row' p={4} bg="white" boxShadow="sm" borderRadius="lg" borderWidth="1px">
              <Input
                placeholder="Nombre del turno"
                value={newShiftName}
                onChange={(e) => { setNewShiftName(e.target.value) }}
              />
              <Flex>
                <IconButton
                  icon={<AiOutlineCheck />}
                  aria-label="Confirmar adición"
                  bg='white'
                  onClick={handleConfirmAddShift}
                />
                <IconButton
                  icon={<AiOutlineClose />}
                  aria-label="Cancelar adición"
                  bg='white'
                  onClick={handleCancelAddShift}
                />
              </Flex>
            </Flex>
          )}
          <Button p={0} color='#2D41FC' colorScheme='none' onClick={handleStartAddingShift}>
            + Nuevo turno
          </Button>
        </>
      )}
    </VStack>
  )
}
