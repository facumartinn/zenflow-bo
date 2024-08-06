// Role Model
export interface Role {
  id: number
  description: string
  tenant_id: number
  createdAt?: Date | null
  updatedAt?: Date | null
  // Tenant and Users are relations and their types will depend on how you manage them on the frontend
}

// User Model
export interface User {
  id: number
  role_id: number
  name: string
  user_email: string
  barcode: number
  password: string
  tenant_id: number
  warehouse_id: number
  createdAt?: Date | null
  updatedAt?: Date | null
  // OrderStates, Orders, Role, Tenant, and Warehouse are relations and their types will depend on how you manage them on the frontend
}

export const USER_ROLES = [
  { id: 1, description: 'Admin' },
  { id: 2, description: 'Picker' }
]

export enum UserRoleEnum {
  AMDIN = 1,
  PICKER = 2,
}
