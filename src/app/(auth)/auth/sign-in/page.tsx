/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import { Flex, Container, VStack, FormControl, FormLabel, Input, Button, Box, Text, useToast } from '@chakra-ui/react'
import { useState, type FormEvent } from 'react'
import { signInService } from '@/src/services/authService'
import { useAuthStore } from '@/src/store/authStore'
import Image from 'next/image'
import { type User } from '@/src/types/user'

export default function SignIn () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const login = useAuthStore((state) => state.login)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      const response = await signInService(email, password)

      if (response.status === 200 && response.data?.data) {
        const { user, token } = response.data.data
        login(user as User, token as string)
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
    <Flex height="100vh" alignItems="center" justifyContent="center" position="relative">
      <Box position="absolute" top="0" left="0" height="100%" width="100%" overflow="hidden">
        <Image
          src="/static/login-bg.png"
          alt="Login Background"
          fill
          priority
          quality={75}
          style={{
            objectFit: 'cover'
          }}
          sizes="100vw"
        />
      </Box>
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
          <FormControl id="email">
            <FormLabel fontSize="sm">Correo electrónico</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
              isDisabled={isLoading}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel fontSize="sm">Contraseña</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
              isDisabled={isLoading}
            />
          </FormControl>
          <Button
            type="submit"
            backgroundColor="#2D41FC"
            borderRadius='full'
            colorScheme="blue"
            paddingY="6"
            width="full"
            isLoading={isLoading}
          >
            INICIAR SESIÓN
          </Button>
        </VStack>
      </Container>
      <Text fontSize="xs" position="absolute" bottom="4" left="0" right="0" textAlign="center" color="white">
        Powered by ZenFlow
      </Text>
    </Flex>
  )
}
