/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Checkbox, Grid, Text, Badge, IconButton, Box, ListItem, useDisclosure, Flex, Icon, useColorMode } from '@chakra-ui/react'
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
  const { colorMode } = useColorMode()

  const shouldDisplayDragButton = order.state_id !== OrderStateEnum.FINISHED && order.state_id !== OrderStateEnum.IN_PREPARATION

  const getStatusColors = (orderStatus: OrderStateEnum) => {
    if (colorMode === 'dark') {
      switch (orderStatus) {
        case OrderStateEnum.READY_TO_PICK:
          return { bg: 'green.800', color: 'green.100' }
        case OrderStateEnum.IN_PREPARATION:
          return { bg: 'blue.800', color: 'blue.100' }
        case OrderStateEnum.SCHEDULED:
          return { bg: 'darkMode.bg.tertiary', color: 'darkMode.text.primary' }
        default:
          return { bg: 'transparent', color: 'darkMode.text.primary' }
      }
    } else {
      switch (orderStatus) {
        case OrderStateEnum.READY_TO_PICK:
          return { bg: '#E1FFD9', color: 'inherit' }
        case OrderStateEnum.IN_PREPARATION:
          return { bg: '#A0AAFF4D', color: 'inherit' }
        case OrderStateEnum.SCHEDULED:
          return { bg: '#F6F6F6', color: 'inherit' }
        default:
          return { bg: 'transparent', color: 'inherit' }
      }
    }
  }

  const status = ORDER_STATES?.find((state) => state.id === order.state_id)

  const handleCheckboxChange = (orderNumber: number) => {
    onSelect(orderNumber)
  }

  const displayStatusBadge = () => {
    if (order.state_id === OrderStateEnum.FINISHED && order.state_picking_id === PickingStateEnum.INCOMPLETE) {
      return (
        <Flex alignItems='center'>
          <Icon
            as={GrCircleAlert}
            w={6}
            h={6}
            fontWeight={600}
            color={colorMode === 'dark' ? 'yellow.200' : '#DEAE34'}
          />
          <Text
            ml={2}
            fontSize={16}
            fontWeight={600}
            color={colorMode === 'dark' ? 'yellow.200' : '#DEAE34'}
          >
            Incompleto
          </Text>
        </Flex>
      )
    }
    if (order.state_id !== OrderStateEnum.NEW && order.state_id !== OrderStateEnum.FINISHED) {
      const { bg, color } = getStatusColors(order.state_id as OrderStateEnum)
      return (
        <Badge
          bg={bg}
          color={color}
          sx={styles.badge}
        >
          {status?.description}
        </Badge>
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
