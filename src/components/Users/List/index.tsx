/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Flex, Heading, List, Select, Text } from '@chakra-ui/react'
import { UserCard, type UserCardProps } from '../Card'
import { userListStyles } from './styles'
import { SkeletonList } from '../../Skeleton/List'
import { useMemo, useState } from 'react'

export const UserList = ({ users, isLoading }: { users: UserCardProps[], isLoading: boolean }) => {
  const [sortCriteria, setSortCriteria] = useState('')

  const sortedUsers = useMemo(() => {
    if (!sortCriteria) return users

    return [...users].sort((a, b) => {
      if (sortCriteria === 'name') {
        return a.name.localeCompare(b.name)
      } else if (sortCriteria === 'role_id') {
        return a.role_id - b.role_id
      } else if (sortCriteria === 'barcode') {
        return a.barcode - b.barcode
      }
      return 0
    })
  }, [users, sortCriteria])

  return (
    <Flex direction="column" sx={{ height: '100%' }}>
      <Flex style={userListStyles.headerContainer}>
        <Heading as='h3' style={userListStyles.heading}>{sortedUsers?.length} Usuarios</Heading>
        <Flex style={userListStyles.sortContainer}>
          <Text style={userListStyles.sortText}>Ordenar por</Text>
          <Select style={userListStyles.select} onChange={(e) => { setSortCriteria(e.target.value) }}>
            <option value='name'>Nombre</option>
            <option value='barcode'>Codigo</option>
            <option value='role_id'>Rol</option>
          </Select>
        </Flex>
      </Flex>
      <List overflowY="auto" flex="1" pb={16}>
        {isLoading ? <SkeletonList /> : sortedUsers?.map((user, index) => <UserCard key={index} user={user} />)
        }
      </List>
    </Flex>
  )
}
