import { type User } from './user'
// State Model
export interface State {
  id: number
  description: string
  createdAt?: Date | null
  updatedAt?: Date | null
  // OrderStates and Orders are relations and their types will depend on how you manage them on the frontend
}

// Product Model
export interface Product {
  id: number
  name: string
  barcode: string
  tenant_id: number
  createdAt?: Date | null
  updatedAt?: Date | null
  // Tenant is a relation and its type will depend on how you manage it on the frontend
}

// Order Model
export interface Order {
  id: number
  state_id?: number | null
  state_picking_id?: number | null
  amount?: number // Decimal type might need to be handled as string or number depending on your setup
  amountPicked?: number | null // Same for Decimal types
  user_id?: number | null
  assemblyDate?: Date | null
  assemblySchedule?: Date | null
  substitution_preference_id?: number | null
  internal_comment?: string | null
  tenant_id: number
  warehouse_id: number
  createdAt?: Date | null
  updatedAt?: Date | null
  Users: User | null
}

export enum OrderStateEnum {
  NEW = 1,
  READY_TO_PICK = 2,
  PROGRAMMED = 3,
  IN_PREPARATION = 4,
  COMPLETED = 5,
  DELETED = 6
}

// OrderDetail Model
export interface OrderDetail {
  id: number
  order_id: number
  product_id: number
  product_name: string
  product_photo?: string | null
  product_barcode: string
  quantity: number
  quantityPicked?: number | null
  order?: number | null
  tenant_id: number
  warehouse_id: number
  createdAt?: Date | null
  updatedAt?: Date | null
  // Order, Tenant, and Warehouse are relations
}

// OrderPosition Model
export interface OrderPosition {
  id: number
  order_id: number
  position: string
  type: string
  barcode: string
  tenant_id: number
  warehouse_id: number
  createdAt?: Date | null
  updatedAt?: Date | null
  // Order, Tenant, and Warehouse are relations
}

// SubstitutionPreference Model
export interface SubstitutionPreference {
  id: number
  description: string
  tenant_id: number
  createdAt?: Date | null
  updatedAt?: Date | null
  // Orders and Tenant are relations
}

// OrderState Model
export interface OrderState {
  id: number
  order_id: number
  state_id: number
  user_id: number
  creationDate: Date
  tenant_id: number
  createdAt?: Date | null
  updatedAt?: Date | null
  // Order, State, User, and Tenant are relations
}

// Tenant Model
export interface Tenant {
  id: number
  name: string
  photo?: string
  contactEmail?: string | null
  contactPhone?: string | null
  address?: string | null
  billingAddress?: string | null
  paymentMethod?: string | null
  status?: string | null
  registrationDate?: Date | null
  lastLoginDate?: Date | null
  subscriptionPlan?: string | null
  customSettings?: string | null
  apiKey?: string | null
  createdAt?: Date | null
  updatedAt?: Date | null
  // OrderDetails, OrderPositions, OrderStates, Orders, Products, Roles, SubstitutionPreferences, Users, and Warehouses are relations
}

// Warehouse Model
export interface Warehouse {
  id: number
  tenant_id: number
  name: string
  location?: string | null
  size?: number | null
  type?: string | null
  manager?: string | null
  contactInfo?: string | null
  operatingHours?: string | null
  temperatureControl?: boolean | null
  securityFeatures?: string | null
  inventoryTypes?: string | null
  facilityConditions?: string | null
  emergencyContact?: string | null
  custom_attributes?: string | null
  createdAt?: Date | null
  updatedAt?: Date | null
  // OrderDetails, OrderPositions, Orders, Users, and Tenant are relations
}

// StatesPicking Model
export interface StatesPicking {
  id: number
  description: string
  created_at?: Date | null
  updated_at?: Date | null
  // Orders is a relation
}
