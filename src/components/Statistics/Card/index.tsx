/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Box, Text, Icon, Heading } from '@chakra-ui/react'
import { FaClipboardList, FaUserCheck, FaClock, FaShoppingBasket } from 'react-icons/fa'

export const StatCard = ({ title, count, icon }: { title: string, count: number, icon: string }) => {
  const iconMap: any = {
    pendientes: FaClipboardList,
    preparacion: FaUserCheck,
    finalizados: FaClock,
    activos: FaShoppingBasket
  }

  const IconComponent = iconMap[icon]

  return (
    <Box bg="white" p={6} rounded="lg" shadow="base">
      <Icon as={IconComponent} color="gray.400" />
      <Text fontSize={12}>{title}</Text>
      <Heading fontSize={42} fontWeight="bold">{count}</Heading>
    </Box>
  )
}
