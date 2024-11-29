/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ToastMessage } from '@/src/components/Toast'
import { createUser, fetchUsersByRole, updateUser } from '../services/userService'
import { useMutation, useQuery, type UseQueryResult } from '@tanstack/react-query'
import { useToast } from '@chakra-ui/react'
import { type AxiosResponse } from 'axios'

interface UsersHookReturn {
  data: UseQueryResult<AxiosResponse<any, any>, Error>
  editUser: (params: { userId: number, data: any }) => void
  isUpdateSuccess: boolean
  newUser: (data: any) => void
  isNewUserSuccess: boolean
  isLoading: boolean
}

export const useUsers = (roleId: number): UsersHookReturn => {
  const toast = useToast()
  const users = useQuery({
    queryKey: ['roles', roleId],
    queryFn: async () => await fetchUsersByRole(roleId),
    refetchOnWindowFocus: false
  })

  const { mutate: editUser, isSuccess: isUpdateSuccess } = useMutation(
    {
      mutationFn: async (params: { userId: number, data: any }) => {
        await updateUser(params.userId, params.data)
      },
      onSuccess: async (data) => {
        toast({
          isClosable: true,
          duration: 2000,
          position: 'top-right',
          render: () => <ToastMessage title={'Cambios guardados'} status='success' />
        })
        await users.refetch()
      },
      onError: (error) => {
        console.error('Error al actualizar la configuración', error)
      }
    })

  const { mutate: newUser, isSuccess: isNewUserSuccess } = useMutation({
    mutationFn: async (data: any) => await createUser(data),
    onSuccess: async (data) => {
      toast({
        isClosable: true,
        duration: 2000,
        position: 'top-right',
        render: () => <ToastMessage title={'Usuario agregado'} description='Ya podés asignarle pedidos' status='success' />
      })
      await users.refetch()
    },
    onError: (error) => {
      console.error('Error al actualizar la configuración', error)
    }
  })

  return {
    data: users,
    editUser,
    isUpdateSuccess,
    newUser,
    isNewUserSuccess,
    isLoading: users.isLoading
  }
}
