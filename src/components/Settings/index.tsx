/* eslint-disable @typescript-eslint/explicit-function-return-type */
// SettingsModal.tsx
import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, Tabs, TabList, Tab, TabPanel, ModalBody, Icon, TabIndicator, TabPanels } from '@chakra-ui/react'
import { BsPersonVcard } from 'react-icons/bs'
import { PiCurrencyCircleDollar, PiQuestion } from 'react-icons/pi'
import { AccountSettings } from './Account'
import { PreferenceSettings } from './Preferences'
import { SubscriptionSettings } from './Subscription'
import { useAtom } from 'jotai'
import { warehouseConfigAtom } from '@/src/store/configAtom'
import { settingsModalStyles } from './styles' // Asegúrate que la ruta sea correcta

const SettingsModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [warehouseConfig] = useAtom(warehouseConfigAtom)

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
        <ModalOverlay />
        <ModalContent style={settingsModalStyles.modalContent}>
          <ModalHeader style={settingsModalStyles.modalHeader}>Configuración</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs variant='line' align="center">
              <TabList>
                <Tab _selected={settingsModalStyles.tab.selected}>
                  <Icon as={BsPersonVcard} size={24} mr={2} />
                  Cuenta
                </Tab>
                <Tab _selected={settingsModalStyles.tab.selected}>
                  <Icon as={PiCurrencyCircleDollar} size={24} mr={2} />
                  Suscripción
                </Tab>
                <Tab _selected={settingsModalStyles.tab.selected}>
                  <Icon as={PiQuestion} size={24} mr={2} />
                  Soporte
                </Tab>
              </TabList>
              <TabIndicator style={settingsModalStyles.tabIndicator} />

              <TabPanels>
                <TabPanel sx={settingsModalStyles.tabPanel}>
                  <AccountSettings />
                </TabPanel>
                <TabPanel sx={settingsModalStyles.systemTabPanel}>
                  <PreferenceSettings warehouseSettings={warehouseConfig} />
                </TabPanel>
                <TabPanel sx={settingsModalStyles.tabPanel}>
                  <SubscriptionSettings />
                </TabPanel>
                <TabPanel sx={settingsModalStyles.tabPanel}>
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
