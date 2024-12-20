/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { VStack, Box, Skeleton, HStack, useColorMode } from '@chakra-ui/react'

export const OrderListSkeleton = () => {
  const { colorMode } = useColorMode()

  return (
    <VStack spacing={4} align="stretch">
      {Array.from({ length: 5 }).map((_, i) => (
        <Box
          key={`order-list-skeleton-${i}`}
          p={6}
          borderWidth="1px"
          borderRadius="lg"
          bg={colorMode === 'dark' ? 'darkMode.bg.secondary' : 'white'}
          borderColor={colorMode === 'dark' ? 'darkMode.border.primary' : 'gray.200'}
        >
          <HStack spacing={8}>
            <Skeleton
              height="20px"
              width="20px"
              startColor={colorMode === 'dark' ? 'gray.700' : 'gray.50'}
              endColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
            />
            <VStack align="start" spacing={2}>
              <Skeleton
                height="12px"
                width="80px"
                startColor={colorMode === 'dark' ? 'gray.700' : 'gray.50'}
                endColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
              />
              <Skeleton
                height="16px"
                width="120px"
                startColor={colorMode === 'dark' ? 'gray.700' : 'gray.50'}
                endColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
              />
            </VStack>
            <VStack align="start" spacing={2}>
              <Skeleton
                height="12px"
                width="80px"
                startColor={colorMode === 'dark' ? 'gray.700' : 'gray.50'}
                endColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
              />
              <Skeleton
                height="16px"
                width="120px"
                startColor={colorMode === 'dark' ? 'gray.700' : 'gray.50'}
                endColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
              />
            </VStack>
            <VStack align="start" spacing={2}>
              <Skeleton
                height="12px"
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
            <Skeleton
              height="30px"
              width="120px"
              borderRadius="full"
              startColor={colorMode === 'dark' ? 'gray.700' : 'gray.50'}
              endColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
            />
          </HStack>
        </Box>
      ))}
    </VStack>
  )
}
