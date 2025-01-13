/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import { LoginForm } from '@/src/components/Auth/LoginForm'
import { Flex, Box, Text } from '@chakra-ui/react'
import Image from 'next/image'

export default function SignIn () {
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" position="relative">
      <Box position="absolute" top="0" left="0" height="100%" width="100%" overflow="hidden">
        <Image
          src="https://zenflowimg.nyc3.cdn.digitaloceanspaces.com/Large-modern-warehouse-with-storage-area.webp"
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
      <LoginForm />
      <Text fontSize="xs" position="absolute" bottom="4" left="0" right="0" textAlign="center" color="white">
        Powered by ZenFlow
      </Text>
    </Flex>
  )
}
