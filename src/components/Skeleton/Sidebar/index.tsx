/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { VStack, Skeleton, HStack, Box } from '@chakra-ui/react'

export const SidebarSkeleton = () => {
  return (
    <VStack
      align="stretch"
      height="100%"
      borderRight="1px solid"
      borderColor="#B7B7B7"
      justifyContent="space-between"
      py={4}
    >
      {/* Top navigation items */}
      <VStack align="stretch" spacing={4}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Box key={`top-nav-${i}`} px={4}>
            <HStack
              spacing={3}
              p={2}
              borderRadius="md"
            >
              <Skeleton width="24px" height="24px" />
              <Skeleton width="120px" height="20px" />
            </HStack>
          </Box>
        ))}
      </VStack>

      {/* Bottom navigation items */}
      <VStack align="stretch" spacing={4} mb={4}>
        {Array.from({ length: 2 }).map((_, i) => (
          <Box key={`bottom-nav-${i}`} px={4}>
            <HStack
              spacing={3}
              p={2}
              borderRadius="md"
            >
              <Skeleton width="24px" height="24px" />
              <Skeleton width="120px" height="20px" />
            </HStack>
          </Box>
        ))}
      </VStack>
    </VStack>
  )
}
