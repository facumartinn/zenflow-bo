/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '../providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Back Office - ZenFlow',
  description: 'Generated by ZenFlow'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/static/zenflow1.png" sizes="any" style={{ borderRadius: '100' }} />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
