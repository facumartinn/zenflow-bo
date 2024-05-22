import { SimpleGrid } from '@chakra-ui/react'
import { StatCard } from './Card'

interface StatsProps {
  stats: Array<{
    id: string
    name: string
    count: number
  }> | null
}
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const Stats = ({ stats }: StatsProps) => {
  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 4 }} spacing={4} mb={8} gap={4} w="full">
      {stats?.map((stat) => (
        <StatCard key={stat.id} name={stat.name} count={stat.count} />
      ))}
    </SimpleGrid>
  )
}
