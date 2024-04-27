/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  Checkbox,
  Grid,
  Text,
  Badge,
  IconButton,
  Box,
  ListItem,
  useDisclosure,
  Flex
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { styles } from './styles'
import { OrderDrawer } from '../Modal'
import { ORDER_STATES } from '@/src/app/(app)/(adentro)/orders/page'

interface OrderCardProps {
  orderNumber: number
  assignedTo?: string
  articlesCount: number
  deliveryStatus: string
  preparationStatus: number | undefined | null
  onSelect: (orderNumber: number) => void
  isChecked: boolean
}
// 'En preparación' | 'Listo para preparar' | 'Sin asignar'

export const ListCard = ({
  orderNumber,
  assignedTo,
  articlesCount,
  deliveryStatus,
  preparationStatus,
  onSelect,
  isChecked
}: OrderCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  // const [isChecked, setIsChecked] = useState(false) // Estado para manejar si está seleccionado
  const prepStatusColor = preparationStatus === 2 ? 'green' : 'blue'

  const status = ORDER_STATES?.find((state) => state.id === preparationStatus)
  console.log(ORDER_STATES)
  const handleCheckboxChange = (orderNumber: number) => {
    onSelect(orderNumber)
  }

  return (
    <ListItem>
      <Grid sx={styles.cardContainer}>
        <Grid sx={styles.cardContent}>
          <Checkbox
            _checked={{
              '& .chakra-checkbox__control': { background: '#2D41FC', borderColor: '#2D41FC' }
            }}
            colorScheme="brand"
            isChecked={isChecked}
            onChange={() => { handleCheckboxChange(orderNumber) }} // Manejar el cambio
          />
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
              <Text sx={styles.boldText}>{deliveryStatus}</Text>
            </Box>
            <Box onClick={onOpen} ml={12}>
              {status?.id !== 1 && (
                <Badge colorScheme={prepStatusColor} sx={styles.badge}>
                  {status?.description}
                </Badge>
              )}
            </Box>
          </Flex>
          <IconButton
            icon={<HamburgerIcon />}
            aria-label="Opciones"
            variant="ghost"
            sx={styles.iconButton}
          />
        </Grid>
      </Grid>
      <OrderDrawer isOpen={isOpen} onClose={onClose} orderId={orderNumber} />
    </ListItem>
  )
}
