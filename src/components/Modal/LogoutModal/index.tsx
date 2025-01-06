import {
  Modal,
  ModalOverlay,
  ModalContent,
  VStack,
  Box,
  Text
} from '@chakra-ui/react'
import { DefaultButton } from '../../Button'
import { InfoSvg } from '../../svg/infoSvg'
import Colors from '@/src/theme/Colors'

interface LogoutModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export const LogoutModal = ({ isOpen, onClose, onConfirm }: LogoutModalProps): JSX.Element => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW="400px" p={12} borderRadius="xl">
        <VStack spacing={6} align="center">
            <InfoSvg color={Colors.mainBlue} width={48} height={48} />
          <Text
            fontSize="lg"
            fontWeight="bold"
            textAlign="center"
          >
            ¿Querés cerrar sesión?
          </Text>

          <Box w="100%" display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Box mb={2}>
              <DefaultButton
                label="CERRAR SESIÓN"
                type="primary"
                onClick={onConfirm}
              />
            </Box>
            <DefaultButton
              label="ATRÁS"
              type="secondaryNoBg"
              onClick={onClose}
            />
          </Box>
        </VStack>
      </ModalContent>
    </Modal>
  )
}
