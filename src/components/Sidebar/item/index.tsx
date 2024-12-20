/* eslint-disable @typescript-eslint/explicit-function-return-type */
import NextLink from 'next/link'
import { Link, Text, useColorMode } from '@chakra-ui/react'
import { styles } from '../styles'
import { cloneElement } from 'react'

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
  const { colorMode } = useColorMode()

  const icon = cloneElement(button.icon as React.ReactElement, {
    color: colorMode === 'dark' ? 'white' : 'black'
  })

  return (
    <Link
      key={index}
      as={NextLink}
      href={button?.link}
      style={{
        ...isActive,
        color: colorMode === 'dark' ? 'var(--chakra-colors-darkMode-text-primary)' : 'inherit'
      }}
      onClick={onClick}
      _hover={{
        ...styles.button.hover,
        backgroundColor: colorMode === 'dark' ? 'whiteAlpha.200' : 'rgba(160, 170, 255, 0.3)',
        color: colorMode === 'dark' ? 'white' : 'rgba(45, 65, 252, 1)'
      }}
    >
      {icon}
      <Text
        _selected={styles.button.selected}
        style={styles.button.description}
        color={colorMode === 'dark' ? 'darkMode.text.primary' : 'inherit'}
      >
        {button.text}
      </Text>
    </Link>
  )
}
