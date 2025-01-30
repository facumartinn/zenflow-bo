/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import { Grid, GridItem, Box } from '@chakra-ui/react'
import { Header } from '@/src/components/Header'
import { TodayOrders } from '@/src/components/Dashboard/TodayOrders'
import { WeeklyOrders } from '@/src/components/Dashboard/WeeklyOrders'
import { TopProducts } from '@/src/components/Dashboard/TopProducts'
import { useDailyStats } from '@/src/hooks/useDailyStats'
import { DashboardSkeleton } from '@/src/components/Skeleton/Dashboard'

export default function Home () {
  const { todayOrders, weeklyOrders, topProducts, isLoading } = useDailyStats()

  if (isLoading) {
    return <DashboardSkeleton />
  }

  return (
    <Box h="100vh" px={{ base: 4, md: 8 }} py={{ base: 4, md: 6 }} mt="24px">
      <Header
        title='Inicio'
        showButton={false}
      />
      <Grid
        mt={6}
        templateRows="auto 1fr"
        templateColumns="450px 1fr"
        gap={6}
        h="calc(100% - 100px)"
        overflow="scroll"
      >
        <GridItem>
          <Box h="100%" maxH="calc(100vh - 200px)">
            <TodayOrders orders={todayOrders} />
          </Box>
        </GridItem>

        <GridItem>
          <Grid
            templateRows="55% 45%"
            gap={6}
            h="100%"
            maxH="calc(100vh - 230px)"
          >
            <GridItem>
              <WeeklyOrders data={weeklyOrders} />
            </GridItem>
            <GridItem>
              <TopProducts products={topProducts} />
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </Box>
  )
}
