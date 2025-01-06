/* eslint-disable @typescript-eslint/explicit-function-return-type */
import NextLink from 'next/link'
import { Link, Text } from '@chakra-ui/react'
import { cloneElement } from 'react'
import Colors from '@/src/theme/Colors'

interface SidebarItemProps {
  button: {
    icon: React.ReactElement
    text: string
    link?: string
    action?: () => void
  }
  index: number
  isActive: Record<string, unknown>
  onClick?: () => void
}

export const SidebarItem = ({
  button,
  index,
  isActive,
  onClick
}: SidebarItemProps) => {
  const isActiveStyle = Object.keys(isActive).length > 0

  const icon = cloneElement(button.icon, {
    color: isActiveStyle ? Colors.mainBlue : 'black'
  })

  return (
    <Link
      key={index}
      as={NextLink}
      href={button?.link}
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: '16px 8px 0px 8px',
        padding: '8px 16px',
        fontWeight: '400',
        color: isActiveStyle ? Colors.mainBlue : 'black',
        ...(isActiveStyle && {
          backgroundColor: Colors.mainLightBlue3,
          borderRadius: '8px',
          fontWeight: 'bold'
        })
      }}
      onClick={onClick}
      _hover={{
        backgroundColor: Colors.mainLightBlue3,
        color: Colors.mainBlue,
        borderRadius: '8px',
        fontWeight: 'bold'
      }}
    >
      {icon}
      <Text
        style={{
          marginLeft: '8px',
          color: 'inherit'
        }}
      >
        {button.text}
      </Text>
    </Link>
  )
}
