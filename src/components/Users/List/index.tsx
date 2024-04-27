/* eslint-disable @typescript-eslint/explicit-function-return-type */
// UserList.tsx
import { Box, Flex, Heading, Select, Text } from '@chakra-ui/react'
import { UserCard, type UserCardProps } from '../Card'
import { userListStyles } from './styles'

export const UserList = ({ users }: { users: UserCardProps[] }) => {
  return (
    <>
      <Flex style={userListStyles.headerContainer}>
        <Heading as='h2' style={userListStyles.heading}>{users.length} Usuarios</Heading>
        <Flex style={userListStyles.sortContainer}>
          <Text style={userListStyles.sortText}>Ordenar por</Text>
          <Select style={userListStyles.select} placeholder='Nombre'>
            <option value='option1'>Rol</option>
            <option value='option2'>Codigo</option>
            <option value='option3'>Nombre</option>
          </Select>
        </Flex>
      </Flex>
      <Box overflowY='scroll'>
        {users.map((user, index) => <UserCard key={index} user={user} />)}
      </Box>
    </>
  )
}
