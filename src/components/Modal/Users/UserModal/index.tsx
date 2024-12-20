/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, VStack, Flex, Button } from '@chakra-ui/react'
import { useState } from 'react'
import { DefaultButton } from '../../../Button'
import { userModalStyles } from './styles' // Asegúrate que la ruta sea correcta
import { useUsers } from '@/src/hooks/useUser'
import { UserRoleEnum } from '@/src/types/user'

interface UserModalProps {
  isOpen: boolean
  onClose: () => void
  userData: UserCardProps
  isNewUser: boolean
}

interface UserCardProps {
  id: number
  role_id: number
  name: string
  user_email: string
  barcode?: number
  password?: string
  tenant_id: number
  warehouse_id: number
  device?: string
  pickingSpeed?: number
  speedTrend?: 'increasing' | 'decreasing'
}

export const UserModal = ({ isOpen, onClose, userData, isNewUser }: UserModalProps) => {
  const [user, setUser] = useState<UserCardProps | undefined>(isNewUser
    ? {
        id: 0,
        role_id: UserRoleEnum.PICKER,
        name: '',
        user_email: '',
        barcode: undefined,
        password: '',
        tenant_id: userData?.tenant_id,
        warehouse_id: userData?.warehouse_id,
        device: undefined,
        pickingSpeed: undefined,
        speedTrend: undefined
      }
    : userData)
  const { newUser, editUser } = useUsers(UserRoleEnum.PICKER)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'barcode') {
      setUser(prev => prev ? ({ ...prev, [name]: value ? Number(value) : undefined }) : undefined)
      return
    }
    setUser(prev => prev ? ({ ...prev, [name]: value }) : undefined)
  }

  const handleSaveChanges = async () => {
    if (!user) return

    if (isNewUser) {
      // Aseguramos que todos los campos requeridos estén presentes
      const newUserData = {
        ...user,
        role_id: UserRoleEnum.PICKER,
        tenant_id: 1, // Estos valores deberían venir de algún contexto o prop
        warehouse_id: 1
      }
      newUser(newUserData)
      setUser(undefined)
      onClose()
      return
    }

    // Para edición, solo enviamos los campos editables
    const editableData = {
      name: user.name,
      barcode: user.barcode
    }

    editUser({ userId: user.id, data: editableData })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent style={userModalStyles.modalContent}>
        <ModalHeader style={userModalStyles.modalHeader}>
          {isNewUser ? 'Nuevo usuario' : userData?.name}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={2}>
            <FormControl style={userModalStyles.inputFormControl} id="name">
              <FormLabel>Nombre</FormLabel>
              <Input
                placeholder="Nombre"
                name="name"
                value={user?.name ?? ''}
                onChange={handleInputChange}
              />
            </FormControl>
            {isNewUser && (
              <FormControl style={userModalStyles.inputFormControl} id="user_email">
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="Email"
                  name="user_email"
                  value={user?.user_email ?? ''}
                  onChange={handleInputChange}
                />
              </FormControl>
            )}
            <FormControl style={userModalStyles.inputFormControl} id="barcode">
              <FormLabel>Código</FormLabel>
              <Input
                type='number'
                placeholder="4 dígitos"
                name="barcode"
                value={user?.barcode ?? ''}
                onChange={handleInputChange}
              />
            </FormControl>
            {isNewUser && (
              <FormControl style={userModalStyles.inputFormControl} id="password">
                <FormLabel>Contraseña</FormLabel>
                <Input
                  type="password"
                  placeholder="Contraseña"
                  name="password"
                  value={user?.password ?? ''}
                  onChange={handleInputChange}
                />
              </FormControl>
            )}
          </VStack>
        </ModalBody>
        <ModalFooter style={userModalStyles.modalFooter}>
          <Flex flexDirection='column' align='center' justifyContent='center'>
            <DefaultButton
              type="primary"
              label='GUARDAR CAMBIOS'
              onClick={handleSaveChanges}
              isDisabled={!user?.name} // Deshabilitar si no hay nombre
            />
            {!isNewUser && (
              <Button style={userModalStyles.deleteButton} variant="ghost">
                ELIMINAR USUARIO
              </Button>
            )}
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
