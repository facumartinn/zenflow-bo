/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  Checkbox,
  Grid,
  Text,
  Badge,
  IconButton,
  Box,
  ListItem,
  useDisclosure
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { styles } from './styles'
import { OrderDrawer } from '../Modal'

interface OrderCardProps {
  orderNumber: number
  assignedTo?: string
  articlesCount: number
  deliveryStatus: string
  preparationStatus: 'En preparación' | 'Listo para preparar' | 'Sin asignar'
  onSelect: (orderNumber: number) => void
  isChecked: boolean
}

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
  const prepStatusColor = preparationStatus === 'En preparación' ? 'green' : 'blue'

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
          <Box onClick={onOpen}>
            <Text sx={styles.label}>Entrega</Text>
            <Text sx={styles.boldText}>{deliveryStatus}</Text>
          </Box>
          <Box onClick={onOpen}>
            <Badge colorScheme={prepStatusColor} sx={styles.badge}>
              {preparationStatus}
            </Badge>
          </Box>
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
