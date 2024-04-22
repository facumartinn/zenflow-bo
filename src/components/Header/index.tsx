/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { DefaultButton } from '../Button'
import { styles } from './styles'

interface HeaderProps {
  title: string
  subtitle?: string
  showButton: boolean
  buttonLabel?: string
  onClick?: () => void
}

export const Header = ({ title, subtitle, showButton, buttonLabel, onClick }: HeaderProps) => {
  return (
    <Flex sx={styles.container}>
      <Box>
        <Heading as="h1">{title}</Heading>
        {subtitle && <Text>{subtitle}</Text>}
      </Box>
        {(showButton && buttonLabel && onClick) && <DefaultButton type="secondary" label={buttonLabel ?? ''} onClick={onClick} />}
    </Flex>
  )
}
