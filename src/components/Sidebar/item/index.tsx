/* eslint-disable @typescript-eslint/explicit-function-return-type */
import NextLink from 'next/link'
import { Link, Text } from '@chakra-ui/react'
import { styles } from '../styles'

interface SidebarItemProps {
  button: any
  index: number
  isActive: any
  onClick?: () => void
}

export const SidebarItem = ({
  button,
  index,
  isActive,
  onClick
}: SidebarItemProps) => {
  return (
    <Link key={index} as={NextLink} href={button?.link} style={isActive} onClick={onClick} _hover={styles.button.hover}>
      {button.icon}
    <Text _selected={styles.button.selected} style={styles.button.description}>
      {button.text}
    </Text>
  </Link>
  )
}
