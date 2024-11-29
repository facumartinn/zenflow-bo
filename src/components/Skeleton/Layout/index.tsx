/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Grid, GridItem } from '@chakra-ui/react'
import { DashboardSkeleton } from '../Dashboard'
import { NavbarSkeleton } from './Navbar'
import { SidebarSkeleton } from './Sidebar'

export const LayoutSkeleton = () => {
  return (
    <Grid
      h="100vh"
      templateAreas={`"navbar navbar"
                      "sidebar main"
                      "sidebar main"`}
      gridTemplateRows={'55px 1fr 1fr'}
      gridTemplateColumns={'240px 1fr'}>
      <GridItem area="navbar" bg="white">
        <NavbarSkeleton />
      </GridItem>
      <GridItem area="sidebar" bg="white">
        <SidebarSkeleton />
      </GridItem>
      <GridItem area="main" bg="gray.50">
        <DashboardSkeleton />
      </GridItem>
    </Grid>
  )
}
