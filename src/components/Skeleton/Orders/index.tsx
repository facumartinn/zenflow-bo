/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Grid, GridItem, Skeleton, HStack, VStack, Box, Flex } from '@chakra-ui/react'

export const OrdersSkeleton = () => {
  return (
    <Grid
      h="100vh"
      rowGap={4}
      templateAreas={`"title"
                      "tabs"
                      "filters"
                      "expiredOrders"
                      "main"`}
      gridTemplateRows={'70px 55px 95px auto 1fr'}
      gridTemplateColumns={'1fr'}
    >
      <GridItem m={4} area="title">
        <Flex justifyContent="space-between" alignItems="center">
          <Skeleton height="40px" width="200px" />
        </Flex>
      </GridItem>

      <GridItem m={4} area="tabs">
        <HStack spacing={4}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton
              key={`tab-skeleton-${i}`}
              height="54px"
              width="180px"
              borderRadius="full"
            />
          ))}
        </HStack>
      </GridItem>

      <GridItem m={4} area="filters">
        <VStack align="stretch" spacing={4}>
          <HStack justify="space-between">
            <Skeleton height="40px" width="45%" borderRadius="md" />
            <Skeleton height="40px" width="35%" borderRadius="full" />
          </HStack>
          <Skeleton height="20px" width="200px" />
        </VStack>
      </GridItem>

      <GridItem m={4} area="expiredOrders">
        <Skeleton height="70px" borderRadius="md" />
      </GridItem>

      <GridItem m={4} area="main" overflowY="auto">
        <VStack spacing={4} align="stretch">
          {Array.from({ length: 5 }).map((_, i) => (
            <Box
              key={`order-skeleton-${i}`}
              p={6}
              borderWidth="1px"
              borderRadius="lg"
              bg="white"
            >
              <HStack spacing={8}>
                <Skeleton height="20px" width="20px" />
                <VStack align="start" spacing={2}>
                  <Skeleton height="12px" width="80px" />
                  <Skeleton height="16px" width="120px" />
                </VStack>
                <VStack align="start" spacing={2}>
                  <Skeleton height="12px" width="80px" />
                  <Skeleton height="16px" width="120px" />
                </VStack>
                <VStack align="start" spacing={2}>
                  <Skeleton height="12px" width="80px" />
                  <Skeleton height="16px" width="60px" />
                </VStack>
                <Skeleton height="30px" width="120px" borderRadius="full" />
              </HStack>
            </Box>
          ))}
        </VStack>
      </GridItem>
    </Grid>
  )
}