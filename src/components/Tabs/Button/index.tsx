/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Badge, Button } from '@chakra-ui/react'
import { styles } from './style'
import { type TabValue } from '..'

interface TabButtonProps {
  label: string
  value: TabValue
  counter: number
  isActive: boolean
  onClick?: () => void
}

export const TabButton = ({ label, value, counter, isActive, onClick }: TabButtonProps) => {
  const shouldShowCounterBadge = value === 'new'
  return (
    <Button
        sx={isActive ? styles.activeButton : styles.disabledButton}
        variant={isActive ? 'solid' : 'ghost'}
        borderRadius="100%"
        p={6}
        onClick={onClick}
    >
      {label}
      {shouldShowCounterBadge && (
        <Badge sx={styles.badge}>
          {counter}
        </Badge>
      )}
    </Button>
  )
}
