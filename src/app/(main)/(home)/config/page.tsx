/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

// import { DefaultButton } from '@/src/components/Button'
// import { PreferenceSettings } from '@/src/components/Settings/Preferences'
import { ApiKeysSettings } from '@/src/components/Settings/ApiKeys'
// import { ToastMessage } from '@/src/components/Toast'
import { useSystemPreferences } from '@/src/hooks/useConfig'
// import { useLocalWarehouseConfig, useWarehouseConfig } from '@/src/hooks/useWarehouseConfig'
// import { type Resources, type Shifts, type Config } from '@/src/types/warehouse'
import { Box, Container, Flex, Heading } from '@chakra-ui/react'
// import { useState } from 'react'

export default function ConfigurationPage () {
  useSystemPreferences()
  // const toast = useToast()
  // const { isLoading, isError, updateConfig } = useSystemPreferences()
  // const { setWarehouseConfig } = useWarehouseConfig()
  // const { localWarehouseConfig, setLocalWarehouseConfig } = useLocalWarehouseConfig()
  // const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false)
  // const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState<boolean>(true)

  // if (isError) return <Alert status="error"><AlertIcon />Error loading configuration</Alert>

  // const handleChange = async (value: boolean, field: keyof Config) => {
  //   const newState: Config = { ...localWarehouseConfig, [field]: { ...localWarehouseConfig[field], status: value } }
  //   setLocalWarehouseConfig(newState)
  //   setWarehouseConfig(newState)
  //   setIsSaveButtonDisabled(false)
  // }

  // const handleResourcesChange = (newResources: Resources[]) => {
  //   setLocalWarehouseConfig((prevConfig: any) => ({
  //     ...prevConfig,
  //     use_resources: {
  //       ...prevConfig.use_resources,
  //       resources: [...newResources]
  //     }
  //   }))
  //   setIsSaveButtonDisabled(false)
  // }

  // const handleShiftChange = (newShifts: Shifts[]) => {
  //   setLocalWarehouseConfig((prevConfig: any) => ({
  //     ...prevConfig,
  //     use_shifts: {
  //       ...prevConfig.use_shifts,
  //       shifts: [...newShifts]
  //     }
  //   }))
  //   setIsSaveButtonDisabled(false)
  // }

  // const handleSaveChanges = async () => {
  //   setIsButtonLoading(true)
  //   // updateConfig(localWarehouseConfig as Config)
  //   setTimeout(() => {
  //     setIsButtonLoading(false)
  //     toast({
  //       isClosable: true,
  //       duration: 2000,
  //       position: 'top-right',
  //       render: () => <ToastMessage title='Cambios guardados' status='success' />
  //     })
  //   }, 1500)
  //   setIsSaveButtonDisabled(true)
  // }

  return (
    <Box h="100vh" overflow="hidden" position="relative">
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        overflowY="auto"
        bg="gray.50"
        pb={24}
      >
        <Container maxW="container.lg" py={8}>
          {/* <Stack spacing={8}> */}
            <Flex justifyContent="space-between" alignItems="center" position="sticky" top={0} bg="gray.50" py={2} zIndex={1}>
              <Box>
                <Heading size="lg" color="gray.700">Configuración</Heading>
              </Box>
              {/* <DefaultButton
                isLoading={isButtonLoading}
                isDisabled={isSaveButtonDisabled}
                type="primary"
                label="GUARDAR CAMBIOS"
                onClick={handleSaveChanges}
              /> */}
            </Flex>

            {/* {isError
              ? (
              <Alert status="error" borderRadius="md">
                <AlertIcon />
                Error al cargar la configuración
              </Alert>
                )
              : isLoading
                ? (
              <Flex justify="center" py={12}>
                <Spinner size="lg" />
              </Flex>
                  )
                : (
              <Stack spacing={6}>
                {/* <PreferenceSettings
                  localConfig={localWarehouseConfig}
                  onChange={handleChange}
                  onResourceChange={handleResourcesChange}
                  onShiftChange={handleShiftChange}
                /> */}
                <ApiKeysSettings />
              {/* </Stack> */}
                  {/* )} */}
          {/* </Stack> */}
        </Container>
      </Box>
      {/* // </Box> */}
   </Box>
  )
}
