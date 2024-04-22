'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider as JotaiProvider } from 'jotai'
import { theme } from '../theme/theme'

export const Providers = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  const reactQueryClient = new QueryClient()
  return (
    <SessionProvider>
      <JotaiProvider>
        <QueryClientProvider client={reactQueryClient}>
          <ChakraProvider theme={theme}>
            {children}
          </ChakraProvider>
        </QueryClientProvider>
      </JotaiProvider>
    </SessionProvider>
  )
}
