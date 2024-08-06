import { type Config } from '@/src/types/warehouse'
import { ShiftsList } from './Shifts'
import { ResourcesList } from './Resources'
import { MultiPickingPacking } from './MultiPickingPacking'

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
    title: 'Cajones para pedidos multiples',
    label: 'multi_picking_packing',
    description: 'La asignación de cajones reduce el riesgo de pedidos mal armados. Valida el cajón en cada producto colocado.',
    isChecked: (config: Config) => config.multi_picking_packing.status,
    children: () => <MultiPickingPacking />
  },
  {
    title: 'Uso de turnos',
    label: 'use_shifts',
    description: 'Encienda esta opción para dividir los dias por turnos.',
    isChecked: (config: Config) => config.use_shifts?.status,
    children: (config: Config, handleShiftChange: any) => <ShiftsList shiftsConfig={config.use_shifts} onShiftsChange={handleShiftChange} />
  },
  {
    title: 'Gestión de empaquetado',
    label: 'use_resources',
    description: 'Los empaques son aquellos elementos como bolsas, cajas o bultos que ayudan a identificar el pedido con un único código.',
    isChecked: (config: Config) => config.use_resources?.status,
    children: (config: Config, handleResourcesChange: any) => <ResourcesList resourcesConfig={config.use_resources} onResourcesChange={handleResourcesChange} />
  }
]
