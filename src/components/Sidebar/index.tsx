/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'
import { Box, Text, Flex, useDisclosure } from '@chakra-ui/react'
import { styles } from './styles'
import { ConfigurationSvg, DashboardSvg, LogoutSvg, OrdersSvg, UsersSvg } from '../svg/sidebarSvg'
import { usePathname } from 'next/navigation'
import { SidebarItem } from './item'
import { signOut } from 'next-auth/react'
import SettingsModal from '../Settings'

interface SideBarButtonProps {
  top: Array<
  {
    icon: any
    text: string
    link: string
    action?: () => void
  }>
  bottom: Array<
  {
    icon: any
    text: string
    link?: string
    action?: () => void
  }>
}

const sideBarButtons: SideBarButtonProps = {
  top: [
    {
      icon: <DashboardSvg color='black' />,
      text: 'Dashboard',
      link: '/'
    },
    {
      icon: <OrdersSvg color='black' />,
      text: 'Pedidos',
      link: '/orders'
    },
    {
      icon: <UsersSvg color='black' />,
      text: 'Usuarios',
      link: '/users'
    }
  ],
  bottom: [
    {
      icon: <ConfigurationSvg color='black' />,
      text: 'Configuración'
    }
  ]
}

export const Sibebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const pathName = usePathname()
  const isActive = (path: string) => {
    return pathName === path ? styles.button.selected : styles.button
  }

  const handleLogout = async () => {
    await signOut()
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
        <Box style={isActive('/config')} onClick={onOpen} _hover={styles.button.hover}>
          <ConfigurationSvg color='black' />
          <Text _selected={styles.button.selected} style={styles.button.description}>
            Configuración
          </Text>
        </Box>
        <SidebarItem button={{
          icon: <LogoutSvg color='black' />,
          text: 'Cerrar sesión',
          link: '/logout'
        }} index={10} isActive={isActive('/logout')} onClick={handleLogout} />
      </Flex>
      <SettingsModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  )
}
