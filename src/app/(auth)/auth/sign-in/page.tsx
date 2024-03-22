/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import { Flex, Container, VStack, FormControl, FormLabel, Input, Button, Box, Text, Link, Image } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import { useState, type FormEvent } from 'react'

export default function SignIn () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password
    })

    if (!result?.error) {
      window.location.href = '/'
    } else {
      // Redirect to the desired page after successful sign-in
      window.location.href = '/auth/sign-in'
    }
    // Handle errors or show a message based on result.error
  }

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Box position="absolute" top="0" left="0" height="100%" width="100%" overflow="hidden">
        <Image src="/static/login-bg.png" alt="Background" objectFit="cover" width="100vw" height="100vh" />
      </Box>
      <Container as="form" onSubmit={handleSubmit} position="relative" padding="20px" bg="white" borderRadius="md" boxShadow="lg" width="100%" maxWidth="md">
        <VStack spacing="6">
          <Text fontSize="4xl" fontWeight="bold" alignSelf="flex-start">Inicio de sesión</Text>
          <FormControl id="email">
            <FormLabel fontSize="sm">Correo electrónico</FormLabel>
            <Input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
          </FormControl>
          <FormControl id="password">
            <FormLabel fontSize="sm">Contraseña</FormLabel>
            <Input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
          </FormControl>
          <Link color="#2D41FC" size="16" alignSelf="flex-end">Olvidé la contraseña</Link>
          <Button type="submit" backgroundColor="#2D41FC" borderRadius='full' colorScheme="blue" paddingY="6" width="full">INICIAR SESIÓN</Button>
        </VStack>
      </Container>
      <Text fontSize="xs" position="absolute" bottom="4" left="0" right="0" textAlign="center">
        Powered by ZenFlow
      </Text>
    </Flex>

  )
}
