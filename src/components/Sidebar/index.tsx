/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'
import { Box, Text, Flex, useDisclosure } from '@chakra-ui/react'
import { styles } from './styles'
import { LogoutSvg, ProfileSvg } from '../svg/sidebarSvg'
import { usePathname } from 'next/navigation'
import { SidebarItem } from './item'
import { signOut } from 'next-auth/react'
// import SettingsModal from '../Settings'
import { sideBarButtons } from './sidebarList'

export const Sibebar = () => {
  const { onOpen } = useDisclosure()
  const pathName = usePathname()
  const isActive = (path?: string) => {
    return pathName === path ? styles.button.selected : styles.button
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/auth/sign-in' })
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
        {/* <SidebarItem button={{
          icon: <LogoutSvg color='black' />,
          text: 'Cerrar sesión',
          link: '/logout'
        }} index={10} isActive={isActive('/logout')} onClick={handleLogout} /> */}
      </Flex>
      {/* <SettingsModal isOpen={isOpen} onClose={onClose} /> */}
    </Flex>
  )
}
