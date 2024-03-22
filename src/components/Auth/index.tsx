/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Auth ({ children }: any) {
  const router = useRouter()
  const { status } = useSession({
    required: true,
    async onUnauthenticated () {
      await router.push('/sign-in')
    }
  })

  if (status === 'loading') {
    return <div>Loading ...</div>
  }
  return children
}
