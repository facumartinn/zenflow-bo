/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Flex, Heading } from '@chakra-ui/react'
import { DefaultButton } from '../Button'
import { styles } from './styles'

export const Header = ({ title, showButton, buttonLabel }: { title: string, showButton: boolean, buttonLabel?: string }) => {
  return (
    <Flex sx={styles.container}>
        <Heading as="h1" m={4}>{title}</Heading>
        {showButton && <DefaultButton type="primary" label={buttonLabel ?? ''} />}
    </Flex>
  )
}
