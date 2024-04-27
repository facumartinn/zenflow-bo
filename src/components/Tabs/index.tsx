/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { HStack } from '@chakra-ui/react'
import { TabButton } from './Button'
import { type FilterParamTypes } from '@/src/types'
import { getFormattedDay } from '@/src/utils/queryParams'

export type TabValue = 'new' | 'pending' | 'doing' | 'completed'
export interface Tab {
  orderStateId: number
  label: string
  value: TabValue
}
interface TabButtonsProps {
  tabs: Tab[]
  orderCounter: number
  activeTab: TabValue
  setActiveTab: (tabValue: TabValue) => void
  setSelectedOrders?: (orders: number[]) => void
  setFilters: (filters: FilterParamTypes) => void
  onClick: any
}

export const TabButtons = ({ tabs, orderCounter, activeTab, setActiveTab, setSelectedOrders, setFilters, onClick }: TabButtonsProps) => {
  const handleTabSelection = (stateId: number, value: TabValue) => {
    if (setSelectedOrders) {
      setSelectedOrders([])
    }
    setActiveTab(value)
    if (value === 'new') {
      setFilters({ stateId })
    }
    if (value === 'pending') {
      console.log('hola')
      setFilters({ stateId, assemblyDate: getFormattedDay() })
    }
    if (value === 'completed') {
      setFilters({ stateId, assemblyDate: getFormattedDay() })
    }
    onClick()
  }
  return (
    <HStack>
      {tabs.map((tab: Tab) => (
        <TabButton
            key={tab.orderStateId}
            label={tab.label}
            value={tab.value}
            activeTab={activeTab}
            counter={orderCounter}
            isActive={activeTab === tab.value}
            onClick={() => { handleTabSelection(tab.orderStateId, tab.value) }}
        />
      ))}
    </HStack>
  )
}
