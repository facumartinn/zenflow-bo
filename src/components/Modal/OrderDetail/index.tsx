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
  Select,
  Input,
  Box,
  Divider,
  Stack,
  Badge,
  Flex
} from '@chakra-ui/react'
import { useOrderDetail } from '@/src/hooks/useOrderDetails'
import ProductCard from './ProductCard'

export const OrderDrawer = ({ isOpen, onClose, orderId }: { isOpen: boolean, onClose: () => void, orderId: number }) => {
  const orderDetail = useOrderDetail(orderId)

  const createdAt = orderDetail?.[0]?.Orders?.created_at
    ? new Date(orderDetail[0].Orders.created_at).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
    : ''

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Flex flexDirection='column'>
            <Text color='#808081' fontSize={16}>Número de pedido</Text>
            <Text fontSize={32}>{orderId}</Text>
          </Flex>
        </DrawerHeader>

        <DrawerBody>
          <VStack spacing={4} align="stretch">
            <Box>
              <Text fontSize="sm" color="gray.600">Fecha de creación</Text>
              <Text fontSize="md">{createdAt}</Text>
            </Box>

            <Box>
              <Text fontSize="sm" color="gray.600">Asignado a</Text>
              {orderDetail?.[0]?.Orders?.user_id
                ? <Text>{orderDetail?.[0]?.Orders?.user_id}</Text>
                : <Select placeholder="Todos">
                  {/* Opciones del select */}
                </Select>
              }
            </Box>

            <Box>
              <Text fontSize="sm" color="gray.600">Entrega</Text>
              <Input placeholder="24F" />
            </Box>

            <Divider />

            <Stack direction="row" justify="space-between" align="center">
              <Text fontSize="2xl" fontWeight="bold">
                {orderDetail?.length ?? 0} artículos
              </Text>
              <Badge colorScheme="green">Listo para preparar</Badge>
            </Stack>

            {orderDetail?.map((article, index) => {
              return (
                <ProductCard
                  key={index}
                  productName={article.product_name}
                  productCode={article.product_barcode}
                  quantity={article.quantity}
                  quantityPicked={article.quantity_picked}
                  imageSrc={article.product_photo}
                  status={article.quantity_picked ? 'delivered' : undefined}
                  additionalInfo={article.quantity_picked ? `${article.quantity_picked}/${article.quantity}` : undefined}
                />
              )
            })}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
