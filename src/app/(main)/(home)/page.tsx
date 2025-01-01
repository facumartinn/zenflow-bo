/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import { Grid, GridItem, Box } from '@chakra-ui/react'
import { Header } from '@/src/components/Header'
import { TodayOrders } from '@/src/components/Dashboard/TodayOrders'
import { WeeklyOrders } from '@/src/components/Dashboard/WeeklyOrders'
import { TopProducts } from '@/src/components/Dashboard/TopProducts'

export default function Home () {
  // Estos datos deberían venir de tu API
  const mockData = {
    todayOrders: {
      pending: 40,
      completed: 16
    },
    weeklyOrders: [
      { date: '06/01', count: 20 },
      { date: '13/01', count: 35 },
      { date: '20/01', count: 50 },
      { date: '27/01', count: 35 },
      { date: '03/02', count: 18 },
      { date: '10/02', count: 30 },
      { date: '17/02', count: 40 }
    ],
    topProducts: [
      { position: 1, name: 'Aceite Cocinero Girasol 1.5L', quantity: 50, price: 1500 },
      { position: 2, name: 'Aceite Cocinero Girasol 1.5L', quantity: 50, price: 1500 },
      { position: 3, name: 'Aceite Cocinero Girasol 1.5L', quantity: 50, price: 1500 }
    ]
  }

  return (
    <Box h="100vh" p={8}>
      <Header
        title={'Inicio'}
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
            <TodayOrders orders={mockData.todayOrders} />
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
              <WeeklyOrders data={mockData.weeklyOrders} />
            </GridItem>
            <GridItem>
              <TopProducts products={mockData.topProducts} />
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </Box>
  )
}
