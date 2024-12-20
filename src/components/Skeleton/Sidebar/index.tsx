/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { VStack, Skeleton, HStack, Box, useColorMode } from '@chakra-ui/react'

export const SidebarSkeleton = () => {
  const { colorMode } = useColorMode()

  return (
    <VStack
      align="stretch"
      height="100%"
      borderRight="1px solid"
      borderColor={colorMode === 'dark' ? 'darkMode.border.primary' : '#B7B7B7'}
      bg={colorMode === 'dark' ? 'darkMode.bg.secondary' : 'white'}
      justifyContent="space-between"
      py={4}
    >
      <VStack align="stretch" spacing={4}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Box key={`top-nav-${i}`} px={4}>
            <HStack
              spacing={3}
              p={2}
              borderRadius="md"
            >
              <Skeleton
                width="24px"
                height="24px"
                startColor={colorMode === 'dark' ? 'gray.700' : 'gray.50'}
                endColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
              />
              <Skeleton
                width="120px"
                height="20px"
                startColor={colorMode === 'dark' ? 'gray.700' : 'gray.50'}
                endColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
              />
            </HStack>
          </Box>
        ))}
      </VStack>

      <VStack align="stretch" spacing={4} mb={4}>
        {Array.from({ length: 2 }).map((_, i) => (
          <Box key={`bottom-nav-${i}`} px={4}>
            <HStack
              spacing={3}
              p={2}
              borderRadius="md"
            >
              <Skeleton
                width="24px"
                height="24px"
                startColor={colorMode === 'dark' ? 'gray.700' : 'gray.50'}
                endColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
              />
              <Skeleton
                width="120px"
                height="20px"
                startColor={colorMode === 'dark' ? 'gray.700' : 'gray.50'}
                endColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
              />
            </HStack>
          </Box>
        ))}
      </VStack>
    </VStack>
  )
}
