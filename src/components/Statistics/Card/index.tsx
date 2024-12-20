/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Box, Text, Icon, Heading, SkeletonCircle, Flex, useColorMode } from '@chakra-ui/react'
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
  const { colorMode } = useColorMode()

  return (
    <Box
      bg={colorMode === 'dark' ? (isPending ? 'transparent' : 'darkMode.bg.secondary') : (isPending ? 'transparent' : 'white')}
      borderWidth="1px"
      borderColor={colorMode === 'dark' ? 'darkMode.border.primary' : 'gray.200'}
      borderRadius="xl"
      p={{ base: 4, md: 6 }}
      transition="all 0.2s"
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: colorMode === 'dark' ? 'dark-lg' : 'md'
      }}
    >
      <Flex direction="column" height="full">
        {isPending
          ? (
          <Text
            fontSize="sm"
            fontWeight="medium"
            color={colorMode === 'dark' ? 'darkMode.text.tertiary' : 'gray.500'}
            mb={2}
          >
            HOY
          </Text>
            )
          : (
          <Icon
            as={IconComponent}
            boxSize={6}
            color={colorMode === 'dark' ? 'darkMode.text.tertiary' : 'gray.500'}
            mb={3}
          />
            )}

        <Text
          fontSize="sm"
          color={colorMode === 'dark' ? 'darkMode.text.tertiary' : 'gray.500'}
          mb={3}
        >
          {statName[name]}
        </Text>

        <Flex align="center" justify="space-between">
          <Heading
            fontSize={{ base: '2xl', md: '3xl' }}
            fontWeight="bold"
            color={colorMode === 'dark' ? 'darkMode.text.primary' : 'gray.700'}
          >
            {count}
          </Heading>
          {name === 'active_pickers' && (
            <SkeletonCircle
              size="2"
              startColor={colorMode === 'dark' ? 'green.700' : 'green.200'}
              endColor={colorMode === 'dark' ? 'green.500' : 'green.500'}
              speed={1}
            />
          )}
        </Flex>
      </Flex>
    </Box>
  )
}
