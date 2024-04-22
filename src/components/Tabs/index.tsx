/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { HStack } from '@chakra-ui/react'
import { TabButton } from './Button'

interface Tab {
  orderStateId: number
  label: string
  value: string
}
interface TabButtonsProps {
  tabs: Tab[]
  orderCounter: number
  activeTab: string
  setActiveTab: (tabValue: string) => void
  setOrderStateQuery: (stateId: number) => void
  onClick: any
}

export const TabButtons = ({ tabs, orderCounter, activeTab, setActiveTab, setOrderStateQuery, onClick }: TabButtonsProps) => {
  const handleTabSelection = (stateId: number, value: string) => {
    setActiveTab(value)
    setOrderStateQuery(stateId)
    onClick()
  }
  return (
    <HStack>
      {tabs.map((tab: Tab) => (
        <TabButton
            key={tab.orderStateId}
            label={tab.label}
            counter={orderCounter}
            isActive={activeTab === tab.value}
            onClick={() => { handleTabSelection(tab.orderStateId, tab.value) }}
        />
      ))}
    </HStack>
  )
}
