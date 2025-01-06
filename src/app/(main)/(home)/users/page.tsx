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

// const headerSubtitle = 'Podés dar de alta y de baja usuarios. También asociarlo a los dispositivos con lector.'

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
      px={{ base: 4, md: 8 }}
      py={{ base: 4, md: 6 }}
      gap={{ base: 4, md: 6 }}
      templateAreas={`"title"
                      "main"`}
      gridTemplateRows={'70px 1fr'}
      gridTemplateColumns={'1fr'}
      bg={colorMode === 'dark' ? 'darkMode.bg.primary' : 'gray.50'}
    >
      <GridItem mt="24px" area="title">
        <Header
          title="Pickers"
          // subtitle={headerSubtitle}
          showButton={true}
          buttonLabel='CREAR PICKER'
          onClick={onCreateUserModalOpen}
        />
      </GridItem>
      <GridItem mt={4} mx={4} area="main" overflowY="hidden">
        <UserList users={users as unknown as UserCardProps[]} isLoading={isLoading} />
      </GridItem>
      <UserModal
        isOpen={isCreateUserModalOpen}
        onClose={onCreateUserModalClose}
        isNewUser={true}
        userData={users as any}
      />
    </Grid>
  )
}
