/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { SettingsSection } from '@/src/components/Settings/Section'
import { EditableList } from '@/src/components/Settings/EditableList'
import { type Resources, type Shifts, type Config } from '@/src/types/warehouse'
import { Box, Divider, Flex, FormControl, FormLabel, Stack, Switch, Text } from '@chakra-ui/react'

interface PreferenceSettingsProps {
  localConfig: Config
  onChange: (value: boolean, field: keyof Config) => void
  onResourceChange: (resources: Resources[]) => void
  onShiftChange: (shifts: Shifts[]) => void
}

export const PreferenceSettings = ({
  localConfig,
  onChange,
  onResourceChange,
  onShiftChange
}: PreferenceSettingsProps): JSX.Element => {
  return (
    <SettingsSection
      title="Preferencias del Almacén"
      description="Configura las características y funcionalidades disponibles en tu almacén."
    >
      <Stack spacing={6} divider={<Divider />}>
        <FormControl display="flex" alignItems="start" justifyContent="space-between">
          <Box>
            <FormLabel htmlFor="automatic-picking" mb={0} fontWeight="medium">
              Picking Automático
            </FormLabel>
            <Text fontSize="sm" color="gray.600">
              Habilita la asignación automática de pedidos a los operarios
            </Text>
          </Box>
          <Switch
            id="automatic-picking"
            isChecked={localConfig?.automatic_picking?.status}
            onChange={(e) => { onChange(e.target.checked, 'automatic_picking') }}
            colorScheme="blue"
          />
        </FormControl>

        <FormControl display="flex" alignItems="start" justifyContent="space-between">
          <Box>
            <FormLabel htmlFor="multi-picking" mb={0} fontWeight="medium">
              Multi-Picking y Packing
            </FormLabel>
            <Text fontSize="sm" color="gray.600">
              Permite procesar múltiples pedidos simultáneamente
            </Text>
          </Box>
          <Switch
            id="multi-picking"
            isChecked={localConfig?.multi_picking_packing?.status}
            onChange={(e) => { onChange(e.target.checked, 'multi_picking_packing') }}
            colorScheme="blue"
          />
        </FormControl>

        <FormControl>
          <Box>
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
              <Box>
                <FormLabel htmlFor="use-shifts" mb={0} fontWeight="medium">
                  Turnos de Trabajo
                </FormLabel>
                <Text fontSize="sm" color="gray.600">
                  Gestiona los turnos de trabajo en el almacén
                </Text>
              </Box>
              <Switch
                id="use-shifts"
                isChecked={localConfig?.use_shifts?.status}
                onChange={(e) => { onChange(e.target.checked, 'use_shifts') }}
                colorScheme="blue"
              />
            </Flex>
            {localConfig.use_shifts.status && (
              <EditableList
                items={localConfig.use_shifts.shifts}
                onUpdate={onShiftChange}
                colorScheme="blue"
                title="Turno"
                addLabel="Agregar turno"
              />
            )}
          </Box>
        </FormControl>

        <FormControl>
          <Box>
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
              <Box>
                <FormLabel htmlFor="use-resources" mb={0} fontWeight="medium">
                  Recursos
                </FormLabel>
                <Text fontSize="sm" color="gray.600">
                  Administra los recursos disponibles en el almacén
                </Text>
              </Box>
              <Switch
                id="use-resources"
                isChecked={localConfig.use_resources.status}
                onChange={(e) => { onChange(e.target.checked, 'use_resources') }}
                colorScheme="blue"
              />
            </Flex>
            {localConfig.use_resources.status && (
              <EditableList
                items={localConfig.use_resources.resources}
                onUpdate={onResourceChange}
                colorScheme="green"
                title="Recurso"
                addLabel="Agregar recurso"
              />
            )}
          </Box>
        </FormControl>
      </Stack>
    </SettingsSection>
  )
}
