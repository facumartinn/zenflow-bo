export interface FilterParamTypes {
  stateId?: number
  orderId?: number
  userId?: number
  shiftId?: number
  assemblyDate?: string
  startDate?: Date
  endDate?: Date
}

export interface HeaderTypes {
  Authorization?: string
  tenantId?: number
  warehouseId?: number
}
