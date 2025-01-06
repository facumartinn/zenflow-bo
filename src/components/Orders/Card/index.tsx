/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import { Box, Flex, HStack, VStack, Button, Text, useDisclosure, Checkbox } from '@chakra-ui/react'
import { OrderStateEnum, PickingStateEnum, type Order } from '@/src/types/order'
import { OrderDrawer } from '../../Modal/OrderDetail'
import Colors from '@/src/theme/Colors'
import { InfoSvg } from '../../svg/infoSvg'

interface OrderCardProps {
  order: Order
  onSelect: (orderId: number) => void
  isSelected: boolean
}

export const OrderCard = ({ order, onSelect, isSelected }: OrderCardProps) => {
  const { isOpen: isOrderDrawerOpen, onOpen: onOrderDrawerOpen, onClose: onOrderDrawerClose } = useDisclosure()

  const isDisabled = [
    OrderStateEnum.BASKET_ASSIGNMENT,
    OrderStateEnum.IN_PREPARATION,
    OrderStateEnum.PACKING,
    OrderStateEnum.DELIVERING,
    OrderStateEnum.FINISHED,
    OrderStateEnum.DELETED
  ].includes(order.state_id ?? 1)

  const getStatusColor = (stateId: number) => {
    switch (stateId) {
      case OrderStateEnum.BASKET_ASSIGNMENT: return { text: Colors.mainBlue }
      case OrderStateEnum.IN_PREPARATION: return { text: Colors.mainBlue }
      case OrderStateEnum.PACKING: return { text: Colors.mainBlue }
      case OrderStateEnum.DELIVERING: return { text: Colors.mainBlue }
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
      case OrderStateEnum.DELETED: return 'Cancelado'
      default: return null
    }
  }

  const statusColors = getStatusColor(order.state_id ?? 1)
  const statusText = getStatusText(order.state_id ?? 1)

  const showIncompleteStatus = order.state_id === OrderStateEnum.FINISHED && order.state_picking_id === PickingStateEnum.INCOMPLETE

  return (
    <Box
      p={6}
      borderBottomWidth="1px"
      borderRadius="lg"
      borderColor={'gray.200'}
      bg='transparent'
    >
      <Flex align="center" justify="space-between">
        <HStack align="start" spacing={8}>
          <Box className="checkbox-container" alignSelf="center">
            <Checkbox
              isChecked={isSelected}
              isDisabled={isDisabled}
              onChange={(e) => {
                e.stopPropagation()
                onSelect(order.id)
              }}
              sx={{
                'span.chakra-checkbox__control': {
                  borderColor: isSelected ? Colors.mainBlue : 'gray.200',
                  backgroundColor: isSelected ? Colors.mainBlue : 'white',
                  _checked: {
                    backgroundColor: Colors.mainBlue,
                    borderColor: Colors.mainBlue
                  },
                  _hover: !isDisabled
                    ? {
                        borderColor: Colors.mainBlue
                      }
                    : {}
                }
              }}
              mr={4}
            />
          </Box>
          <Box>
            <Text color="gray.500" fontSize="14px">Número de pedido</Text>
            <Text fontSize="16px" fontWeight="bold">{String(order.id).padStart(6, '0')}</Text>
          </Box>

          <Box>
            <Text color="gray.500" fontSize="14px">Cantidad</Text>
            <Text fontSize="16px" fontWeight="bold">
              {order.total_products}
            </Text>
          </Box>
          <Box>
            <Text color="gray.500" fontSize="14px">Picker</Text>
            <Text fontSize="16px" fontWeight="bold">
              {order.Users?.name ?? 'Todos'}
            </Text>
          </Box>

          <Box>
                <Text color="gray.500" fontSize="14px">Turno</Text>
                <Text fontSize="16px" fontWeight="bold">
              {order.assembly_schedule
                ? `${String(order.assembly_schedule).padStart(2, '0')}:00 a ${String(Number(order.assembly_schedule) + 2).padStart(2, '0')}:00`
                : '--:-- a --:--'
              }
            </Text>
          </Box>

          <Box>
            {order.state_id && order.state_id >= OrderStateEnum.FINISHED && (
              <>
                <Text color="gray.500" fontSize="14px">Posición de entrega</Text>
                <Text fontSize="16px" fontWeight="bold">
                  {order.positions ?? '-'}
                </Text>
              </>
            )}
          </Box>
        </HStack>

        <VStack align="center" justify="flex-end" flexDir="row" spacing={4}>
          {(statusColors || showIncompleteStatus) && (
            <Box
              px={3}
              py={1}
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDir="row"
              gap={2}
            >
              <InfoSvg 
                color={showIncompleteStatus ? Colors.warningYellow : (statusColors?.text ?? Colors.mainBlue)} 
                width={18} 
                height={18} 
              />
              <Text 
                fontSize="16px" 
                fontWeight="bold" 
                color={showIncompleteStatus ? Colors.warningYellow : (statusColors?.text ?? Colors.mainBlue)}
              >
                {showIncompleteStatus ? 'Incompleto' : statusText}
              </Text>
            </Box>
          )}
          <Button
            variant="ghost"
            color={Colors.mainBlue}
            onClick={(e) => {
              e.stopPropagation()
              onOrderDrawerOpen()
            }}
          >
            VER PEDIDO
          </Button>
        </VStack>
      </Flex>

      <OrderDrawer
        isOpen={isOrderDrawerOpen}
        onClose={onOrderDrawerClose}
        orderId={order.id}
      />
    </Box>
  )
}
