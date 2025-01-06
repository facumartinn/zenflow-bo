/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'
import { Grid, GridItem, Box, Skeleton, SkeletonText } from '@chakra-ui/react'

export const DashboardSkeleton = () => {
  return (
    <Box h="100vh" px={{ base: 4, md: 8 }} py={{ base: 4, md: 6 }} mt="24px">
      <Box mb={6}>
        <Skeleton height="32px" width="150px" />
      </Box>

      <Grid
        mt={6}
        templateRows="auto 1fr"
        templateColumns="450px 1fr"
        gap={6}
        h="calc(100% - 100px)"
        overflow="scroll"
      >
        <GridItem>
          <Box bg="white" p={6} borderRadius="lg" shadow="sm" h="100%" maxH="calc(100vh - 200px)">
            <Skeleton height="24px" width="200px" mb={4} />

            <Box mb={8}>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <Box p={4} borderRadius="md" bg="gray.50">
                  <SkeletonText noOfLines={2} spacing={2} />
                </Box>
                <Box p={4} borderRadius="md" bg="gray.50">
                  <SkeletonText noOfLines={2} spacing={2} />
                </Box>
              </Grid>
            </Box>

            {[1, 2, 3].map((_, index) => (
              <Box key={index} mb={4}>
                <Skeleton height="20px" width="150px" mb={2} />
                <Skeleton height="8px" />
              </Box>
            ))}
          </Box>
        </GridItem>

        <GridItem>
          <Grid
            templateRows="repeat(2, 1fr)"
            gap={6}
            h="100%"
            maxH="calc(100vh - 200px)"
          >
            <GridItem>
              <Box bg="white" p={6} borderRadius="lg" shadow="sm" h="100%">
                <Skeleton height="24px" width="200px" mb={4} />
                <Skeleton height="200px" />
              </Box>
            </GridItem>

            <GridItem>
              <Box bg="white" p={6} borderRadius="lg" shadow="sm" h="100%">
                <Skeleton height="24px" width="200px" mb={4} />
                <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                  {[1, 2, 3].map((_, index) => (
                    <Box key={index}>
                      <SkeletonText noOfLines={3} spacing={2} />
                    </Box>
                  ))}
                </Grid>
              </Box>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </Box>
  )
}
