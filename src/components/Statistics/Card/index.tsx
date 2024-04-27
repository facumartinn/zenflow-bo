/* eslint-disable @typescript-eslint/explicit-function-return-type */
// StatCard.tsx
import { Box, Text, Icon, Heading } from '@chakra-ui/react'
import { FaClipboardList, FaUserCheck, FaClock, FaShoppingBasket } from 'react-icons/fa'
import { statCardStyles } from './styles' // Asegúrate que la ruta sea correcta

export const StatCard = ({ title, count, icon }: { title: string, count: number, icon: string }) => {
  const iconMap: any = {
    pendientes: FaClipboardList,
    preparacion: FaUserCheck,
    finalizados: FaClock,
    activos: FaShoppingBasket
  }

  const IconComponent = iconMap[icon]

  return (
    <Box style={statCardStyles.container}>
      <Icon as={IconComponent} style={statCardStyles.icon} />
      <Text style={statCardStyles.titleText}>{title}</Text>
      <Heading style={statCardStyles.countHeading}>{count}</Heading>
    </Box>
  )
}
