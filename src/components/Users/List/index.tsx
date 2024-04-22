/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Box, Flex, Heading, Select, Text } from '@chakra-ui/react'
import { UserCard, type UserCardProps } from '../Card'

export const UserList = (users: { users: UserCardProps[] }) => {
  return (
    <>
      <Flex justify='space-between' align='center'>
        <Heading as='h2' fontSize='2xl'>{users.users.length} Usuarios</Heading>
        <Flex gap={2} align='center'>
          <Text fontSize='sm' fontWeight='bold'>Ordenar por</Text>
          <Select w="210px" placeholder='Nombre' bg='white'>
            <option value='option1'>Rol</option>
            <option value='option2'>Codigo</option>
            <option value='option3'>Nombre</option>
          </Select>
        </Flex>
      </Flex>
      <Box overflowY='scroll'>
        {users.users.map((user, index) => <UserCard key={index} user={user} />)}
      </Box>
    </>
  )
}
