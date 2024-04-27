/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Box, FormControl, FormLabel, Input, ModalFooter, VStack, Text, Flex, Button } from '@chakra-ui/react'
import { useState } from 'react'
import { type UserCardProps } from '../Card'
import { DefaultButton } from '../../Button'
import { userModalStyles } from './styles' // Asegúrate que la ruta sea correcta

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
      <ModalContent style={userModalStyles.modalContent}>
        <ModalHeader style={userModalStyles.modalHeader}>{isNewUser ? 'Nuevo usuario' : user?.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl style={userModalStyles.inputFormControl} id="name">
              <FormLabel>Nombre</FormLabel>
              <Input
                placeholder="Nombre"
                name="name"
                value={user?.name}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl style={userModalStyles.inputFormControl} id="code">
              <FormLabel>Código</FormLabel>
              <Input
                placeholder="4 dígitos"
                name="code"
                value={user?.code}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl style={userModalStyles.inputFormControl} id="device">
              <FormLabel>Dispositivo</FormLabel>
              <Input
                placeholder="Dispositivo"
                name="device"
                value={user?.device}
                onChange={handleInputChange}
              />
            </FormControl>
            <Box sx={userModalStyles.profilePhotoBox}>
              <Text mb={2}>Foto de perfil</Text>
              {/* Aquí iría un componente o una lógica para subir fotos */}
              <Box borderWidth="1px" borderRadius="lg" p={4} textAlign="center">
                Arrastrá o seleccioná una foto
              </Box>
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter style={userModalStyles.modalFooter}>
          <Flex flexDirection='column' align='center' justifyContent='center'>
            <DefaultButton type="primary" label='GUARDAR CAMBIOS' onClick={handleSaveChanges} />
            {!isNewUser && (
              <Button style={userModalStyles.deleteButton} variant="ghost">ELIMINAR USUARIO</Button>
            )}
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
