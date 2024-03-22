/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Box, Flex, Heading, Image } from '@chakra-ui/react'
import { styles } from './styles'

export const NavBar = () => {
  return (
        <Flex style={styles.container}>
          <Box style={styles.clientLogo.container}>
            <Image src={'/static/unilever.png'} alt="Client Logo" height='30' width='30' />
            <Heading as='h1' style={styles.clientLogo.title}>Unilever</Heading>
          </Box>
          <Box>
            <Heading as='h3' style={styles.poweredBy.h3}>Powered by</Heading>
            <Heading as='h2' style={styles.poweredBy.h2}>ZenFlow</Heading>
          </Box>
        </Flex>
  )
}
