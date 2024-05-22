/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { HStack } from '@chakra-ui/react'
import { TabButton } from './Button'
import { getFormattedDay } from '@/src/utils/queryParams'
import { OrderStateEnum } from '@/src/types/order'
import { useAtom } from 'jotai'
import { activeTabAtom, filtersAtom, selectedOrdersAtom } from '@/src/store/navigationAtom'

const tabs: Tabs = {
  homePage: [
    {
      orderStateId: OrderStateEnum.READY_TO_PICK,
      label: 'Pendientes',
      value: 'pending'
    },
    {
      orderStateId: OrderStateEnum.IN_PREPARATION,
      label: 'En preparación',
      value: 'doing'
    },
    {
      orderStateId: OrderStateEnum.COMPLETED,
      label: 'Finalizados',
      value: 'completed'
    }
  ],
  ordersPage: [
    {
      orderStateId: OrderStateEnum.NEW,
      label: 'Nuevos pedidos',
      value: 'new'
    },
    {
      orderStateId: OrderStateEnum.READY_TO_PICK,
      label: 'Pendientes',
      value: 'pending'
    },
    {
      orderStateId: OrderStateEnum.COMPLETED,
      label: 'Finalizados',
      value: 'completed'
    }
  ],
  usersPage: []
}

export type TabValue = 'new' | 'pending' | 'doing' | 'completed'
export interface Tabs {
  homePage: Tab[]
  ordersPage: Tab[]
  usersPage: []
}

interface Tab {
  orderStateId: number
  label: string
  value: TabValue
}

interface TabButtonsProps {
  orderCounter: number
  onClick: any
  urlPathName: string
}

export const TabButtons = ({ orderCounter, onClick, urlPathName }: TabButtonsProps) => {
  const [activeTab, setActiveTab] = useAtom(activeTabAtom)
  const [, setSelectedOrders] = useAtom(selectedOrdersAtom)
  const [, setFilters] = useAtom(filtersAtom)

  const handleTabSelection = (stateId: number, value: TabValue) => {
    if (setSelectedOrders) {
      setSelectedOrders([])
    }
    setActiveTab(value)
    if (value === 'new') {
      setFilters({ stateId: [stateId] })
    }
    if (value === 'pending') {
      setFilters({ stateId: [OrderStateEnum.READY_TO_PICK, OrderStateEnum.PROGRAMMED, OrderStateEnum.IN_PREPARATION], assemblyDate: getFormattedDay() })
    }
    if (value === 'doing') {
      setFilters({ stateId: [OrderStateEnum.IN_PREPARATION], assemblyDate: getFormattedDay() })
    }
    if (value === 'completed') {
      setFilters({ stateId: [stateId], assemblyDate: getFormattedDay() })
    }
    onClick()
  }
  return (
    <HStack>
      {(tabs[urlPathName as keyof Tabs] || []).map((tab: Tab) => (
        <TabButton
            key={tab.orderStateId}
            label={tab.label}
            value={tab.value}
            counter={orderCounter}
            isActive={activeTab === tab.value}
            onClick={() => { handleTabSelection(tab.orderStateId, tab.value) }}
        />
      ))}
    </HStack>
  )
}
