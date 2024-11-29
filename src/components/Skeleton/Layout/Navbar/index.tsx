import { HStack, Skeleton, VStack } from '@chakra-ui/react'

export const NavbarSkeleton = () => {
  return (
    <HStack justify="space-between" align="center" height="55px" px={4} borderBottom="1px solid" borderColor="gray.200">
      <HStack spacing={4}>
        <Skeleton height="30px" width="30px" borderRadius="full" />
        <Skeleton height="24px" width="120px" />
      </HStack>
      <VStack align="end" spacing={1}>
        <Skeleton height="13px" width="80px" />
        <Skeleton height="16px" width="60px" />
      </VStack>
    </HStack>
  )
}