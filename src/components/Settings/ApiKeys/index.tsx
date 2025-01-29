import { DefaultButton } from '@/src/components/Button'
import { SettingsSection } from '@/src/components/Settings/Section'
import { generateApiKey, getApiKey, revokeApiKey } from '@/src/services/apiKeyService'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'

export const ApiKeysSettings = (): JSX.Element => {
  const [hasApiKey, setHasApiKey] = useState(false)
  const [newApiKey, setNewApiKey] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const fetchApiKeyStatus = useCallback(async (): Promise<void> => {
    try {
      const key = await getApiKey()
      setHasApiKey(!!key)
    } catch (error) {
      toast({
        title: 'Error al verificar el estado de la API Key',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }, [toast])

  useEffect(() => {
    void fetchApiKeyStatus()
  }, [fetchApiKeyStatus])

  const handleGenerateKey = async (): Promise<void> => {
    setIsLoading(true)
    try {
      const newKey = await generateApiKey()
      setNewApiKey(newKey)
      setHasApiKey(true)
      onOpen()
    } catch (error) {
      toast({
        title: 'Error al generar la API Key',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRevokeKey = async (): Promise<void> => {
    try {
      await revokeApiKey()
      setHasApiKey(false)
      toast({
        title: 'API Key revocada exitosamente',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
    } catch (error) {
      toast({
        title: 'Error al revocar la API Key',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }

  const handleCopyAndClose = (): void => {
    if (newApiKey) {
      void navigator.clipboard.writeText(newApiKey)
      toast({
        title: 'API Key copiada al portapapeles',
        status: 'success',
        duration: 2000,
        isClosable: true
      })
    }
    onClose()
    setNewApiKey(null)
  }

  const handleCloseModal = (): void => {
    toast({
      title: 'Advertencia',
      description: 'Si no has copiado la API Key, no podrás verla nuevamente',
      status: 'warning',
      duration: 5000,
      isClosable: true
    })
    onClose()
    setNewApiKey(null)
  }

  return (
    <SettingsSection
      title="API Key"
      description="Genera una API Key para integrar tu sistema con nuestra API de creación de pedidos. Solo puedes tener una API Key activa a la vez."
    >
      <Stack spacing={6}>
        {hasApiKey
          ? (
          <Box>
            <Alert status="info" variant="subtle" borderRadius="md">
              <AlertIcon />
              <Box>
                <AlertTitle>API Key Activa</AlertTitle>
                <AlertDescription>
                  Ya tienes una API Key generada. Si necesitas una nueva, primero debes revocar la actual.
                </AlertDescription>
              </Box>
            </Alert>
            <Button
              mt={4}
              colorScheme="red"
              variant="outline"
              size="sm"
              onClick={() => { void handleRevokeKey() }}
            >
              Revocar API Key
            </Button>
          </Box>
            )
          : (
          <>
            <Text color="gray.600">
              No tienes ninguna API Key activa. Genera una nueva para comenzar a usar la API.
            </Text>
            <DefaultButton
              type="primary"
              label="GENERAR API KEY"
              onClick={handleGenerateKey}
              isLoading={isLoading}
            />
          </>
            )}

        <Modal
          isOpen={isOpen}
          onClose={handleCloseModal}
          closeOnOverlayClick={false}
          closeOnEsc={false}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Tu Nueva API Key</ModalHeader>
            <ModalBody>
              <Alert status="warning" mb={4}>
                <AlertIcon />
                <AlertDescription>
                  Guarda esta API Key en un lugar seguro. No podrás verla nuevamente después de cerrar esta ventana.
                </AlertDescription>
              </Alert>
              <Box
                p={3}
                bg="gray.50"
                borderRadius="md"
                borderWidth={1}
                borderColor="gray.200"
                fontFamily="mono"
                fontSize="sm"
              >
                {newApiKey}
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={handleCopyAndClose}>
                Copiar y Cerrar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Stack>
    </SettingsSection>
  )
}
