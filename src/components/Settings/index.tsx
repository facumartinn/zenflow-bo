/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  ModalBody,
  Icon,
  TabIndicator
} from '@chakra-ui/react'
import { BsPersonVcard } from 'react-icons/bs'
import { VscSettings } from 'react-icons/vsc'
import { PiCurrencyCircleDollar, PiQuestion } from 'react-icons/pi'
import { AccountSettings } from './Account'
import { PreferenceSettings } from './Preferences'
import { warehouseConfigAtom } from '@/src/store/configAtom'
import { useAtom } from 'jotai'
import { SubscriptionSettings } from './Subscription'

const SettingsModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [warehouseConfig] = useAtom(warehouseConfigAtom)

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
        <ModalOverlay />
        <ModalContent h='600px' w='650px'>
          <ModalHeader fontSize={32}>Configuración</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs variant='line' align="center">
              <TabList>
                <Tab _selected={{ color: '#2D41FC', fontWeight: 'bold', borderColor: '#2D41FC' }}>
                  <Icon as={BsPersonVcard} size={24} mr={2} />
                  Cuenta
                </Tab>
                <Tab _selected={{ color: '#2D41FC', fontWeight: 'bold', borderColor: '#2D41FC' }}>
                  <Icon as={VscSettings} size={24} mr={2} />
                  Sistema
                </Tab>
                <Tab _selected={{ color: '#2D41FC', fontWeight: 'bold', borderColor: '#2D41FC' }}>
                  <Icon as={PiCurrencyCircleDollar} size={24} mr={2} />
                  Suscripción
                </Tab>
                <Tab _selected={{ color: '#2D41FC', fontWeight: 'bold', borderColor: '#2D41FC' }}>
                  <Icon as={PiQuestion} size={24} mr={2} />
                  Soporte
                </Tab>
              </TabList>
              <TabIndicator mt='-1.5px' height='2px' bg='#2D41FC' borderRadius='1px' />

              <TabPanels>
                <TabPanel overflowY='auto'>
                  <AccountSettings />
                </TabPanel>
                <TabPanel h='450px' overflow='scroll'>
                  <PreferenceSettings warehouseSettings={warehouseConfig} />
                </TabPanel>
                <TabPanel overflowY='scroll'>
                  <SubscriptionSettings />
                </TabPanel>
                <TabPanel overflowY='scroll'>
                  {/* Soporte settings */}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default SettingsModal
