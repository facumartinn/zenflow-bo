/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import { Grid, GridItem, useDisclosure } from '@chakra-ui/react'
import { UserRoleEnum } from '@/src/types/user'
import { useUsers } from '@/src/hooks/useUser'
import { useSystemPreferences } from '@/src/hooks/useConfig'
import { Header } from '@/src/components/Header'
import { UserList } from '@/src/components/Users/List'
import { UserModal } from '@/src/components/Modal/Users/UserModal'
import './common.css'
import { type UserCardProps } from '@/src/components/Users/Card'

const headerSubtitle = 'Podés dar de alta y de baja usuarios. También asociarlo a los dispositivos con lector.'

export default function UsersPage () {
  useSystemPreferences()
  const { isOpen: isCreateUserModalOpen, onOpen: onCreateUserModalOpen, onClose: onCreateUserModalClose } = useDisclosure()
  const { data: users } = useUsers(UserRoleEnum.PICKER)

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
            onClick={onCreateUserModalOpen}
          />
        </GridItem>
        <GridItem mt={4} mx={4} area="main" overflowY="hidden">
          <UserList users={users?.data?.data.data as UserCardProps[]} isLoading={users.isLoading} />
        </GridItem>
      </Grid>
      <UserModal
        isOpen={isCreateUserModalOpen}
        onClose={onCreateUserModalClose}
        isNewUser={true}
      />
    </main>
  )
}
