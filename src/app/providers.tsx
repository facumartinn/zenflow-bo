'use client'

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
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
        staleTime: 60 * 1000
      }
    }
  }))

  return (
    <JotaiProvider>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <QueryClientProvider client={reactQueryClient}>
          <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ChakraProvider>
    </JotaiProvider>
  )
}
