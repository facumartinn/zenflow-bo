/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, VStack, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { DefaultButton } from '../../../Button'
import { userModalStyles } from './styles'
import { useUsers } from '@/src/hooks/useUser'
import { UserRoleEnum, type User } from '@/src/types/user'

interface UserModalProps {
  isOpen: boolean
  onClose: () => void
  userId?: number
  initialData?: {
    name: string
    barcode?: number
  }
}

export const UserModal = ({ isOpen, onClose, userId, initialData }: UserModalProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name ?? '',
    barcode: initialData?.barcode?.toString() ?? ''
  })

  const { newUser, editUser } = useUsers(UserRoleEnum.PICKER)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'barcode') {
      // Solo permitir números y limitar a 4 dígitos
      const numericValue = value.replace(/\D/g, '').slice(0, 4)
      setFormData(prev => ({ ...prev, barcode: numericValue }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSave = () => {
    if (userId) {
      // Editar usuario existente
      editUser({
        userId,
        data: {
          name: formData.name,
          barcode: parseInt(formData.barcode)
        }
      })
    } else {
      // Crear nuevo usuario
      const newUserData: Omit<Partial<User>, 'id'> = {
        name: formData.name,
        barcode: parseInt(formData.barcode),
        role_id: UserRoleEnum.PICKER,
        user_email: `picker${formData.barcode}@zenflow.com`,
        password: formData.barcode
      }
      newUser(newUserData as User)
    }
    onClose()
  }

  const isFormValid = formData.name.trim() !== '' && formData.barcode.length === 4

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='lg' isCentered>
      <ModalOverlay />
      <ModalContent style={userModalStyles.modalContent}>
        <ModalHeader style={userModalStyles.modalHeader}>
          {userId ? 'Editar picker' : 'Crear picker'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Nombre y apellido</FormLabel>
              <Input
                placeholder="Nombre y apellido"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Código de acceso (4 dígitos)</FormLabel>
              <Input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="0000"
                name="barcode"
                value={formData.barcode}
                onChange={handleInputChange}
                maxLength={4}
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter style={userModalStyles.modalFooter}>
          <Flex flexDirection='column' align='center' justifyContent='center' gap={2}>
            <DefaultButton
              type="primary"
              label={userId ? 'GUARDAR' : 'CREAR PICKER'}
              onClick={handleSave}
              isDisabled={!isFormValid}
            />
            <DefaultButton
              type="secondaryNoBg"
              label="CANCELAR"
              onClick={onClose}
            />
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
