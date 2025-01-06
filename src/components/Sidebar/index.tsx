/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import { Flex, useColorMode, useDisclosure } from '@chakra-ui/react'
import { styles } from './styles'
import { usePathname } from 'next/navigation'
import { SidebarItem } from './item'
import { useAuthStore } from '@/src/store/authStore'
import { sideBarButtons } from './sidebarList'
import { SidebarSkeleton } from '../Skeleton/Sidebar'
import { useSystemPreferences } from '@/src/hooks/useConfig'
import { LogoutModal } from '../Modal/LogoutModal'

export const Sibebar = () => {
  const pathName = usePathname()
  const logout = useAuthStore((state) => state.logout)
  const { isLoading } = useSystemPreferences()
  const { colorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()

  if (isLoading) {
    return <SidebarSkeleton />
  }

  const isActive = (path?: string) => {
    return pathName === path ? styles.button.selected : {}
  }

  const handleLogout = () => {
    onOpen()
  }

  const confirmLogout = () => {
    logout()
    window.location.href = '/auth/sign-in'
  }

  return (
    <>
      <Flex
        flexDirection="column"
        position="relative"
        backgroundColor={colorMode === 'dark' ? 'darkMode.bg.secondary' : 'white'}
        borderRightColor={colorMode === 'dark' ? 'darkMode.border.primary' : '#B7B7B7'}
        sx={styles.container}
      >
        <Flex flexDirection="column" style={styles.buttonContainer}>
          {sideBarButtons.top.map((button, index) => (
            <SidebarItem
              key={index}
              button={button}
              index={index}
              isActive={isActive(button.link)}
            />
          ))}
        </Flex>
        <Flex flexDirection="column" style={styles.buttonContainer} mb="16px">
          {sideBarButtons.bottom.map((button, index) => (
            <SidebarItem
              key={index}
              button={button}
              index={index}
              onClick={handleLogout}
              isActive={isActive(button.link)}
            />
          ))}
        </Flex>
      </Flex>

      <LogoutModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={confirmLogout}
      />
    </>
  )
}
