/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Button, useToast, VStack, Input, IconButton, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai'
import { ResourceCard } from './Card'
import { type Resources, type UseResources } from '@/src/types/warehouse'

export const ResourcesList = ({ resourcesConfig, onResourcesChange }: { resourcesConfig: UseResources, onResourcesChange: (resources: Resources[]) => void }) => {
  const [resources, setResources] = useState(resourcesConfig.resources)
  const [isAdding, setIsAdding] = useState(false)
  const [newResourceName, setNewResourceName] = useState('')
  const toast = useToast()

  const handleStartAddingResource = () => {
    setIsAdding(true)
    setNewResourceName('')
  }

  const handleConfirmAddResource = () => {
    if (!newResourceName.trim()) {
      toast({
        title: 'Error',
        description: 'El nombre del recurso no puede estar vacío.',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
      return
    }
    const newResource = {
      id: Math.floor(Math.random() * 10),
      name: newResourceName
    }
    const newResources = [...resources, newResource]
    setResources(newResources)
    onResourcesChange(newResources)
    setIsAdding(false)
    toast({
      title: 'Recurso creado',
      description: 'El recurso ha sido añadido exitosamente.',
      status: 'success',
      duration: 2000,
      isClosable: true
    })
  }

  const handleResourceChange = (id: number, newName: string) => {
    const updatedResources = resources.map(resource =>
      resource.id === id ? { ...resource, name: newName } : resource
    )
    setResources(updatedResources)
    onResourcesChange(updatedResources)
  }

  // Eliminar recurso por id
  const handleDeleteResource = (id: number) => {
    const filteredResources = resources.filter(resource => resource.id !== id)
    setResources(filteredResources)
    onResourcesChange(filteredResources)
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
      {resourcesConfig.status && (
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
            Añadir nuevo recurso
          </Button>
        </>
      )}
    </VStack>
  )
}
