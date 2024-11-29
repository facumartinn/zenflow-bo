/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { AuthGuard } from '@/src/components/AuthGuard'

export default function DashboardLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return <AuthGuard>{children}</AuthGuard>
}
