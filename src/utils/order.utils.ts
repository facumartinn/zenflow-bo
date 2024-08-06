// Importar tipos necesarios
import { type Order } from '../types/order'
import { type Config, type Shifts } from '../types/warehouse'

export const groupOrdersByShift = (orders: Order[], warehouseConfig: Config): Record<string, Order[]> => {
  // Si los turnos no están activados, retornar todos los pedidos en un grupo predeterminado
  if (!warehouseConfig.use_shifts?.status) {
    return { default: orders }
  }

  // Asegurar que haya turnos definidos antes de intentar agrupar por ellos
  if (!warehouseConfig.use_shifts?.shifts || warehouseConfig.use_shifts?.shifts.length === 0) {
    return { default: orders } // Podrías decidir manejar esto de otra manera
  }

  // Reducir los pedidos a grupos basados en el turno asignado
  const shifts = orders.reduce<Record<string, Order[]>>((acc, order) => {
    // Buscar el turno correspondiente al horario de montaje del pedido
    const shiftName = warehouseConfig.use_shifts?.shifts.find((shift: Shifts) => order.assembly_schedule === shift.id)?.name || 'Sin turno'

    // Si no hay un grupo para este turno, inicializarlo
    if (!acc[shiftName]) {
      acc[shiftName] = []
    }

    // Añadir el pedido al grupo correspondiente
    acc[shiftName].push(order)
    return acc
  }, {})

  return shifts
}

export const groupOrdersByAssignedUser = (orders: Order[]): Record<string, Order[]> => {
  // Reducir los pedidos a grupos basados en el usuario asignado
  const groupedByUser = orders.reduce<Record<string, Order[]>>((acc, order) => {
    const assignedUser = order.Users?.name || 'Sin asignar' // Asumiendo que 'Users' puede ser undefined y tiene una propiedad 'name'

    // Inicializar el grupo si aún no existe
    if (!acc[assignedUser]) {
      acc[assignedUser] = []
    }

    // Añadir el pedido al grupo correspondiente
    acc[assignedUser].push(order)
    return acc
  }, {})

  return groupedByUser
}
