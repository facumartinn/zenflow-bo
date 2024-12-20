/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import { Box, Text, Flex, useDisclosure, useColorMode } from '@chakra-ui/react'
import { styles } from './styles'
import { LogoutSvg, ProfileSvg } from '../svg/sidebarSvg'
import { usePathname } from 'next/navigation'
import { SidebarItem } from './item'
import { useAuthStore } from '@/src/store/authStore'
import { sideBarButtons } from './sidebarList'
import { SidebarSkeleton } from '../Skeleton/Sidebar'
import { useSystemPreferences } from '@/src/hooks/useConfig'

export const Sibebar = () => {
  const { onOpen } = useDisclosure()
  const pathName = usePathname()
  const logout = useAuthStore((state) => state.logout)
  const { isLoading } = useSystemPreferences()
  const { colorMode } = useColorMode()

  if (isLoading) {
    return <SidebarSkeleton />
  }

  const isActive = (path?: string) => {
    return pathName === path ? styles.button.selected : styles.button
  }

  const handleLogout = () => {
    logout()
    window.location.href = '/auth/sign-in'
  }

  return (
    <Flex
      flexDirection="column"
      style={{
        ...styles.container,
        backgroundColor: colorMode === 'dark' ? 'var(--chakra-colors-darkMode-bg-secondary)' : 'white',
        borderRightColor: colorMode === 'dark' ? 'var(--chakra-colors-darkMode-border-primary)' : '#B7B7B7'
      }}
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
        <Box
          style={isActive('/profile')}
          onClick={onOpen}
          _hover={styles.button.hover}
        >
          <ProfileSvg color={colorMode === 'dark' ? 'white' : 'black'} />
          <Text
            _selected={colorMode === 'dark' ? styles.button.darkSelected : styles.button.selected}
            style={styles.button.description}
            color={colorMode === 'dark' ? 'darkMode.text.primary' : 'inherit'}
          >
            Perfil
          </Text>
        </Box>
        {sideBarButtons.bottom.map((button, index) => (
          <SidebarItem
            key={index}
            button={button}
            index={index}
            isActive={isActive(button?.link)}
          />
        ))}
        <Box
          style={styles.button}
          onClick={handleLogout}
          _hover={styles.button.hover}
          cursor="pointer"
        >
          <LogoutSvg color={colorMode === 'dark' ? 'white' : 'black'} />
          <Text
            style={styles.button.description}
            color={colorMode === 'dark' ? 'darkMode.text.primary' : 'inherit'}
          >
            Cerrar sesión
          </Text>
        </Box>
      </Flex>
    </Flex>
  )
}
