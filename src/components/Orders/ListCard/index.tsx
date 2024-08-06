/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Checkbox, Grid, Text, Badge, IconButton, Box, ListItem, useDisclosure, Flex, Icon } from '@chakra-ui/react'
import { styles } from './styles'
import { OrderDrawer } from '../../Modal/OrderDetail'
import { ORDER_STATES, type Order, OrderStateEnum, PickingStateEnum } from '@/src/types/order'
import { GrCircleAlert } from 'react-icons/gr'
import { RxDragHandleDots2 } from 'react-icons/rx'

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

  const shouldDisplayDragButton = order.state_id !== OrderStateEnum.COMPLETED && order.state_id !== OrderStateEnum.IN_PREPARATION

  const prepStatusColor = (orderStatus: OrderStateEnum) => {
    if (orderStatus === OrderStateEnum.READY_TO_PICK) return '#E1FFD9'
    if (orderStatus === OrderStateEnum.IN_PREPARATION) return '#A0AAFF4D'
    if (orderStatus === OrderStateEnum.PROGRAMMED) return '#F6F6F6'
    return 'transparent'
  }
  const status = ORDER_STATES?.find((state) => state.id === order.state_id)
  const handleCheckboxChange = (orderNumber: number) => {
    onSelect(orderNumber)
  }
  const displayStatusBadge = () => {
    if (order.state_id === OrderStateEnum.COMPLETED && order.state_picking_id === PickingStateEnum.INCOMPLETE) {
      return (
        <Flex alignItems='center'>
          <Icon as={GrCircleAlert} w={6} h={6} fontWeight={600} color='#DEAE34' />
          <Text ml={2} fontSize={16} fontWeight={600} color='#DEAE34'>Incompleto</Text>
        </Flex>
      )
    }
    if (order.state_id !== OrderStateEnum.NEW && order.state_id !== OrderStateEnum.COMPLETED) {
      return (
        <Badge bg={order.state_id ? prepStatusColor(order.state_id) : 'transparent'} sx={styles.badge}>
          {status?.description}
        </Badge>
      )
    }
    return null
  }

  return (
    <ListItem>
      <Grid sx={styles.cardContainer}>
        <Grid sx={!showCheckbox ? styles.cardContentWithoutCheckbox : styles.cardContent}>
          {showCheckbox && <Checkbox
            _checked={{
              '& .chakra-checkbox__control': { background: '#2D41FC', borderColor: '#2D41FC' }
            }}
            disabled={order.state_id === OrderStateEnum.IN_PREPARATION}
            colorScheme="brand"
            isChecked={isChecked}
            onChange={() => { handleCheckboxChange(order.id) }} // Manejar el cambio
          />}
          <Box onClick={onOpen}>
            <Text sx={styles.label}>Número de pedido</Text>
            <Text sx={styles.boldText}>{order.id}</Text>
          </Box>
          <Box onClick={onOpen}>
            <Text sx={styles.label}>Asignado a</Text>
            <Text sx={styles.boldText}>{order.Users ? order.Users.name : 'Todos'}</Text>
          </Box>
          <Box onClick={onOpen}>
            <Text sx={styles.label}>Artículos</Text>
            <Text sx={styles.boldText}>{32}</Text>
          </Box>
          <Flex alignItems='center'>
            <Box onClick={onOpen} ml={12}>
              {displayStatusBadge()}
            </Box>
          </Flex>
          {shouldDisplayDragButton &&
            <IconButton
              icon={<RxDragHandleDots2 />}
              fontSize='32px'
              aria-label="Opciones"
              variant="none"
              sx={styles.iconButton}
            />
          }
        </Grid>
      </Grid>
      <OrderDrawer isOpen={isOpen} onClose={onClose} orderId={order.id} />
    </ListItem>
  )
}
