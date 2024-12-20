/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { SimpleGrid, Box, useColorMode } from '@chakra-ui/react'
import { StatCard } from './Card'
import { motion } from 'framer-motion'

const MotionBox = motion.create(Box)

interface StatsProps {
  stats: Array<{
    id: string
    name: string
    count: number
  }> | null
}

export const Stats = ({ stats }: StatsProps) => {
  const { colorMode } = useColorMode()

  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, md: 4 }}
      spacing={{ base: 4, md: 6 }}
      w="full"
    >
      {stats?.map((stat, index) => (
        stat.name !== 'expired_orders' && (
          <MotionBox
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            style={{
              filter: colorMode === 'dark' ? 'brightness(0.9)' : 'none'
            }}
          >
            <StatCard
              name={stat.name}
              count={stat.count}
            />
          </MotionBox>
        )
      ))}
    </SimpleGrid>
  )
}
