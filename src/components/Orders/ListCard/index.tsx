/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  Checkbox,
  Grid,
  Text,
  Badge,
  IconButton,
  Box,
  ListItem
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { styles } from './styles' // Import styles

interface OrderCardProps {
  orderNumber: number
  assignedTo: string
  articlesCount: number
  deliveryStatus: string
  preparationStatus: 'En preparación' | 'Listo para preparar' | 'Sin asignar'
}

export const ListCard = ({
  orderNumber,
  assignedTo,
  articlesCount,
  deliveryStatus,
  preparationStatus
}: OrderCardProps) => {
  const prepStatusColor = preparationStatus === 'En preparación' ? 'green' : 'blue'

  return (
    <ListItem>
      <Grid sx={styles.cardContainer}>
        <Grid sx={styles.cardContent}>
        <Checkbox colorScheme="blue" />
          <Box>
            <Text sx={styles.label}>Número de pedido</Text>
            <Text sx={styles.boldText}>{orderNumber}</Text>
          </Box>
          <Box>
            <Text sx={styles.label}>Asignado a</Text>
            <Text sx={styles.boldText}>{assignedTo}</Text>
          </Box>
          <Box>
            <Text sx={styles.label}>Artículos</Text>
            <Text sx={styles.boldText}>{articlesCount}</Text>
          </Box>
          <Box>
            <Text sx={styles.label}>Entrega</Text>
            <Text sx={styles.boldText}>{deliveryStatus}</Text>
          </Box>
          <Box>
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
    </ListItem>
  )
}
