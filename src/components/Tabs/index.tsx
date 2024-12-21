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
      value: 'pending',
      statName: 'pending'
    },
    {
      orderStateId: OrderStateEnum.IN_PREPARATION,
      label: 'En preparación',
      value: 'doing',
      statName: 'in_preparation'
    },
    {
      orderStateId: OrderStateEnum.FINISHED,
      label: 'Finalizados',
      value: 'completed',
      statName: 'finished'
    }
  ],
  ordersPage: [
    {
      orderStateId: OrderStateEnum.NEW,
      label: 'Nuevos pedidos',
      value: 'new',
      statName: 'pending'
    },
    {
      orderStateId: OrderStateEnum.READY_TO_PICK,
      label: 'Pendientes',
      value: 'pending',
      statName: 'pending'
    },
    {
      orderStateId: OrderStateEnum.FINISHED,
      label: 'Finalizados',
      value: 'completed',
      statName: 'finished'
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
  statName: string
}

interface TabButtonsProps {
  ordersLength: number
  onClick: () => Promise<void>
  urlPathName: string
}

export const TabButtons = ({ ordersLength, onClick, urlPathName }: TabButtonsProps) => {
  const [activeTab, setActiveTab] = useAtom(activeTabAtom)
  const [, setSelectedOrders] = useAtom(selectedOrdersAtom)
  const [, setFilters] = useAtom(filtersAtom)

  const handleTabSelection = async (stateId: number, value: TabValue) => {
    if (setSelectedOrders) {
      setSelectedOrders([])
    }
    setActiveTab(value)
    if (value === 'new') {
      setFilters({ stateId: [OrderStateEnum.NEW] })
    }
    if (value === 'pending') {
      setFilters({
        stateId: [
          OrderStateEnum.READY_TO_PICK,
          OrderStateEnum.SCHEDULED,
          OrderStateEnum.IN_PREPARATION
        ],
        assemblyDate: getFormattedDay()
      })
    }
    if (value === 'doing') {
      setFilters({
        stateId: [OrderStateEnum.IN_PREPARATION],
        assemblyDate: getFormattedDay()
      })
    }
    if (value === 'completed') {
      setFilters({
        stateId: [OrderStateEnum.FINISHED],
        assemblyDate: getFormattedDay()
      })
    }
    await onClick()
  }

  return (
    <HStack>
      {(tabs[urlPathName as keyof Tabs] || []).map((tab: Tab) => (
        <TabButton
          key={tab.value}
          label={tab.label}
          value={tab.value}
          counter={ordersLength}
          isActive={activeTab === tab.value}
          onClick={async () => { await handleTabSelection(tab.orderStateId, tab.value) }}
        />
      ))}
    </HStack>
  )
}
