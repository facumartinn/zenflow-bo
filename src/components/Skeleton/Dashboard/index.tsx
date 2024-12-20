/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'
import { Grid, Skeleton, SimpleGrid, Box, HStack, useColorMode } from '@chakra-ui/react'

export const DashboardSkeleton = () => {
  const { colorMode } = useColorMode()

  return (
    <Grid
      h="100vh"
      rowGap={4}
      templateAreas={`"title"
                      "tabs"
                      "filters"
                      "main"`}
      gridTemplateRows={'55px 142px 55px 1fr'}
      gridTemplateColumns={'1fr'}
    >
      <Box m={4} gridArea="title">
        <Skeleton
          height="40px"
          width="300px"
          borderRadius="md"
          startColor={colorMode === 'dark' ? 'gray.700' : 'gray.50'}
          endColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
        />
      </Box>
      <Box m={4} gridArea="tabs">
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 4 }} spacing={4} mb={8}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Box
              key={`stat-skeleton-${i}`}
              p={6}
              bg={colorMode === 'dark' ? 'darkMode.bg.secondary' : 'white'}
              borderRadius="lg"
              boxShadow="sm"
              borderWidth="1px"
              borderColor={colorMode === 'dark' ? 'darkMode.border.primary' : 'gray.200'}
            >
              <Skeleton
                height="14px"
                width="100px"
                mb={2}
                startColor={colorMode === 'dark' ? 'gray.700' : 'gray.50'}
                endColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
              />
              <Skeleton
                height="42px"
                width="80px"
                startColor={colorMode === 'dark' ? 'gray.700' : 'gray.50'}
                endColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
              />
            </Box>
          ))}
        </SimpleGrid>
      </Box>
      <Box m={4} gridArea="filters">
        <HStack spacing={4}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton
              key={`filter-skeleton-${i}`}
              height="54px"
              width="180px"
              borderRadius="full"
              startColor={colorMode === 'dark' ? 'gray.700' : 'gray.50'}
              endColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
            />
          ))}
        </HStack>
      </Box>
      <Box m={4} gridArea="main" overflowY="auto">
        <SimpleGrid spacing={4} pb={16}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Box
              key={`order-skeleton-${i}`}
              p={6}
              bg={colorMode === 'dark' ? 'darkMode.bg.secondary' : 'white'}
              borderRadius="lg"
              boxShadow="sm"
              borderWidth="1px"
              borderColor={colorMode === 'dark' ? 'darkMode.border.primary' : 'gray.200'}
            >
              <HStack spacing={8}>
                <Skeleton
                  height="20px"
                  width="120px"
                  startColor={colorMode === 'dark' ? 'gray.700' : 'gray.50'}
                  endColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
                />
                <Skeleton
                  height="20px"
                  width="100px"
                  startColor={colorMode === 'dark' ? 'gray.700' : 'gray.50'}
                  endColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
                />
                <Skeleton
                  height="20px"
                  width="80px"
                  startColor={colorMode === 'dark' ? 'gray.700' : 'gray.50'}
                  endColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
                />
                <Skeleton
                  height="20px"
                  width="150px"
                  startColor={colorMode === 'dark' ? 'gray.700' : 'gray.50'}
                  endColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
                />
              </HStack>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Grid>
  )
}
