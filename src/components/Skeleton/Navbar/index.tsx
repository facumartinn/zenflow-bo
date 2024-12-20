/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Flex, HStack, Skeleton, VStack, useColorMode } from '@chakra-ui/react'
import { styles } from '../../Navbar/styles'

export const NavbarSkeleton = () => {
  const { colorMode } = useColorMode()

  return (
    <Flex
      style={{
        ...styles.container,
        backgroundColor: colorMode === 'dark' ? 'var(--chakra-colors-darkMode-bg-secondary)' : 'white',
        borderBottomColor: colorMode === 'dark' ? 'var(--chakra-colors-darkMode-border-primary)' : '#B7B7B7'
      }}
    >
      <HStack spacing={4}>
        <Skeleton
          height="30px"
          width="30px"
          borderRadius="full"
          startColor={colorMode === 'dark' ? 'gray.700' : 'gray.50'}
          endColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
        />
        <Skeleton
          height="24px"
          width="120px"
          startColor={colorMode === 'dark' ? 'gray.700' : 'gray.50'}
          endColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
        />
      </HStack>
      <VStack align="end" spacing={1}>
        <Skeleton
          height="13px"
          width="80px"
          startColor={colorMode === 'dark' ? 'gray.700' : 'gray.50'}
          endColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
        />
        <Skeleton
          height="16px"
          width="60px"
          startColor={colorMode === 'dark' ? 'gray.700' : 'gray.50'}
          endColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
        />
      </VStack>
    </Flex>
  )
}
