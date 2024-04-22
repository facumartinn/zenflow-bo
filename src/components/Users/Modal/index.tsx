/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Box, Button, FormControl, FormLabel, Input, ModalFooter, VStack, Text, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { type UserCardProps } from '../Card'
import { DefaultButton } from '../../Button'

interface UserModalProps {
  isOpen: boolean
  onClose: () => void
  userData?: UserCardProps
  isNewUser: boolean
}

export const UserModal = ({ isOpen, onClose, userData, isNewUser }: UserModalProps) => {
  const [user, setUser] = useState(userData)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleSaveChanges = () => {
    // Handle save changes
    onClose()
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader fontSize={32}>{isNewUser ? 'Nuevo usuario' : user?.name}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <VStack spacing={4}>
          <FormControl id="name">
            <FormLabel>Nombre</FormLabel>
            <Input
              placeholder="Nombre"
              name="name"
              value={user?.name}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="code">
            <FormLabel>Código</FormLabel>
            <Input
              placeholder="4 dígitos"
              name="code"
              value={user?.code}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="device">
            <FormLabel>Dispositivo</FormLabel>
            <Input
              placeholder="Dispositivo"
              name="device"
              value={user?.device}
              onChange={handleInputChange}
            />
          </FormControl>
          <Box w='full'>
            <Text mb={2}>Foto de perfil</Text>
            {/* Aquí iría un componente o una lógica para subir fotos */}
            <Box borderWidth="1px" borderRadius="lg" p={4} textAlign="center">
              Arrastrá o seleccioná una foto
            </Box>
          </Box>
        </VStack>
      </ModalBody>
      <ModalFooter justifyContent='center'>
        <Flex flexDirection='column' align='center' justifyContent='center'>
            <DefaultButton type="primary" label='GUARDAR CAMBIOS' onClick={handleSaveChanges} />
            {!isNewUser && (
            <Button variant="ghost" mt={4} colorScheme="red">ELIMINAR USUARIO</Button>
            )}
        </Flex>
      </ModalFooter>
    </ModalContent>
  </Modal>
  )
}
