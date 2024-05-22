/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Checkbox, Grid, Text, Badge, IconButton, Box, ListItem, useDisclosure, Flex, Icon } from '@chakra-ui/react'
import { styles } from './styles'
import { OrderDrawer } from '../../Modal/OrderDetail'
import { ORDER_STATES, OrderStateEnum, PickingStateEnum } from '@/src/types/order'
import { GrCircleAlert } from 'react-icons/gr'
import { RxDragHandleDots2 } from 'react-icons/rx'

interface OrderCardProps {
  orderNumber: number
  assignedTo?: string
  articlesCount: number
  packingStatus: string
  orderStatus: number | undefined | null
  pickingStatus: number | undefined | null
  onSelect: (orderNumber: number) => void
  isChecked: boolean
  showCheckbox: boolean
}

export const ListCard = ({
  orderNumber,
  assignedTo,
  articlesCount,
  packingStatus,
  orderStatus,
  pickingStatus,
  onSelect,
  isChecked,
  showCheckbox
}: OrderCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const shouldDisplayDragButton = orderStatus !== OrderStateEnum.COMPLETED && orderStatus !== OrderStateEnum.IN_PREPARATION

  const prepStatusColor = (orderStatus: OrderStateEnum) => {
    if (orderStatus === OrderStateEnum.READY_TO_PICK) return '#E1FFD9'
    if (orderStatus === OrderStateEnum.IN_PREPARATION) return '#A0AAFF4D'
    if (orderStatus === OrderStateEnum.PROGRAMMED) return '#F6F6F6'
    return 'transparent'
  }
  const status = ORDER_STATES?.find((state) => state.id === orderStatus)
  const handleCheckboxChange = (orderNumber: number) => {
    onSelect(orderNumber)
  }
  const displayStatusBadge = () => {
    if (orderStatus === OrderStateEnum.COMPLETED && pickingStatus === PickingStateEnum.INCOMPLETE) {
      return (
        <Flex alignItems='center'>
          <Icon as={GrCircleAlert} w={6} h={6} fontWeight={600} color='#DEAE34' />
          <Text ml={2} fontSize={16} fontWeight={600} color='#DEAE34'>Incompleto</Text>
        </Flex>
      )
    }
    if (orderStatus !== OrderStateEnum.NEW && orderStatus !== OrderStateEnum.COMPLETED) {
      return (
        <Badge bg={orderStatus ? prepStatusColor(orderStatus) : 'transparent'} sx={styles.badge}>
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
            disabled={orderStatus === OrderStateEnum.IN_PREPARATION}
            colorScheme="brand"
            isChecked={isChecked}
            onChange={() => { handleCheckboxChange(orderNumber) }} // Manejar el cambio
          />}
          <Box onClick={onOpen}>
            <Text sx={styles.label}>Número de pedido</Text>
            <Text sx={styles.boldText}>{orderNumber}</Text>
          </Box>
          <Box onClick={onOpen}>
            <Text sx={styles.label}>Asignado a</Text>
            <Text sx={styles.boldText}>{assignedTo}</Text>
          </Box>
          <Box onClick={onOpen}>
            <Text sx={styles.label}>Artículos</Text>
            <Text sx={styles.boldText}>{articlesCount}</Text>
          </Box>
          <Flex alignItems='center'>
            <Box onClick={onOpen}>
              <Text sx={styles.label}>Entrega</Text>
              <Text sx={styles.boldText}>{packingStatus}</Text>
            </Box>
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
      <OrderDrawer isOpen={isOpen} onClose={onClose} orderId={orderNumber} />
    </ListItem>
  )
}
