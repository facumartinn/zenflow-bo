'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'

import { Provider as JotaiProvider } from 'jotai'
import { theme } from '../theme/theme'
import { useState } from 'react'

export const Providers = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  const [reactQueryClient] = useState(new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000
      }
    }
  }))

  return (
    <SessionProvider>
      <JotaiProvider>
          <ChakraProvider theme={theme}>
        <QueryClientProvider client={reactQueryClient}>
          <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
          </ChakraProvider>
      </JotaiProvider>
    </SessionProvider>
  )
}
