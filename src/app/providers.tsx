'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'

export const Providers = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  return (
    <SessionProvider>
      <ChakraProvider>
        {children}
      </ChakraProvider>
    </SessionProvider>
  )
}
