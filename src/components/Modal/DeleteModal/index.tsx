import {
  Modal,
  ModalOverlay,
  ModalContent,
  VStack,
  Text,
  Box
} from '@chakra-ui/react'
import { DefaultButton } from '../../Button'
import Colors from '@/src/theme/Colors'
import { WarningSvg } from '../../svg/warningSvg'

interface DeleteModalProps {
  title: string
  subtitle: string
  isOpen: boolean
  onClose: () => void
  onDelete: () => void
}

export const DeleteModal = ({ title, subtitle, isOpen, onClose, onDelete }: DeleteModalProps): JSX.Element => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW="400px" p={6} borderRadius="xl">
        <VStack spacing={6} align="center">
            <WarningSvg color={Colors.warningYellow} />
            <Text
            fontSize="lg"
            fontWeight="medium"
            textAlign="center"
            w={44}
          >
            {title}
          </Text>
          <Text
            fontSize="sm"
            fontWeight="medium"
            textAlign="center"
            w={44}
          >
            {subtitle}
          </Text>

          <Box w="100%" display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Box mb={2}>
              <DefaultButton
                label="ELIMINAR"
                type="primary"
                onClick={onDelete}
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
