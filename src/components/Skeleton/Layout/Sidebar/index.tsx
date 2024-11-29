/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { VStack, Skeleton, HStack, Box } from '@chakra-ui/react'

export const SidebarSkeleton = () => {
  return (
    <VStack
      align="stretch"
      spacing={6}
      height="100%"
      borderRight="1px solid"
      borderColor="gray.200"
      p={4}
      justify="space-between"
    >
      <VStack align="stretch" spacing={4}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Box key={`top-nav-skeleton-${i}`} px={4} py={2}>
            <HStack spacing={3}>
              <Skeleton height="24px" width="24px" />
              <Skeleton height="20px" width="120px" />
            </HStack>
          </Box>
        ))}
      </VStack>
      <VStack align="stretch" spacing={4}>
        {Array.from({ length: 2 }).map((_, i) => (
          <Box key={`bottom-nav-skeleton-${i}`} px={4} py={2}>
            <HStack spacing={3}>
              <Skeleton height="24px" width="24px" />
              <Skeleton height="20px" width="120px" />
            </HStack>
          </Box>
        ))}
      </VStack>
    </VStack>
  )
}
