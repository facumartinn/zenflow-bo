/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import { Header } from '@/src/components/Header'
import OrderList from '@/src/components/Orders/List'
import useFilteredOrders from '@/src/hooks/useFilteredOrders'
import { Grid, GridItem } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

export default function OrdersPage () {
  const session = useSession()
  const [filterParams] = useState({}) // Usando Jotai para estado global o useState para local
  let headers = {}

  if (session) {
    headers = {
      Authorization: session.data?.accessToken, // Inicialmente vacío, se establecerá con el token de sesión
      tenantId: session.data?.user.tenant_id, // Valor inicial, se actualizará con los datos de sesión
      warehouseId: session.data?.user.warehouse_id // Valor inicial, se actualizará con los datos de sesión
    }
  }

  // Petición inicial y reactiva a la API basada en los filtros aplicados
  const orders = useFilteredOrders(filterParams, headers)

  // Función para manejar la actualización de los filtros
  // const handleFilterChange = (newFilters) => {
  //   setFilterParams(newFilters)
  // }

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
          <Header title="Pedidos" showButton={false} />
        </GridItem>
        <GridItem area="tabs" h="100%">
        </GridItem>
        <GridItem area="filters" h="100%">
        </GridItem>
        <GridItem area="main" h="100%">
          <OrderList orders={orders} />
        </GridItem>
      </Grid>
    </main>
  )
}
