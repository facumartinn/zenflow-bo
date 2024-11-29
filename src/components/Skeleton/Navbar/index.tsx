/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Flex, HStack, Skeleton, VStack } from '@chakra-ui/react'
import { styles } from '../../Navbar/styles'

export const NavbarSkeleton = () => {
  return (
    <Flex style={styles.container}>
      <HStack spacing={4}>
        <Skeleton height="30px" width="30px" borderRadius="full" />
        <Skeleton height="24px" width="120px" />
      </HStack>
      <VStack align="end" spacing={1}>
        <Skeleton height="13px" width="80px" />
        <Skeleton height="16px" width="60px" />
      </VStack>
    </Flex>
  )
}
