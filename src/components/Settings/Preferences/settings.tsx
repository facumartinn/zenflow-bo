import { type Config } from '@/src/types/warehouse'
import { ShiftsList } from './Shifts'
import { ResourcesList } from './Resources'

interface PreferenceProps {
  title: string
  label: string
  description: string
  isChecked: (config: Config, handleShiftsChange: () => void) => boolean
  children: (config: Config, handleResourcesChange: (str: any) => void) => React.ReactNode
}

export const preferences: PreferenceProps[] = [
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
