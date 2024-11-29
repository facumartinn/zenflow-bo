/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Box, Text, Icon, Heading, SkeletonCircle, Flex, useColorModeValue } from '@chakra-ui/react'
import { FaClipboardList, FaUserCheck, FaClock, FaShoppingBasket } from 'react-icons/fa'

const statName: Record<string, string> = {
  pending: 'Pedidos pendientes',
  in_preparation: 'En preparación',
  finished: 'Finalizados',
  active_pickers: 'Pickers activos',
  expired_orders: 'Pedidos vencidos'
}

const iconMap: Record<string, any> = {
  pending: FaClipboardList,
  in_preparation: FaUserCheck,
  finished: FaClock,
  active_pickers: FaShoppingBasket
}

interface StatCardProps {
  name: string
  count: number
}

export const StatCard = ({ name, count }: StatCardProps) => {
  const isPending = name === 'pending'
  const IconComponent = iconMap[name]
  const bgColor = useColorModeValue(isPending ? 'transparent' : 'white', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  return (
    <Box
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="xl"
      p={{ base: 4, md: 6 }}
      transition="all 0.2s"
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: 'md'
      }}
    >
      <Flex direction="column" height="full">
        {isPending
          ? (
          <Text
            fontSize={{ base: 'xs', md: 'sm' }}
            fontWeight="medium"
            color="gray.500"
            mb={2}
          >
            HOY
          </Text>
            )
          : (
          <Icon
            as={IconComponent}
            boxSize={{ base: 5, md: 6 }}
            color="gray.500"
            mb={2}
          />
            )}

        <Text
          fontSize={{ base: 'xs', md: 'sm' }}
          color="gray.500"
          mb={2}
        >
          {statName[name]}
        </Text>

        <Flex align="center" justify="space-between">
          <Heading
            fontSize={{ base: '2xl', md: '3xl' }}
            fontWeight="bold"
            color="gray.700"
          >
            {count}
          </Heading>
          {name === 'active_pickers' && (
            <SkeletonCircle
              size="2"
              startColor="green.200"
              endColor="green.500"
              speed={1}
            />
          )}
        </Flex>
      </Flex>
    </Box>
  )
}
