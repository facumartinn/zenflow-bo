/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Badge, Button, useColorModeValue } from '@chakra-ui/react'
import { styles } from './style'
import { type TabValue } from '..'

interface TabButtonProps {
  label: string
  value: TabValue
  counter: number
  isActive: boolean
  onClick?: () => void
}

export const TabButton = ({
  label,
  value,
  counter,
  isActive,
  onClick
}: TabButtonProps) => {
  const shouldShowCounterBadge = isActive && (value === 'completed' || value === 'pending')
  const buttonStyle = useColorModeValue(styles.activeButton, styles.darkActiveButton)
  const badgeStyle = useColorModeValue(styles.badge, styles.darkBadge)
  return (
    <Button
      sx={isActive ? buttonStyle : styles.disabledButton}
      variant={isActive ? 'solid' : 'ghost'}
      borderRadius="100%"
      p={6}
      onClick={onClick}
    >
      {label}
      {shouldShowCounterBadge && (
        <Badge sx={badgeStyle}>
          {counter}
        </Badge>
      )}
    </Button>
  )
}
