/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Box, Text, Icon, Heading, SkeletonCircle, Flex } from '@chakra-ui/react'
import { FaClipboardList, FaUserCheck, FaClock, FaShoppingBasket } from 'react-icons/fa'
import { statCardStyles } from './styles' // Asegúrate que la ruta sea correcta

const statName: any = {
  pending: 'Pedidos pendientes',
  in_preparation: 'En preparación',
  finished: 'Finalizados',
  active_pickers: 'Pickers activos'
}
const iconMap: any = {
  pending: FaClipboardList,
  in_preparation: FaUserCheck,
  finished: FaClock,
  active_pickers: FaShoppingBasket
}

export const StatCard = ({ name, count }: { name: string, count: number }) => {
  const isPending = name === 'pending'
  const IconComponent = iconMap[name]

  return (
    <Box style={isPending ? statCardStyles.firstContainer : statCardStyles.container}>
      {isPending ? <Text style={statCardStyles.todayText}>HOY</Text> : <Icon as={IconComponent} style={statCardStyles.icon} />}
      <Text style={statCardStyles.titleText}>{statName[name]}</Text>
      <Flex>
        <Heading style={statCardStyles.countHeading}>{count}</Heading>
        {name === 'active_pickers' ? <SkeletonCircle mt={2} variant='green' size='2' /> : null}
      </Flex>
    </Box>
  )
}
