/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { fetchUsersByRole } from '../../services/user/userService'
import { useQuery } from 'react-query'

export const useUsersByRole = (roleId: number) => {
  const users = useQuery(['roles', roleId], async () => await fetchUsersByRole(roleId), {
    refetchOnWindowFocus: false
  })
  return users
}
