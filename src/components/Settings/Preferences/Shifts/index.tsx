/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Button, useToast, VStack, Input, IconButton, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai'
import { type UseShifts, type Shifts } from '@/src/types/warehouse'
import { ResourceCard } from '../Resources/Card'
import { ToastMessage } from '@/src/components/Toast'

export const ShiftsList = ({ shiftsConfig, onShiftsChange }: { shiftsConfig: UseShifts, onShiftsChange: (shifts: Shifts[]) => void }) => {
  const [shifts, setShifts] = useState(shiftsConfig.shifts)
  const [isAdding, setIsAdding] = useState(false)
  const [newShiftName, setNewShiftName] = useState('')
  const toast = useToast()

  const handleStartAddingResource = () => {
    setIsAdding(true)
    setNewShiftName('')
  }

  const handleConfirmAddResource = () => {
    if (!newShiftName.trim()) {
      toast({
        status: 'error',
        duration: 2000,
        isClosable: true,
        render: () => <ToastMessage title={'Error'} description={'El nombre del recurso no puede estar vacío.'} status='error' />
      })
      return
    }
    const newShift = {
      id: Math.floor(Math.random() * 10),
      name: newShiftName
    }
    const newShifts = [...shifts, newShift]
    setShifts(newShifts)
    onShiftsChange(newShifts)
    setIsAdding(false)
    toast({
      title: 'Recurso creado',
      description: 'El recurso ha sido añadido exitosamente.',
      status: 'success',
      duration: 2000,
      isClosable: true,
      render: () => <ToastMessage title={'Recurso creado'} description={'El recurso ha sido añadido exitosamente.'} status='success' />
    })
  }

  const handleResourceChange = (id: number, newName: string) => {
    const updatedResources = shifts.map(shifts =>
      shifts.id === id ? { ...shifts, name: newName } : shifts
    )
    setShifts(updatedResources)
    onShiftsChange(updatedResources)
  }

  // Eliminar recurso por id
  const handleDeleteResource = (id: number) => {
    const filteredShifts = shifts.filter(shift => shift.id !== id)
    setShifts(filteredShifts)
    onShiftsChange(filteredShifts)
    toast({
      title: 'Recurso eliminado',
      description: 'El recurso ha sido eliminado exitosamente.',
      status: 'success',
      duration: 2000,
      isClosable: true
    })
  }

  const handleCancelAddResource = () => {
    setIsAdding(false)
  }

  return (
    <VStack mt={4} spacing={4} align='start' w="full">
      {shiftsConfig.status && (
        <>
          {shifts.map(resource => (
            <ResourceCard
              key={resource.id}
              resourceName={resource.name}
              onResourceChange={(newName) => { handleResourceChange(resource.id, newName) }}
              onDelete={() => { handleDeleteResource(resource.id) }}
            />
          ))}
          {isAdding && (
            <Flex w='full' flexDirection='row' p={4} bg="white" boxShadow="sm" borderRadius="lg" borderWidth="1px">
              <Input
                placeholder="Nombre del recurso"
                value={newShiftName}
                onChange={(e) => { setNewShiftName(e.target.value) }}
              />
              <Flex>
                <IconButton
                  icon={<AiOutlineCheck />}
                  aria-label="Confirmar adición"
                  bg='white'
                  onClick={handleConfirmAddResource}
                />
                <IconButton
                  icon={<AiOutlineClose />}
                  aria-label="Cancelar adición"
                  bg='white'
                  onClick={handleCancelAddResource}
                />
              </Flex>
            </Flex>
          )}
          <Button p={0} color='#2D41FC' colorScheme='none' onClick={handleStartAddingResource}>
            Añadir nuevo recurso
          </Button>
        </>
      )}
    </VStack>
  )
}
