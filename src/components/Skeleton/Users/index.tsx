/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Grid, GridItem, Skeleton, HStack, VStack, Box, Flex } from '@chakra-ui/react'

export const UsersSkeleton = () => {
  return (
    <Grid
      h="100vh"
      rowGap={4}
      templateAreas={`"title"
                      "main"`}
      gridTemplateRows={'70px 1fr'}
      gridTemplateColumns={'1fr'}
    >
      <GridItem m={4} area="title">
        <Flex justifyContent="space-between" alignItems="center">
          <VStack align="start" spacing={2}>
            <Skeleton height="40px" width="300px" />
            <Skeleton height="20px" width="400px" />
          </VStack>
          <Skeleton height="43px" width="180px" borderRadius="full" />
        </Flex>
      </GridItem>

      <GridItem m={4} area="main" overflowY="hidden">
        <Flex justify="space-between" align="center" mb={4}>
          <Skeleton height="24px" width="120px" />
          <HStack spacing={2}>
            <Skeleton height="20px" width="100px" />
            <Skeleton height="40px" width="210px" borderRadius="md" />
          </HStack>
        </Flex>

        <VStack spacing={4} align="stretch">
          {Array.from({ length: 5 }).map((_, i) => (
            <Box
              key={`user-skeleton-${i}`}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              bg="white"
            >
              <Flex align="center" justify="space-between">
                <HStack spacing={6}>
                  <Skeleton borderRadius="full" boxSize="32px" />
                  <VStack align="start" spacing={2}>
                    <Skeleton height="12px" width="80px" />
                    <Skeleton height="16px" width="150px" />
                  </VStack>
                  <VStack align="start" spacing={2}>
                    <Skeleton height="12px" width="60px" />
                    <Skeleton height="16px" width="100px" />
                  </VStack>
                  <VStack align="start" spacing={2}>
                    <Skeleton height="12px" width="40px" />
                    <Skeleton height="16px" width="80px" />
                  </VStack>
                  <VStack align="start" spacing={2}>
                    <Skeleton height="12px" width="100px" />
                    <Skeleton height="16px" width="120px" />
                  </VStack>
                  <VStack align="start" spacing={2}>
                    <Skeleton height="12px" width="120px" />
                    <Skeleton height="16px" width="100px" />
                  </VStack>
                </HStack>
                <Skeleton height="20px" width="60px" />
              </Flex>
            </Box>
          ))}
        </VStack>
      </GridItem>
    </Grid>
  )
}
