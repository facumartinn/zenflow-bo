/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Button, useToast, VStack, Input, IconButton, Flex } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai'
import { ResourceCard } from './Card'
import { type Resources, type UseResources } from '@/src/types/warehouse'
import { ToastMessage } from '@/src/components/Toast'

export const ResourcesList = ({ resourcesConfig, onResourcesChange }: { resourcesConfig: UseResources, onResourcesChange: (resources: Resources[]) => void }) => {
  const [resources, setResources] = useState(resourcesConfig?.resources || [])
  const [isAdding, setIsAdding] = useState(false)
  const [newResourceName, setNewResourceName] = useState('')
  const toast = useToast()

  useEffect(() => {
    setResources(resourcesConfig?.resources || [])
  }, [resourcesConfig])

  const handleStartAddingResource = () => {
    setIsAdding(true)
    setNewResourceName('')
  }

  const handleConfirmAddResource = () => {
    if (!newResourceName.trim()) {
      toast({
        status: 'error',
        duration: 2000,
        isClosable: true,
        render: () => <ToastMessage title={'Error'} description={'El nombre del recurso no puede estar vacío.'} status='error' />
      })
      return
    }
    const newResource = {
      id: resources.length > 0 ? Math.max(...resources.map(resource => resource.id)) + 1 : 1,
      name: newResourceName
    }
    const newResources = [...resources, newResource]
    setResources(newResources)
    onResourcesChange(newResources)
    setIsAdding(false)
    toast({
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top-right',
      render: () => <ToastMessage title='Recurso creado' description={'El recurso ha sido añadido exitosamente.'} status='success' />
    })
  }

  const handleResourceChange = (id: number, newName: string) => {
    const updatedResources = resources.map(resource =>
      resource.id === id ? { ...resource, name: newName } : resource
    )
    setResources(updatedResources)
    onResourcesChange(updatedResources)
  }

  const handleDeleteResource = (id: number) => {
    const filteredResources = resources.filter(resource => resource.id !== id)
    setResources(filteredResources)
    onResourcesChange(filteredResources)
    toast({
      status: 'success',
      duration: 2000,
      isClosable: true,
      render: () => <ToastMessage title={'Recurso eliminado'} description={'El recurso ha sido eliminado exitosamente.'} status='success' />
    })
  }

  const handleCancelAddResource = () => {
    setIsAdding(false)
  }

  return (
    <VStack mt={4} spacing={4} align='start' w="full">
      {resourcesConfig?.status && (
        <>
          {resources.map(resource => (
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
                value={newResourceName}
                onChange={(e) => { setNewResourceName(e.target.value) }}
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
            + Nuevo empaque
          </Button>
        </>
      )}
    </VStack>
  )
}
