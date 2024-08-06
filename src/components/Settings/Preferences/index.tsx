/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { VStack, Divider, Text, FormControl, Flex, FormLabel, Switch } from '@chakra-ui/react'
import { type Resources, type Config, type Shifts } from '@/src/types/warehouse'
import { preferences } from './settings'

interface PreferenceSettingsProps {
  localConfig: Config
  onChange: (value: boolean, field: keyof Config) => void
  onResourceChange: (newReources: Resources[]) => void
  onShiftChange: (newShifts: Shifts[]) => void
}

export const PreferenceSettings = ({ localConfig, onChange, onResourceChange, onShiftChange }: PreferenceSettingsProps) => {
  return (
    <>
    {localConfig
      ? <VStack divider={<Divider />} spacing={2} align={'start'}>
        {JSON.stringify(localConfig)}
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
              onChange={e => {
                onChange(e.target.checked, preference.label as keyof Config)
              }}
            />
            </Flex>
            <Text textAlign='start' fontSize={14} color='#4A4D4F'>{preference.description}</Text>
            {preference.children(localConfig, preference.label === 'use_resources' ? onResourceChange : onShiftChange)}
          </FormControl>
        ))}
            </VStack>
      : null}
    </>
  )
}
