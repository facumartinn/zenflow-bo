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
import { type OrderDetail } from '@/src/types/order'
import ProductCard from './ProductCard'

export const OrderDrawer = ({ isOpen, onClose, orderId }: { isOpen: boolean, onClose: () => void, orderId: number }) => {
  const orderDetail = useOrderDetail(orderId)
  console.log(orderDetail?.[0]?.Orders)

  return (
      <>
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
                <Text fontSize="md">{orderDetail?.[0]?.Orders?.created_at?.toString()}</Text>
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
                <Text fontSize="2xl" fontWeight="bold">{orderDetail?.length} artículos</Text>
                <Badge colorScheme="green">Listo para preparar</Badge>
              </Stack>

              {/* Aquí se repite el Box para cada artículo en el pedido */}
              {orderDetail
                ? orderDetail.map((article: OrderDetail, index) => (
                  <ProductCard
                    key={index}
                    productName={article.product_name}
                    productCode={article.product_barcode}
                    quantity={article.quantity}
                    imageSrc={article?.product_photo}
                    replacementCode={article.product_barcode}
                    status={article.status}
                   />
                ))
                : null}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
