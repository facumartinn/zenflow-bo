/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Text,
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  useDisclosure,
  Skeleton,
  SkeletonText,
  HStack
} from '@chakra-ui/react'
import { useOrderDetail } from '@/src/hooks/useOrderDetails'
import { OrderStateEnum, type OrderDetail } from '@/src/types/order'
import { DefaultButton } from '../../Button'
import { MountOrdersModal } from '@/src/components/Modal/Orders/MountOrders'
import { useWarehouseConfig } from '@/src/hooks/useWarehouseConfig'
import { useOrders } from '@/src/hooks/useOrders'
import { type FC } from 'react'
import { formatDateToLocal } from '@/src/utils/date'
import { DeleteModal } from '../DeleteModal'
import { WarningSvg } from '../../svg/warningSvg'
import Colors from '@/src/theme/Colors'

const ProductCardSkeleton: FC = () => {
  return (
    <Flex
      margin="15px"
      height="130px"
      flexDirection="row"
      backgroundColor="white"
      borderRadius="8px"
      padding="10px"
      marginY="5px"
      boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
    >
      <Skeleton
        width="110px"
        height="110px"
        borderRadius="8px"
      />
      <Box
        flex="1"
        marginLeft="10px"
      >
        <SkeletonText height="44px" noOfLines={2} spacing="4" skeletonHeight="4" />
        <Flex
          flexDirection="row"
          justifyContent="space-between"
          marginTop="5px"
        >
          <Box
            width="75%"
            padding="5px"
            backgroundColor="#F8F9FA"
            borderRadius="10px"
          >
            <Skeleton height="4" width="60px" mb={2} />
            <Skeleton height="6" width="100px" />
          </Box>
          <Box
            backgroundColor="#F8F9FA"
            paddingX="8px"
            paddingY="4px"
            borderRadius="10px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <Skeleton height="4" width="40px" mb={2} />
            <Skeleton height="6" width="30px" />
          </Box>
        </Flex>
      </Box>
    </Flex>
  )
}

interface ProductCardProps {
  item: OrderDetail
}

const ProductCard: FC<ProductCardProps> = ({ item }) => {
  const orderState = item.Orders?.state_id ?? OrderStateEnum.NEW
  const hasNotStarted = orderState <= OrderStateEnum.SCHEDULED
  const isFinishedOrCanceled = orderState === OrderStateEnum.FINISHED
  const isFullPicked = isFinishedOrCanceled && item.quantity_picked !== null && item.quantity_picked === item.quantity
  const isIncomplete = isFinishedOrCanceled && item.quantity_picked !== null && item.quantity_picked !== undefined && item.quantity_picked < item.quantity

  const getQuantityBoxStyles = () => {
    if (hasNotStarted || isFullPicked) {
      return {
        backgroundColor: '#F8F9FA',
        color: 'black'
      }
    }
    if (isIncomplete) {
      return {
        backgroundColor: '#FFEFB4',
        color: 'black'
      }
    }
    return {
      backgroundColor: '#F8F9FA',
      color: 'black'
    }
  }

  const quantityStyles = getQuantityBoxStyles()

  return (
    <Flex
      // margin="15px"
      // height="130px"
      flexDirection="row"
      backgroundColor="white"
      borderRadius="8px"
      padding="10px"
      marginY="5px"
      boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
    >
      <Image
        src={item.product_photo ?? 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQzIgNSJRiNbQ0WT32ES38A_jFSdxswvdxyzpmKkt7gIllBHxmvHsx_84WNQpYOK7wvKOUoT0IjSw0FVqwraFdovM3RoJI3YkdxErPvVUQ3V4c6tC7zTw6d_0RpYwSfSyKOpYFk9g&usqp=CAc'}
        alt={item.product_name}
        width="110px"
        height="110px"
        borderRadius="8px"
        objectFit="cover"
      />
      <Box
        flex="1"
        marginLeft="10px"
      >
        <Text
          height="44px"
          fontSize="16px"
          noOfLines={2}
        >
          {item.product_name}
        </Text>
        <Flex
          flexDirection="row"
          justifyContent="space-between"
          marginTop="5px"
        >
          <Box
            width="75%"
            padding="5px"
            backgroundColor="#F8F9FA"
            borderRadius="10px"
          >
            <Text
              fontSize="16px"
              color="#6C757D"
            >
              Código
            </Text>
            <Text
              fontSize="18px"
              fontWeight="700"
            >
              {item.product_barcode}
            </Text>
          </Box>
          <Box
            backgroundColor={quantityStyles.backgroundColor}
            paddingX="8px"
            paddingY="4px"
            borderRadius="10px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <Text
              fontSize="16px"
              marginBottom="4px"
              fontWeight="300"
              color={quantityStyles.color}
            >
              Cant
            </Text>
            {isIncomplete && item.quantity_picked !== null
              ? (
              <Flex
                alignItems="center"
                flexDirection="row"
              >
                <Text
                  fontSize="18px"
                  fontWeight="700"
                  color={quantityStyles.color}
                >
                  {item.quantity_picked}
                </Text>
                <Text
                  fontSize="16px"
                  color={quantityStyles.color}
                >
                  /{item.quantity}
                </Text>
              </Flex>
                )
              : (
              <Text
                fontSize="18px"
                fontWeight="700"
                color={quantityStyles.color}
              >
                {item.quantity}
              </Text>
                )}
          </Box>
        </Flex>
        {isIncomplete && (
          <HStack spacing={1} my={1} alignItems="center">
            <WarningSvg color={Colors.warningYellow} width={16} height={16} />
            <Text color={Colors.warningYellow} fontSize="14px" fontWeight="500">
              Incompleto
            </Text>
          </HStack>
        )}
      </Box>
    </Flex>
  )
}

interface OrderDrawerProps {
  isOpen: boolean
  onClose: () => void
  orderId: number
}

export const OrderDrawer: FC<OrderDrawerProps> = ({ isOpen, onClose, orderId }) => {
  const { data: orderDetail, isLoading } = useOrderDetail(orderId, isOpen)
  const { warehouseConfig } = useWarehouseConfig()
  const { assignOrders, deleteOrders } = useOrders()
  const { isOpen: isMountModalOpen, onOpen: onMountModalOpen, onClose: onMountModalClose } = useDisclosure()
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure()
  const orderState = orderDetail?.order?.state_id ?? OrderStateEnum.NEW
  const isFinishedOrCanceled = orderState === OrderStateEnum.FINISHED || orderState === OrderStateEnum.DELETED

  const handleAssignOrders = (data: any): void => {
    assignOrders(data)
  }

  const handleDelete = () => {
    deleteOrders([orderId])
    onDeleteModalClose()
  }

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader p={6}>
            <VStack align="flex-start" spacing={1}>
              <Text color="#6C757D" fontSize="14px">Número de pedido</Text>
              {isLoading
                ? <Skeleton height="12" width="200px" />
                : <Text fontSize="32px" fontWeight="600">{String(orderDetail?.order?.order_tenant_id).padStart(6, '0')}</Text>
              }
            </VStack>
          </DrawerHeader>

          <DrawerBody p={0}>
            <Grid templateColumns="1fr 1fr" gap={6} mb={8} p={6}>
              <GridItem>
                <Text color="#6C757D" fontSize="14px" mb={1}>Día</Text>
                {isLoading
                  ? <Skeleton height="6" width="120px" />
                  : <Text fontSize="16px" fontWeight="bold">
                      {orderDetail?.order?.assembly_date
                        ? formatDateToLocal(orderDetail.order.assembly_date)
                        : '--/--/----'}
                    </Text>
                }
              </GridItem>
              <GridItem>
                <Text color="#6C757D" fontSize="14px" mb={1}>Turno</Text>
                {isLoading
                  ? <Skeleton height="6" width="120px" />
                  : (
                  <Text fontSize="16px" fontWeight="bold">
                    {orderDetail?.order?.assembly_schedule
                      ? `${String(orderDetail.order.assembly_schedule).padStart(2, '0')}:00 a ${String(Number(orderDetail.order.assembly_schedule) + 2).padStart(2, '0')}:00`
                      : '9:00 a 11:00'
                    }
                  </Text>
                    )
                }
              </GridItem>
              <GridItem>
                <Text color="#6C757D" fontSize="14px" mb={1}>Picker</Text>
                {isLoading
                  ? <Skeleton height="6" width="120px" />
                  : <Text fontSize="16px" fontWeight="bold">{orderDetail?.order?.Users?.name ?? 'Todos'}</Text>
                }
              </GridItem>
              <GridItem>
                <Text color="#6C757D" fontSize="14px" mb={1}>Cantidad</Text>
                {isLoading
                  ? <Skeleton height="6" width="120px" />
                  : <Text fontSize="16px" fontWeight="bold">{orderDetail?.total_products ?? 0}</Text>
                }
              </GridItem>
              <GridItem>
                <Text color="#6C757D" fontSize="14px" mb={1}>Posiciones</Text>
                {isLoading
                  ? <Skeleton height="6" width="120px" />
                  : <Text fontSize="16px" fontWeight="bold">{orderDetail?.order?.positions ?? '-'}</Text>
                }
              </GridItem>
            </Grid>

            <Flex justifyContent="center" mb={8}>
              {isLoading
                ? <Skeleton height="10" width="120px" borderRadius="full" />
                : !isFinishedOrCanceled
                    ? (
                <DefaultButton
                  type="secondary"
                  onClick={onMountModalOpen}
                  label="EDITAR"
                />
                      )
                    : null
              }
            </Flex>

            <Box bg='#F8F9FA' p={6}>
              <Text fontSize="20px" fontWeight="bold" mb={4} textAlign='center'>Detalle del pedido</Text>
              <VStack spacing={2} align="stretch">
                {isLoading
                  ? [...Array(3)].map((_, index) => (
                  <ProductCardSkeleton key={index} />
                    ))
                  : orderDetail?.details?.length ?? 0
                    ? orderDetail?.details?.map((item, index) => (
                  <ProductCard key={index} item={item} />
                    ))
                    : <Text fontSize="16px" fontWeight="bold">{orderDetail?.total_products ?? 0}</Text>
                }
              </VStack>
            <Flex justifyContent="center" mt={8} mb={4}>
              {isLoading
                ? <Skeleton height="10" width="100%" borderRadius="full" />
                : (
                <DefaultButton
                  type="warningSecondary"
                  onClick={() => {
                    onClose()
                    onDeleteModalOpen()
                  }}
                  label="ELIMINAR PEDIDO"
                />
                  )
              }
            </Flex>
            </Box>

          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <MountOrdersModal
        title="Editar pedido"
        description="Los cambios se aplicarán al pedido seleccionado."
        buttonLabel="GUARDAR"
        selectedOrders={[orderId]}
        warehouseConfig={warehouseConfig}
        assignOrders={handleAssignOrders}
        isOpen={isMountModalOpen}
        onClose={onMountModalClose}
      />

      <DeleteModal
        title="¿Eliminar pedido?"
        subtitle="No vas a poder recuperar los pedidos"
        onDelete={handleDelete}
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalClose}
      />
    </>
  )
}
