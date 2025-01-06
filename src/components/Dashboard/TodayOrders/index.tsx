/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Box, Text, Flex, Progress } from '@chakra-ui/react'
import { DefaultButton } from '../../Button'
import { useRouter } from 'next/navigation'
import Colors from '@/src/theme/Colors'

interface Schedule {
  time: string
  pending: number
  completed: number
  progress: number
}

interface OrderCount {
  pending: number
  completed: number
  schedules: Schedule[]
}

export const TodayOrders = ({ orders }: { orders: OrderCount }) => {
  const router = useRouter()

  return (
    <Box bg="white" p={6} borderRadius="lg" shadow="sm" h="100%" overflow="auto">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Pedidos de hoy
      </Text>

      <Flex justify="space-between" mb={8}>
        <Box p={4} borderRadius="xl" border="1px solid" borderColor={Colors.grey3} flex={1} mr={2}>
          <Text color={Colors.black} align="center">Sin preparar</Text>
          <Text fontSize="2xl" fontWeight="bold" align="center">
            {orders.pending}
          </Text>
        </Box>
        <Box p={4} borderRadius="xl" border="1px solid" borderColor={Colors.grey3} flex={1} ml={2}>
          <Text color={Colors.black} align="center">Preparados</Text>
          <Text fontSize="2xl" fontWeight="bold" align="center">
            {orders.completed}
          </Text>
        </Box>
      </Flex>

      {orders.schedules.map((schedule, index) => (
        <Box key={index} mb={4}>
          <Flex justify="space-between" mb={2}>
            <Text>{schedule.time}</Text>
            <Text color={Colors.black}>{schedule.completed}/{schedule.pending + schedule.completed} pedidos</Text>
          </Flex>
          <Progress
            value={schedule.progress}
            size="lg"
            borderRadius="full"
            colorScheme={schedule.progress === 100 ? 'green' : 'blue'}
          />
        </Box>
      ))}
      <Box mt={4} alignSelf="flex-end">
        <DefaultButton label="VER PEDIDOS" type="secondaryNoBg" onClick={async () => { router.push('/orders') }} />
      </Box>
    </Box>
  )
}
