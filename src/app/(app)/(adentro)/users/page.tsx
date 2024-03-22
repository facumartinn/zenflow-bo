/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import { useSession } from 'next-auth/react'

export default function UsersPage () {
  const session = useSession()
  return (
      <div>{JSON.stringify(session)}</div>
  )
}
