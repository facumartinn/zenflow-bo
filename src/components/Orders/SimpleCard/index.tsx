/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Order } from '@/src/types/order'
import { Text, Flex, useColorMode } from '@chakra-ui/react'

interface OrderCardProps {
  order: Order
}

export const SimpleOrderCard = ({ order }: OrderCardProps) => {
  const { colorMode } = useColorMode()

  return (
    <Flex
      borderWidth="1px"
      width="300px"
      borderRadius="lg"
      border="1px solid"
      borderColor={colorMode === 'dark' ? 'darkMode.border.primary' : '#EAECEE'}
      overflow="hidden"
      mr={4}
      py={4}
      px={10}
      bg={colorMode === 'dark' ? 'darkMode.bg.secondary' : 'white'}
    >
      <Flex flexDirection='column' justifyContent="start" mb={1}>
        <Text
          fontSize="sm"
          fontWeight={400}
          color={colorMode === 'dark' ? 'darkMode.text.tertiary' : '#808081'}
        >
          Número de pedido
        </Text>
        <Text
          fontSize="md"
          fontWeight={600}
          color={colorMode === 'dark' ? 'darkMode.text.primary' : 'inherit'}
        >
          {order.id}
        </Text>
      </Flex>
      <Flex flexDirection='column' justifyContent="start" ml={6}>
        <Text
          fontSize="sm"
          fontWeight={400}
          color={colorMode === 'dark' ? 'darkMode.text.tertiary' : '#808081'}
        >
          Artículos
        </Text>
        <Text
          fontSize="md"
          fontWeight={600}
          color={colorMode === 'dark' ? 'darkMode.text.primary' : 'inherit'}
        >
          {32}
        </Text>
      </Flex>
    </Flex>
  )
}
