/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Box, FormControl, FormLabel, Input, ModalFooter, VStack, Text, Flex, Button } from '@chakra-ui/react'
import { useState } from 'react'
import { type UserCardProps } from '../../../Users/Card'
import { DefaultButton } from '../../../Button'
import { userModalStyles } from './styles' // Asegúrate que la ruta sea correcta
import { useUsers } from '@/src/hooks/useUser'
import { UserRoleEnum } from '@/src/types/user'

interface UserModalProps {
  isOpen: boolean
  onClose: () => void
  userData?: UserCardProps
  isNewUser: boolean
}

export const UserModal = ({ isOpen, onClose, userData, isNewUser }: UserModalProps) => {
  const [user, setUser] = useState(userData)
  const { newUser, editUser } = useUsers(UserRoleEnum.PICKER)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'barcode') {
      setUser((prev: any) => ({ ...prev, [name]: Number(value) })); return
    }
    setUser((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleSaveChanges = async () => {
    if (isNewUser) {
      newUser({ ...user, role_id: UserRoleEnum.PICKER })
      setUser(undefined)
      onClose()
      return
    }
    if (user) {
      editUser({ userId: user.id, data: user })
    }
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent style={userModalStyles.modalContent}>
        <ModalHeader style={userModalStyles.modalHeader}>{isNewUser ? 'Nuevo usuario' : userData?.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={2}>
            <FormControl style={userModalStyles.inputFormControl} id="name">
              <FormLabel>Nombre</FormLabel>
              <Input
                placeholder="Nombre"
                name="name"
                value={user?.name}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl style={userModalStyles.inputFormControl} id="user_email">
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email"
                name="user_email"
                value={user?.user_email}
                onChange={handleInputChange}
              />
            </FormControl>
            {/* {isNewUser && <FormControl style={userModalStyles.inputFormControl} id="role_id">
              <FormLabel>Rol</FormLabel>
                <Select name="role_id" value={user?.role_id} onChange={(e) => handleInputChange} mb={4}>
                  <option value={1}>Admin</option>
                  <option value={2}>Picker</option>
                </Select>
            </FormControl>} */}
            <FormControl style={userModalStyles.inputFormControl} id="barcode">
              <FormLabel>Código</FormLabel>
              <Input
                type='number'
                placeholder="4 dígitos"
                name="barcode"
                value={user?.barcode}
                onChange={handleInputChange}
              />
            </FormControl>
            {isNewUser && <FormControl style={userModalStyles.inputFormControl} id="password">
              <FormLabel>Contraseña</FormLabel>
              <Input
                placeholder="Contraseña"
                name="password"
                value={user?.password}
                onChange={handleInputChange}
              />
            </FormControl>}
            {/* <FormControl style={userModalStyles.inputFormControl} id="device">
              <FormLabel>Dispositivo</FormLabel>
              <Input
                placeholder="Dispositivo"
                name="device"
                value={user?.device}
                onChange={handleInputChange}
              />
            </FormControl> */}
            <Box sx={userModalStyles.profilePhotoBox}>
              <Text mb={2}>Foto de perfil</Text>
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
