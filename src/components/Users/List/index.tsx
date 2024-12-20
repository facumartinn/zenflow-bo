/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Flex, Heading, List, Select, Text, useColorMode } from '@chakra-ui/react'
import { UserCard } from '../Card'
import { userListStyles } from './styles'
import { SkeletonList } from '../../Skeleton/List'
import { useMemo, useState } from 'react'

export const UserList = ({ users = [], isLoading }: { users: any, isLoading: boolean }) => {
  const [sortCriteria, setSortCriteria] = useState('')
  const { colorMode } = useColorMode()

  const sortedUsers = useMemo(() => {
    return [...users.data].sort((a, b) => {
      if (sortCriteria === 'name') {
        return a.name.localeCompare(b.name)
      } else if (sortCriteria === 'role_id') {
        return a.role_id - b.role_id
      } else if (sortCriteria === 'barcode') {
        return (a.barcode ?? 0) - (b.barcode ?? 0)
      }
      return 0
    })
  }, [users, sortCriteria])

  return (
    <Flex direction="column" sx={{ height: '100%' }}>
      <Flex style={userListStyles.headerContainer}>
        <Heading
          as='h3'
          style={userListStyles.heading}
          color={colorMode === 'dark' ? 'darkMode.text.primary' : 'inherit'}
        >
          {sortedUsers?.length} Usuarios
        </Heading>
        <Flex style={userListStyles.sortContainer}>
          <Text
            style={userListStyles.sortText}
            color={colorMode === 'dark' ? 'darkMode.text.primary' : 'inherit'}
          >
            Ordenar por
          </Text>
          <Select
            style={userListStyles.select}
            onChange={(e) => { setSortCriteria(e.target.value) }}
            bg={colorMode === 'dark' ? 'darkMode.bg.secondary' : 'white'}
            borderColor={colorMode === 'dark' ? 'darkMode.border.primary' : 'gray.200'}
            color={colorMode === 'dark' ? 'darkMode.text.primary' : 'inherit'}
            _hover={{
              borderColor: colorMode === 'dark' ? 'darkMode.border.secondary' : 'gray.300'
            }}
          >
            <option value='name'>Nombre</option>
            <option value='barcode'>Codigo</option>
            <option value='role_id'>Rol</option>
          </Select>
        </Flex>
      </Flex>
      <List overflowY="auto" flex="1" pb={16}>
        {isLoading ? <SkeletonList /> : sortedUsers?.map((user, index) => <UserCard key={index} user={user} />)}
      </List>
    </Flex>
  )
}
