/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Checkbox, Grid, Text, Badge, IconButton, Box, ListItem, useDisclosure, Flex, Icon, useColorMode } from '@chakra-ui/react'
import { styles } from './styles'
import { OrderDrawer } from '../../Modal/OrderDetail'
import { ORDER_STATES, type Order, OrderStateEnum, PickingStateEnum } from '@/src/types/order'
import { InfoSvg } from '../../svg/infoSvg'
import { RxDragHandleDots2 } from 'react-icons/rx'
import Colors from '@/src/theme/Colors'

interface OrderCardProps {
  order: Order
  onSelect: (orderNumber: number) => void
  isChecked: boolean
  showCheckbox: boolean
}

export const ListCard = ({
  order,
  onSelect,
  isChecked,
  showCheckbox
}: OrderCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode } = useColorMode()

  const shouldDisplayDragButton = order.state_id !== OrderStateEnum.FINISHED && order.state_id !== OrderStateEnum.IN_PREPARATION

  const getStatusColor = (stateId: number) => {
    switch (stateId) {
      case OrderStateEnum.BASKET_ASSIGNMENT: return { text: Colors.mainBlue }
      case OrderStateEnum.IN_PREPARATION: return { text: Colors.mainBlue }
      case OrderStateEnum.PACKING: return { text: Colors.mainBlue }
      case OrderStateEnum.DELIVERING: return { text: Colors.mainBlue }
      case OrderStateEnum.FINISHED: return { text: Colors.warningYellow }
      case OrderStateEnum.DELETED: return { text: Colors.red }
      default: return null
    }
  }

  const getStatusText = (stateId: number) => {
    switch (stateId) {
      case OrderStateEnum.BASKET_ASSIGNMENT: return 'En preparación'
      case OrderStateEnum.IN_PREPARATION: return 'En preparación'
      case OrderStateEnum.PACKING: return 'En preparación'
      case OrderStateEnum.DELIVERING: return 'En preparación'
      case OrderStateEnum.FINISHED: return 'Incompleto'
      case OrderStateEnum.DELETED: return 'Cancelado'
      default: return null
    }
  }

  const handleCheckboxChange = (orderNumber: number) => {
    onSelect(orderNumber)
  }

  const displayStatusBadge = () => {
    const statusColor = getStatusColor(order.state_id ?? 1)
    const statusText = getStatusText(order.state_id ?? 1)

    if (statusColor && statusText) {
      return (
        <Flex alignItems='center'>
          <InfoSvg color={statusColor.text} width={18} height={18} />
          <Text
            ml={2}
            fontSize={16}
            fontWeight={600}
            color={statusColor.text}
          >
            {statusText}
          </Text>
        </Flex>
      )
    }

    return null
  }

  return (
    <ListItem>
      <Grid
        sx={{
          ...styles.cardContainer,
          bg: colorMode === 'dark' ? 'darkMode.bg.secondary' : 'white',
          borderColor: colorMode === 'dark' ? 'darkMode.border.primary' : 'gray.200'
        }}
      >
        <Grid sx={!showCheckbox ? styles.cardContentWithoutCheckbox : styles.cardContent}>
          {showCheckbox && (
            <Checkbox
              _checked={{
                '& .chakra-checkbox__control': {
                  background: 'brand.500',
                  borderColor: 'brand.500'
                }
              }}
              disabled={order.state_id === OrderStateEnum.IN_PREPARATION}
              colorScheme="brand"
              isChecked={isChecked}
              onChange={() => { handleCheckboxChange(order.id) }}
            />
          )}
          <Box onClick={onOpen}>
            <Text
              sx={styles.label}
              color={colorMode === 'dark' ? 'darkMode.text.tertiary' : 'gray.500'}
            >
              Número de pedido
            </Text>
            <Text
              sx={styles.boldText}
              color={colorMode === 'dark' ? 'darkMode.text.primary' : 'inherit'}
            >
              {order.id}
            </Text>
          </Box>
          <Box onClick={onOpen}>
            <Text
              sx={styles.label}
              color={colorMode === 'dark' ? 'darkMode.text.tertiary' : 'gray.500'}
            >
              Asignado a
            </Text>
            <Text
              sx={styles.boldText}
              color={colorMode === 'dark' ? 'darkMode.text.primary' : 'inherit'}
            >
              {order.Users ? order.Users.name : 'Todos'}
            </Text>
          </Box>
          <Box onClick={onOpen}>
            <Text
              sx={styles.label}
              color={colorMode === 'dark' ? 'darkMode.text.tertiary' : 'gray.500'}
            >
              Artículos
            </Text>
            <Text
              sx={styles.boldText}
              color={colorMode === 'dark' ? 'darkMode.text.primary' : 'inherit'}
            >
              {32}
            </Text>
          </Box>
          <Flex alignItems='center'>
            <Box onClick={onOpen} ml={12}>
              {displayStatusBadge()}
            </Box>
          </Flex>
          {shouldDisplayDragButton && (
            <IconButton
              icon={<RxDragHandleDots2 />}
              fontSize='32px'
              aria-label="Opciones"
              variant="ghost"
              color={colorMode === 'dark' ? 'darkMode.text.primary' : 'inherit'}
              sx={styles.iconButton}
            />
          )}
        </Grid>
      </Grid>
      <OrderDrawer isOpen={isOpen} onClose={onClose} orderId={order.id} />
    </ListItem>
  )
}
