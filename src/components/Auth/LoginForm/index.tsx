/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import { Container, VStack, FormControl, FormLabel, Input, Button, Text, useToast, Checkbox, FormErrorMessage } from '@chakra-ui/react'
import { useState } from 'react'
import { signInService } from '@/src/services/authService'
import { useAuthStore } from '@/src/store/authStore'
import { useLoginForm } from '@/src/hooks/useLogin'
import { type User } from '@/src/types/user'

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const login = useAuthStore((state) => state.login)
  const { form, errors, handleChange, isValid } = useLoginForm()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!isValid) return

    setIsLoading(true)

    try {
      const response = await signInService(form.email, form.password)

      if (response.status === 200 && response.data?.data) {
        const { user, token } = response.data.data
        login(user as User, token as string, form.rememberMe as boolean)
        window.location.href = '/'
      }
    } catch (error: any) {
      toast({
        title: 'Error de inicio de sesión',
        description: error.message || 'Credenciales inválidas',
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
      padding="20px"
      bg="white"
      borderRadius="md"
      boxShadow="lg"
      width="100%"
      maxWidth="md"
    >
      <VStack spacing="6">
        <Text fontSize="4xl" fontWeight="bold" alignSelf="flex-start">Inicio de sesión</Text>
        <FormControl id="email" isInvalid={!!errors.email}>
          <FormLabel fontSize="sm">Correo electrónico</FormLabel>
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
          <FormLabel fontSize="sm">Contraseña</FormLabel>
          <Input
            type="password"
            name="password"
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
          >
            Recordarme
          </Checkbox>
        </FormControl>
        <Button
          type="submit"
          backgroundColor="#2D41FC"
          borderRadius='full'
          colorScheme="blue"
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
