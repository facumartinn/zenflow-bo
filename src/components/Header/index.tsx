/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { DefaultButton } from '../Button'
import { styles } from './styles'

interface HeaderProps {
  title?: string
  subtitle?: string
  showButton: boolean
  buttonLabel?: string
  buttonType?: 'primary' | 'secondary'
  onClick?: () => void
}

export const Header = ({
  title,
  subtitle,
  showButton,
  buttonLabel,
  buttonType = 'primary',
  onClick
}: HeaderProps) => {
  return (
    <Flex sx={styles.container}>
      <Box>
        <Heading as="h1" fontSize={40}>{title}</Heading>
        {subtitle && <Text sx={styles.subtitle}>{subtitle}</Text>}
      </Box>
      {(showButton && buttonLabel && onClick) && (
        <DefaultButton
          type={buttonType}
          label={buttonLabel}
          onClick={onClick}
        />
      )}
    </Flex>
  )
}
