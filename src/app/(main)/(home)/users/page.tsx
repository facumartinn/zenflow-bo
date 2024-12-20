/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import { Grid, GridItem, useColorMode, useDisclosure } from '@chakra-ui/react'
import { UserRoleEnum } from '@/src/types/user'
import { useUsers } from '@/src/hooks/useUser'
import { useSystemPreferences } from '@/src/hooks/useConfig'
import { Header } from '@/src/components/Header'
import { UserList } from '@/src/components/Users/List'
import { UserModal } from '@/src/components/Modal/Users/UserModal'
import { type UserCardProps } from '@/src/components/Users/Card'
import { UsersSkeleton } from '@/src/components/Skeleton/Users'

const headerSubtitle = 'Podés dar de alta y de baja usuarios. También asociarlo a los dispositivos con lector.'

export default function UsersPage () {
  useSystemPreferences()
  const { isOpen: isCreateUserModalOpen, onOpen: onCreateUserModalOpen, onClose: onCreateUserModalClose } = useDisclosure()
  const { data: users, isLoading } = useUsers(UserRoleEnum.PICKER)
  const { colorMode } = useColorMode()

  if (isLoading) {
    return <UsersSkeleton />
  }

  return (
    <Grid
      h="100vh"
      rowGap={4}
      templateAreas={`"title"
                      "main"`}
      gridTemplateRows={'70px 1fr'}
      gridTemplateColumns={'1fr'}
      bg={colorMode === 'dark' ? 'darkMode.bg.primary' : 'gray.50'}
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
        <UserList users={users?.data?.data as unknown as UserCardProps[]} isLoading={isLoading} />
      </GridItem>
      <UserModal
        isOpen={isCreateUserModalOpen}
        onClose={onCreateUserModalClose}
        isNewUser={true}
        userData={users?.data?.data[0] as UserCardProps}
      />
    </Grid>
  )
}
