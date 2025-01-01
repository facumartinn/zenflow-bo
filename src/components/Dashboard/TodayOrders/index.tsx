/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Box, Text, Flex, Progress } from '@chakra-ui/react'
import { DefaultButton } from '../../Button'
import { useRouter } from 'next/navigation'

interface TimeSlot {
  time: string
  progress: number
  isComplete?: boolean
}

interface OrderCount {
  pending: number
  completed: number
}

export const TodayOrders = ({ orders }: { orders: OrderCount }) => {
  const router = useRouter()
  const timeSlots: TimeSlot[] = [
    { time: '9:00 a 11:00', progress: 100, isComplete: true },
    { time: '11:00 a 13:00', progress: 100, isComplete: true },
    { time: '13:00 a 15:00', progress: 40 },
    { time: '15:00 a 17:00', progress: 0 },
    { time: '17:00 a 19:00', progress: 0 }
  ]

  return (
    <Box bg="white" p={6} borderRadius="lg" shadow="sm" h="100%" overflow="auto">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Pedidos de hoy
      </Text>

      <Flex justify="space-between" mb={8}>
        <Box p={4} borderRadius="md" bg="gray.50" flex={1} mr={2}>
          <Text color="gray.600">Sin preparar</Text>
          <Text fontSize="2xl" fontWeight="bold">
            {orders.pending}
          </Text>
        </Box>
        <Box p={4} borderRadius="md" bg="gray.50" flex={1} ml={2}>
          <Text color="gray.600">Preparados</Text>
          <Text fontSize="2xl" fontWeight="bold">
            {orders.completed}
          </Text>
        </Box>
      </Flex>

      {timeSlots.map((slot, index) => (
        <Box key={index} mb={4}>
          <Text mb={2}>{slot.time}</Text>
          <Progress
            value={slot.progress}
            size="lg"
            borderRadius="full"
            colorScheme={slot.isComplete ? 'green' : 'blue'}
          />
        </Box>
      ))}
      <DefaultButton label="Ver pedidos" type="secondary" onClick={async () => { router.push('/orders') }} />
    </Box>
  )
}
