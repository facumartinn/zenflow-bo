/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Order } from '@/src/types/order'
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Text,
  Flex,
  Button,
  Box,
  Checkbox,
  useDisclosure
} from '@chakra-ui/react'
import { MdOutlineEditCalendar } from 'react-icons/md'
import { useEffect, useState } from 'react'
import { MountOrdersModal } from './MountOrders'
import { useOrderStats } from '@/src/hooks/useOrderStats'

function getFormattedDay (date?: string): string {
  const day = date ? new Date(date) : new Date()
  const yyyy = day.getUTCFullYear()
  let mm: any = day.getUTCMonth() + 1 // Months start at 0!
  let dd: any = day.getUTCDate()
  mm = mm.toString().padStart(2, '0') // Add leading zero if needed
  dd = dd.toString().padStart(2, '0') // Add leading zero if needed
  return `${yyyy}/${mm}/${dd}`
}

interface ExpiredOrdersDrawerProps {
  warehouseConfig: any
  assignOrders: any
  isOpen: boolean
  onClose: () => void
  orders: Order[]
}

export const ExpiredOrdersDrawer = ({ warehouseConfig, assignOrders, isOpen, onClose, orders }: ExpiredOrdersDrawerProps) => {
  const [selectedOrders, setSelectedOrders] = useState<number[]>([])
  const { refetch: refetchStats } = useOrderStats()
  const { isOpen: isMountModalOpen, onOpen: onMountModalOpen, onClose: onMountModalClose } = useDisclosure()

  useEffect(() => {
    const initializeTab = async () => {
      try {
        await refetchStats()
      } catch (error) {
        console.error('Failed to refetch stats:', error)
      }
    }
    void initializeTab()
  }, [isOpen, onClose])

  const handleSelectOrder = (orderId: number) => {
    setSelectedOrders((prevSelected) => {
      if (prevSelected.includes(orderId)) {
        return prevSelected.filter(id => id !== orderId)
      } else {
        return [...prevSelected, orderId]
      }
    })
  }

  const handleSelectAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(orders.map(order => order.id))
    }
  }

  const handleReprogram = async () => {
    onMountModalOpen()
    await refetchStats()
  }

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Flex flexDirection='column'>
              <Text fontWeight='bold' fontSize={32}>Pedidos atrasados</Text>
              <Flex justifyContent="space-between" alignItems="center" mt={4}>
                <Button
                  leftIcon={<MdOutlineEditCalendar size={32} />}
                  onClick={handleReprogram}
                  isDisabled={selectedOrders.length === 0}
                  bg='#2D41FC'
                  color='white'
                  borderRadius='full'
                  border='2px solid #2D41FC'
                  px={8}
                  py={7}
                  w={200}
                  _hover={{ bg: 'white', color: '#2D41FC', border: '2px solid #2D41FC' }}
                >
                  REPROGRAMAR
                </Button>
                <Button
                  onClick={handleSelectAll}
                  variant="ghost"
                  color="#2D41FC"
                  fontSize={16}
                >
                  {selectedOrders.length === orders?.length ? 'DESELECCIONAR TODOS' : 'SELECCIONAR TODOS'}
                </Button>
              </Flex>
            </Flex>
          </DrawerHeader>

          <DrawerBody>
            <VStack spacing={4} align="stretch">
              {orders?.map((order: Order) => (
                <Flex
                  key={order.id}
                  p={8}
                  height={90}
                  borderWidth={1}
                  borderRadius="md"
                  justifyContent="start"
                  alignItems="center"
                >
                  <Flex>
                    <Checkbox
                      isChecked={selectedOrders.includes(order.id)}
                      onChange={() => { handleSelectOrder(order.id) }}
                    />
                    <Box ml={8}>
                      <Text color='#808081' fontSize={14}>Número de pedido</Text>
                      <Text fontSize={16} fontWeight='bold'>{order.id}</Text>
                    </Box>
                  </Flex>
                  <Box ml={8}>
                    <Text color='#808081' fontSize={14}>Fecha</Text>
                    <Text fontSize={16} fontWeight='bold'>{getFormattedDay(order?.assembly_date?.toString())}</Text>
                  </Box>
                </Flex>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <MountOrdersModal
        title='Reprogramar'
        buttonLabel='REPROGRAMAR'
        warehouseConfig={warehouseConfig}
        selectedOrders={selectedOrders}
        assignOrders={assignOrders}
        isOpen={isMountModalOpen}
        onExpiredModalClose={onClose}
        onClose={onMountModalClose}
      />
    </>
  )
}
