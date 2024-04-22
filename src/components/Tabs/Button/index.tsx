/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Badge, Button } from '@chakra-ui/react'
import { styles } from './style'

interface TabButtonProps {
  label: string
  counter: number
  isActive: boolean
  onClick?: () => void
}

export const TabButton = ({ label, counter, isActive, onClick }: TabButtonProps) => {
  return (
    <Button
        sx={isActive ? styles.activeButton : styles.disabledButton}
        variant={isActive ? 'solid' : 'ghost'}
        borderRadius="100%"
        p={6}
        onClick={onClick}
    >
      {label}
      {isActive && counter > 0 && (
        <Badge sx={styles.badge}>
          {counter}
        </Badge>
      )}
    </Button>
  )
}
