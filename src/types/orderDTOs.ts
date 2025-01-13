// Interfaces para las respuestas de la API

// GET /orders/daily-stats
export interface DailyStatsResponseDTO {
  data: {
    total_pending: number
    total_finished: number
    schedule_stats: Array<{
      schedule: number
      pending_count: number
      finished_count: number
    }>
    weekly_stats: Array<{
      week_start: string
      total_orders: number
    }>
    top_products: Array<{
      product_id: number
      product_name: string
      total_quantity: number
    }>
  }
}

// GET /orders/order-stats
export interface OrderStatsResponseDTO {
  data: {
    data: Array<{
      name: 'pending' | 'in_preparation' | 'finished' | 'active_pickers' | 'expired_orders'
      count: number
      orders?: Array<{
        id: number
        assembly_date: string
        assembly_schedule: number | null
        state_id: number
      }>
    }>
  }
}

// GET /orders/filtered
export interface FilterParamsDTO {
  state_id?: number
  warehouse_id?: number
  date?: string
  schedule?: number
}

export interface FilteredOrderResponseDTO {
  data: {
    data: Array<{
      id: number
      state_id: number
      assembly_date: string | null
      assembly_schedule: number | null
      total_products: number | null
      Users: {
        name: string
      } | null
    }>
  }
}

// POST /orders/update-status/:stateId
export interface UpdateOrderStatusRequestDTO {
  orders: number[] // IDs de las órdenes a actualizar
  stateId: number // Nuevo estado (OrderStateEnum)
}

export interface UpdateOrderStatusResponseDTO {
  data: {
    success: boolean
    message: string
    orders: Array<{
      id: number
      state_id: number
      state_picking_id?: number | null // Necesario para mostrar estado "Incompleto"
      assembly_date: string | null
      assembly_schedule: number | null
      Users: {
        name: string
      } | null
    }>
  }
}

// PUT /orders/assign
export interface AssignOrdersRequestDTO {
  orders: Array<{
    id: number
    user_id?: number | null
    assembly_date?: string
    assembly_schedule?: number
  }>
  newStateId?: number // Solo se usa en MountOrdersModal
}

// PUT /orders/assign Response
export interface AssignOrdersResponseDTO {
  data: {
    success: boolean
    message: string
    orders: Array<{
      id: number
      state_id: number
      user_id: number | null
      assembly_date: string | null
      assembly_schedule: number | null
    }>
  }
}

// DELETE /orders/delete
export interface DeleteOrdersRequestDTO {
  orderIds: number[]
}

// GET /order-details/:orderId
export interface OrderDetailResponseDTO {
  data: {
    data: {
      details: Array<{
        id: number
        quantity: number
        product: {
          name: string
          barcode: string
        }
      }>
      order: {
        id: number
        state_id: number
        assembly_date: string
        assembly_schedule: number
        Users: {
          name: string
        } | null
      }
      total_products: number
    }
  }
}
