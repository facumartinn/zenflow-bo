import { SimpleGrid } from '@chakra-ui/react'
import { StatCard } from './Card'

interface StatsProps {
  stats: Array<{
    title: string
    count: number
    icon: string
  }>
}
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const Stats = ({ stats }: StatsProps) => {
  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 4 }} spacing={4} mb={8} gap={4} w="full">
      {stats.map((stat) => (
        <StatCard key={stat.title} title={stat.title} count={stat.count} icon={stat.icon} />
      ))}
    </SimpleGrid>
  )
}
