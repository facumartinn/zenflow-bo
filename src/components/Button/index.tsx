/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Button } from '@chakra-ui/react'
import { styles } from './styles'

interface DefaultButtonProps {
  type?: string
  label: string
  rightIcon?: JSX.Element
  onClick?: () => void
  isDisabled?: boolean
  isLoading?: boolean
}

export const DefaultButton = ({ type = 'primary', label, rightIcon, onClick, isDisabled, isLoading }: DefaultButtonProps) => {
  return (
    <Button
      rightIcon={rightIcon}
      style={styles[type]}
      _active={styles[type].onPress}
      _hover={styles[type].onHover}
      isDisabled={isDisabled}
      isLoading={isLoading}
      onClick={onClick}>
        {label}
    </Button>
  )
}
