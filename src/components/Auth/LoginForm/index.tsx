/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import { Container, VStack, FormControl, FormLabel, Input, Button, Text, useToast, Checkbox, FormErrorMessage, useColorModeValue } from '@chakra-ui/react'
import { useState } from 'react'
import { signInService } from '@/src/services/authService'
import { useAuthStore } from '@/src/store/authStore'
import { useLoginForm } from '@/src/hooks/useLogin'
import { type User } from '@/src/types/user'
import Colors from '@/src/theme/Colors'
import { useRouter } from 'next/navigation'

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const router = useRouter()
  const login = useAuthStore((state) => state.login)
  const { form, errors, handleChange, isValid } = useLoginForm()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!isValid) return

    setIsLoading(true)

    try {
      const response = await signInService(form.email, form.password)

      if (response.metadata.code === 200 && response.data) {
        const { user, token } = response.data
        await login(
          user as User,
          token as string,
          '',
          user.tenant_id as string,
          user.warehouse_id as string,
          form.rememberMe as boolean
        )
        router.push('/')
        router.refresh()
      }
    } catch (error: any) {
      toast({
        title: 'Correo electrónico o contraseña incorrectos',
        description: 'En caso de no poder iniciar sesión ponete en contacto con el administrador',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container
      as="form"
      onSubmit={handleSubmit}
      position="relative"
      padding="30"
      bg={useColorModeValue('white', '#2D3748')}
      borderRadius="14"
      boxShadow="lg"
      width="100%"
      maxWidth="md"
    >
      <VStack spacing="6">
        <Text fontSize="4xl" fontWeight="bold" alignSelf="flex-start" color={useColorModeValue('gray.800', 'white')}>Inicio de sesión</Text>
        <FormControl id="email" isInvalid={!!errors.email}>
          <FormLabel fontSize="sm" color={useColorModeValue('gray.800', 'white')}>Correo electrónico</FormLabel>
          <Input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            isDisabled={isLoading}
          />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>
        <FormControl id="password" isInvalid={!!errors.password}>
          <FormLabel fontSize="sm" color={useColorModeValue('gray.800', 'white')}>Contraseña</FormLabel>
          <Input
            type="password"
            name="password"
            color={useColorModeValue('gray.800', 'white')}
            value={form.password}
            onChange={handleChange}
            isDisabled={isLoading}
          />
          <FormErrorMessage>{errors.password}</FormErrorMessage>
        </FormControl>
        <FormControl>
          <Checkbox
            name="rememberMe"
            isChecked={form.rememberMe}
            onChange={handleChange}
            colorScheme="brand"
          >
            Recordarme
          </Checkbox>
        </FormControl>
        <Button
          type="submit"
          backgroundColor={Colors.mainBlue}
          borderRadius='full'
          color={Colors.white}
          paddingY="6"
          width="full"
          isLoading={isLoading}
          isDisabled={!isValid}
        >
          INICIAR SESIÓN
        </Button>
      </VStack>
    </Container>
  )
}
