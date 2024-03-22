/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import OrderList from '@/src/components/Orders/List'
import { Grid, GridItem, Heading } from '@chakra-ui/react'

export default function Home () {
  return (
    <main className='layout'>
      <Grid h="100vh"
        templateAreas={`"title"
                        "tabs"
                        "filters"
                        "main"`}
        gridTemplateRows={'55px 55px 55px 1fr'}
        gridTemplateColumns={'1fr'}>
        <GridItem area="title">
          <Heading as="h1">Pedidos</Heading>
        </GridItem>
        <GridItem area="tabs" h="100%">
          Tabs
        </GridItem>
        <GridItem area="filters" h="100%">
          Filters
        </GridItem>
        <GridItem area="main" h="100%">
          <OrderList />
        </GridItem>
      </Grid>
    </main>
  )
}
