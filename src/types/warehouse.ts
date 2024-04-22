export interface UseShifts {
  status: boolean
  shifts: Shifts[]
}

export interface Shifts {
  id: number
  name: string
}

export interface UseResources {
  status: boolean
  resources: Resources[]
}

export interface Resources {
  id: number
  name: string
}

interface AutomaticPicking {
  status: boolean
}

export interface Config {
  automatic_picking: AutomaticPicking
  use_shifts: UseShifts
  use_resources: UseResources
}
