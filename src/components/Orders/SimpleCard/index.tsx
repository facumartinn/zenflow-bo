/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Order } from '@/src/types/order'
import { Text, Flex } from '@chakra-ui/react'

interface OrderCardProps {
  order: Order
}

export const SimpleOrderCard = ({ order }: OrderCardProps) => {
  return (
    <Flex
      borderWidth="1px"
      width="300px"
      borderRadius="lg"
      border="1px solid"
      borderColor="#EAECEE"
      overflow="hidden"
      mr={4}
      py={4}
      px={10}
      bg="white"
    >
      <Flex flexDirection='column' justifyContent="start" mb={1}>
        <Text fontSize="sm" fontWeight={400} color="#808081">Número de pedido</Text>
        <Text fontSize="md" fontWeight={600}>{order.id}9238498234</Text>
      </Flex>
      <Flex flexDirection='column' justifyContent="start" ml={6}>
        <Text fontSize="sm" fontWeight={400} color="#808081">Artículos</Text>
        <Text fontSize="md" fontWeight={600}>{32}</Text>
      </Flex>
    </Flex>
  )
}
