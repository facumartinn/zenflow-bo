/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import { Grid, GridItem, useDisclosure } from '@chakra-ui/react'
import { Header } from '@/src/components/Header'
import { UserList } from '@/src/components/Users/List'
import { UserModal } from '@/src/components/Users/Modal'
import { type UserCardProps } from '@/src/components/Users/Card'
import './common.css'

const headerSubtitle = 'Podés dar de alta y de baja usuarios. También asociarlo a los dispositivos con lector'
const users: UserCardProps[] = [
  {
    id: 1,
    name: 'Martin Katz',
    code: '6841',
    role: 'Picker',
    device: '46546843549',
    pickingSpeed: 5.5,
    speedTrend: 'decreasing' // Opciones: 'increasing', 'decreasing'
  },
  {
    id: 2,
    name: 'Martin Katz',
    code: '6841',
    role: 'Picker',
    device: '46546843549',
    pickingSpeed: 5.5,
    speedTrend: 'decreasing' // Opciones: 'increasing', 'decreasing'
  },
  {
    id: 3,
    name: 'Martin Katz',
    code: '6841',
    role: 'Picker',
    device: '46546843549',
    pickingSpeed: 5.5,
    speedTrend: 'decreasing' // Opciones: 'increasing', 'decreasing'
  }
]

export default function UsersPage () {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <main className='layout'>
      <Grid
        h="100vh"
        rowGap={4}
        templateAreas={`"title"
                        "main"`}
        gridTemplateRows={'70px 1fr'}
        gridTemplateColumns={'1fr'}
      >
        <GridItem m={4} area="title">
          <Header
            title="Gestión de usuarios"
            subtitle={headerSubtitle}
            showButton={true}
            buttonLabel='NUEVO USUARIO'
            onClick={onOpen}
          />
        </GridItem>
        <GridItem mx={4} mt={8} area="main">
          <UserList users={users} />
        </GridItem>
      </Grid>
      <UserModal
        isOpen={isOpen}
        onClose={onClose}
        isNewUser={true}
      />
    </main>
  )
}
