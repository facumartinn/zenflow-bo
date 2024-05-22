/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { VStack, Divider, Text, FormControl, Flex, FormLabel, Switch, useToast } from '@chakra-ui/react'
import { type Resources, type Config, type Shifts } from '@/src/types/warehouse'
import { useState } from 'react'
import { warehouseConfigAtom } from '@/src/store/configAtom'
import { useAtom } from 'jotai'
import { DefaultButton } from '../../Button'
import { useSystemPreferences } from '@/src/hooks/useConfig'
import { preferences } from './settings'
import { ToastMessage } from '../../Toast'

export const PreferenceSettings = ({
  warehouseSettings
}: { warehouseSettings: Config }) => {
  const [,setWarehouseConfig] = useAtom(warehouseConfigAtom)
  const { updateConfig } = useSystemPreferences()
  const [localConfig, setLocalConfig] = useState<Config>(warehouseSettings)
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState<boolean>(true)
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false)
  const toast = useToast()

  const handleChange = async (value: boolean, field: keyof Config) => {
    const newState = { ...localConfig, [field]: { ...localConfig[field], status: value } }
    setLocalConfig(newState)
    setWarehouseConfig(newState)
    setIsSaveButtonDisabled(false)
  }

  const handleResourcesChange = (newResources: Resources[]) => {
    setLocalConfig(prevConfig => ({
      ...prevConfig,
      use_resources: {
        ...prevConfig.use_resources,
        resources: [...newResources]
      }
    }))
    setIsSaveButtonDisabled(false)
  }

  const handleShiftChange = (newShifts: Shifts[]) => {
    setLocalConfig(prevConfig => ({
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
    updateConfig({
      config: localConfig
    })
    setTimeout(() => {
      setIsButtonLoading(false)
      toast({
        status: 'success',
        duration: 2000,
        isClosable: true,
        render: () => <ToastMessage title={'Cambios guardados'} status='success' />
      })
    }, 1500)
    setIsSaveButtonDisabled(true)
  }

  return (
    <>
      <Flex w='full' mb={4} justifyContent='end'>
        <DefaultButton type='primary' label='Guardar Cambios' onClick={handleSaveChanges} isDisabled={isSaveButtonDisabled} isLoading={isButtonLoading} />
      </Flex>
      <VStack divider={<Divider />} spacing={2} align={'start'}>
        {preferences.map((preference, index) => (
          <FormControl key={index} display='flex' flexDirection='column' alignItems='start' mb={4}>
            <Flex w="full" justifyContent='space-between' alignItems='start' mb={4}>
            <FormLabel htmlFor={preference.label} mb='0' fontSize={16} fontWeight='bold'>
              {preference.title}
            </FormLabel>
            <Switch
              id={preference.label}
              colorScheme={'brand'}
              defaultChecked={localConfig[preference.label as keyof Config]?.status}
              onChange={async e => { await handleChange(e.target.checked, preference.label as keyof Config) }}
            />
            </Flex>
            <Text textAlign='start' fontSize={14} color='#4A4D4F'>{preference.description}</Text>
            {localConfig && preference.children(localConfig, preference.label === 'use_resources' ? handleResourcesChange : handleShiftChange)}
          </FormControl>
        ))}
      </VStack>
    </>
  )
}
