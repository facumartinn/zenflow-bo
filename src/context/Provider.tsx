'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider as JotaiProvider } from 'jotai'

const queryClient = new QueryClient()

export const Providers = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <ChakraProvider>
          {children}
        </ChakraProvider>
      </JotaiProvider>
    </QueryClientProvider>
  )
}
