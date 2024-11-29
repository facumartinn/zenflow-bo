/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'
import { Box, Text, Flex, useDisclosure } from '@chakra-ui/react'
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
    <Flex flexDirection="column" style={styles.container}>
      <Flex flexDirection="column" style={styles.buttonContainer}>
        {sideBarButtons.top.map((button, index) => (
          <SidebarItem key={index} button={button} index={index} isActive={isActive(button.link)} />
        ))}
      </Flex>
      <Flex flexDirection="column" style={styles.buttonContainer} mb="16px">
        <Box style={isActive('/profile')} onClick={onOpen} _hover={styles.button.hover}>
          <ProfileSvg color='black' />
          <Text _selected={styles.button.selected} style={styles.button.description}>
            Perfil
          </Text>
        </Box>
        {sideBarButtons.bottom.map((button, index) => (
          <SidebarItem key={index} button={button} index={index} isActive={isActive(button?.link)} />
        ))}
        <Box
          style={styles.button}
          onClick={handleLogout}
          _hover={styles.button.hover}
          cursor="pointer"
        >
          <LogoutSvg color='black' />
          <Text style={styles.button.description}>
            Cerrar sesión
          </Text>
        </Box>
      </Flex>
    </Flex>
  )
}
