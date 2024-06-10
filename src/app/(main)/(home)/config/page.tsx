/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import { DefaultButton } from '@/src/components/Button'
import { PreferenceSettings } from '@/src/components/Settings/Preferences'
import { ToastMessage } from '@/src/components/Toast'
import { useSystemPreferences } from '@/src/hooks/useConfig'
import { useLocalWarehouseConfig, useWarehouseConfig } from '@/src/hooks/useWarehouseConfig'
import { type Resources, type Shifts, type Config } from '@/src/types/warehouse'
import { Alert, AlertIcon, Box, Flex, Grid, GridItem, Heading, Spinner, useToast } from '@chakra-ui/react'
import { useState } from 'react'

export default function ConfigurationPage () {
  useSystemPreferences()
  const toast = useToast()
  const { isLoading, isError, updateConfig } = useSystemPreferences()
  const { setWarehouseConfig } = useWarehouseConfig()
  const { localWarehouseConfig, setLocalWarehouseConfig } = useLocalWarehouseConfig()
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false)
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState<boolean>(true)

  if (isError) return <Alert status="error"><AlertIcon />Error loading configuration</Alert>

  const handleChange = async (value: boolean, field: keyof Config) => {
    const newState: Config = { ...localWarehouseConfig, [field]: { ...localWarehouseConfig[field], status: value } }
    setLocalWarehouseConfig(newState)
    setWarehouseConfig(newState)
    setIsSaveButtonDisabled(false)
  }

  const handleResourcesChange = (newResources: Resources[]) => {
    setLocalWarehouseConfig((prevConfig: any) => ({
      ...prevConfig,
      use_resources: {
        ...prevConfig.use_resources,
        resources: [...newResources]
      }
    }))
    setIsSaveButtonDisabled(false)
  }

  const handleShiftChange = (newShifts: Shifts[]) => {
    setLocalWarehouseConfig((prevConfig: any) => ({
      ...prevConfig,
      use_shifts: {
        ...prevConfig.use_shifts,
        shifts: [...newShifts]
      }
    }))
    setIsSaveButtonDisabled(false)
  }

  const handleSaveChanges = async () => {
    setIsButtonLoading(true)
    updateConfig(localWarehouseConfig as Config)
    setTimeout(() => {
      setIsButtonLoading(false)
      toast({
        isClosable: true,
        duration: 2000,
        position: 'top-right',
        render: () => <ToastMessage title='Cambios guardados' status='success' />
      })
    }, 1500)
    setIsSaveButtonDisabled(true)
  }

  return (
    <>
    <Grid h="100vh" rowGap={4}
        templateAreas={`"title"
                        "main"`}
        gridTemplateRows={'70px 1fr'}
        gridTemplateColumns={'1fr'}>
          <GridItem m={4} area='title'>
          <Flex justifyContent='space-between'>
            <Box>
              <Heading as="h1" fontSize={40}>Configuración</Heading>
            </Box>
              <DefaultButton isLoading={isButtonLoading} isDisabled={isSaveButtonDisabled} type='primary' label='GUARDAR CAMBIOS' onClick={handleSaveChanges} />
          </Flex>
          </GridItem>
          <GridItem m={4} area='main' h="calc(100vh - 150px)" overflow="auto">
            <Box p={4}>
              {isLoading
                ? <Spinner />
                : <PreferenceSettings
                localConfig={localWarehouseConfig}
                onChange={handleChange}
                onResourceChange={handleResourcesChange}
                onShiftChange={handleShiftChange}
                />
              }
            </Box>
          </GridItem>
        </Grid>
    </>
  )
}
