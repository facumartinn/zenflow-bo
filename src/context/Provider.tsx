'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const Providers = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  const reactQueryClient = new QueryClient()

  return (
    <SessionProvider>
      <QueryClientProvider client={reactQueryClient}>
        <ChakraProvider>
          {children}
        </ChakraProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}
