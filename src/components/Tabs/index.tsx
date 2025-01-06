/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Tabs, TabList, Tab } from '@chakra-ui/react'
import { OrderStateEnum } from '@/src/types/order'
import { useAtom } from 'jotai'
import { activeTabAtom, filtersAtom, selectedOrdersAtom } from '@/src/store/navigationAtom'
import Colors from '@/src/theme/Colors'

const tabsConfig: TabsConfig = {
  homePage: [
    {
      orderStateId: [OrderStateEnum.READY_TO_PICK, OrderStateEnum.SCHEDULED],
      label: 'Pendientes',
      value: 'pending',
      statName: 'pending'
    },
    {
      orderStateId: [OrderStateEnum.IN_PREPARATION, OrderStateEnum.PACKING, OrderStateEnum.DELIVERING],
      label: 'En preparación',
      value: 'doing',
      statName: 'in_preparation'
    },
    {
      orderStateId: [OrderStateEnum.FINISHED, OrderStateEnum.DELETED],
      label: 'Finalizados',
      value: 'completed',
      statName: 'finished'
    }
  ],
  ordersPage: [
    {
      orderStateId: [OrderStateEnum.NEW, OrderStateEnum.READY_TO_PICK, OrderStateEnum.SCHEDULED, OrderStateEnum.IN_PREPARATION, OrderStateEnum.PACKING, OrderStateEnum.DELIVERING],
      label: 'Sin preparar',
      value: 'unprepared',
      statName: 'unprepared'
    },
    {
      orderStateId: [OrderStateEnum.FINISHED, OrderStateEnum.DELETED],
      label: 'Listos para enviar',
      value: 'ready',
      statName: 'ready'
    }
  ],
  usersPage: []
}

export type TabValue = 'unprepared' | 'in_process' | 'ready' | 'pending' | 'doing' | 'completed'
export interface TabsConfig {
  homePage: TabItem[]
  ordersPage: TabItem[]
  usersPage: []
}

interface TabItem {
  orderStateId: number[]
  label: string
  value: TabValue
  statName: string
}

interface TabButtonsProps {
  ordersLength: number
  onClick: () => Promise<void>
  urlPathName: string
}

export const TabButtons = ({ onClick, urlPathName }: TabButtonsProps) => {
  const [activeTab, setActiveTab] = useAtom(activeTabAtom)
  const [, setSelectedOrders] = useAtom(selectedOrdersAtom)
  const [, setFilters] = useAtom(filtersAtom)

  const handleTabSelection = async (stateId: number[], value: TabValue) => {
    setSelectedOrders([])
    setActiveTab(value)
    setFilters({ stateId })
    await onClick()
  }

  const currentTabs = tabsConfig[urlPathName as keyof TabsConfig] || []
  const currentTabIndex = currentTabs.findIndex(tab => tab.value === activeTab)

  return (
    <Tabs
      variant="unstyled"
      index={currentTabIndex}
      onChange={async (index) => {
        const tab = currentTabs[index]
        await handleTabSelection(tab.orderStateId, tab.value)
      }}
    >
      <TabList>
        {currentTabs.map((tab: TabItem) => (
          <Tab
            key={tab.value}
            _selected={{
              color: Colors.mainBlue,
              borderBottom: '2px solid',
              borderColor: Colors.mainBlue,
              fontWeight: '600'
            }}
            px={4}
            py={2}
          >
            {tab.label}
          </Tab>
        ))}
      </TabList>
    </Tabs>
  )
}
