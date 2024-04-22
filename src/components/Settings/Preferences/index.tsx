/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { VStack, Divider, Text, FormControl, Flex, FormLabel, Switch, useToast, Box, Icon } from '@chakra-ui/react'
import { type Resources, type Config, type Shifts } from '@/src/types/warehouse'
import { useState } from 'react'
import { warehouseConfigAtom } from '@/src/store/configAtom'
import { useAtom } from 'jotai'
import { DefaultButton } from '../../Button'
import { FaRegCheckCircle } from 'react-icons/fa'
import { ResourcesList } from './Resources'
import { useSystemPreferences } from '@/src/hooks/config/useConfig'
import { ShiftsList } from './Shifts'

interface PreferenceProps {
  title: string
  label: string
  description: string
  isChecked: (config: Config, handleShiftsChange: () => void) => boolean
  children: (config: Config, handleResourcesChange: (str: any) => void) => React.ReactNode
}

const preferences: PreferenceProps[] = [
  {
    title: 'Picking automático',
    label: 'automatic_picking',
    description: 'Encienda esta opción para que todos los nuevos pedidos entrantes se envíen a la lista de pendientes de picking automaticamente.',
    isChecked: (config: Config) => config.automatic_picking.status,
    children: () => null
  },
  {
    title: 'Uso de turnos',
    label: 'use_shifts',
    description: 'Encienda esta opción para dividir los dias por turnos.',
    isChecked: (config: Config) => config.use_shifts.status,
    children: (config: Config, handleShiftChange: any) => <ShiftsList shiftsConfig={config.use_shifts} onShiftsChange={handleShiftChange} />
  },
  {
    title: 'Gestión de recursos',
    label: 'use_resources',
    description: 'Los recursos son aquellos elementos de packing, como pallets, cajas, bolsas, que ayudan a identificar el pedido entregado. Activá esta opción para crear los tuyos',
    isChecked: (config: Config) => config.use_resources.status,
    children: (config: Config, handleResourcesChange: any) => <ResourcesList resourcesConfig={config.use_resources} onResourcesChange={handleResourcesChange} />
  }
]

export const PreferenceSettings = ({
  warehouseSettings
}: { warehouseSettings: Config }) => {
  const [,setWarehouseConfig] = useAtom(warehouseConfigAtom)
  const { updateConfig } = useSystemPreferences()
  const [localConfig, setLocalConfig] = useState<Config>(warehouseSettings)
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState<boolean>(true)
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false)
  const toast = useToast()

  const handleChange = (value: boolean, field: keyof Config) => {
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

  const handleSaveChanges = () => {
    setIsButtonLoading(true)
    updateConfig({
      config: localConfig
    })
    setTimeout(() => {
      setIsButtonLoading(false)
      toast({
        title: 'Cambios guardados',
        status: 'success',
        duration: 2000,
        isClosable: true,
        render: () => (
          <Box sx={{ backgroundColor: 'white', border: '2px solid', borderColor: '#3EBC59', borderRadius: 5, py: 4, px: 2, display: 'flex', alignItems: 'center' }}>
            <Icon size={24} color='#3EBC59' as={FaRegCheckCircle} />
            <Text ml={2} color='#4A4D4F' fontSize={16} fontWeight='bold'>Cambios guardados</Text>
          </Box>
        )
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
              defaultChecked={localConfig[preference.label as keyof Config].status}
              onChange={e => { handleChange(e.target.checked, preference.label as keyof Config) }}
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
