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
  Skeleton,
  SkeletonText
} from '@chakra-ui/react'
import { type FC } from 'react'

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

interface OrderDrawerSkeletonProps {
  isOpen: boolean
  onClose: () => void
}

export const OrderDrawerSkeleton: FC<OrderDrawerSkeletonProps> = ({ isOpen, onClose }) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader p={6}>
          <VStack align="flex-start" spacing={1}>
            <Text color="#6C757D" fontSize="14px">Número de pedido</Text>
            <Skeleton height="12" width="200px" />
          </VStack>
        </DrawerHeader>

        <DrawerBody px={6} pt={0}>
          <Grid templateColumns="1fr 1fr" gap={6} mb={8}>
            <GridItem>
              <Text color="#6C757D" fontSize="14px" mb={1}>Día</Text>
              <Skeleton height="6" width="120px" />
            </GridItem>
            <GridItem>
              <Text color="#6C757D" fontSize="14px" mb={1}>Turno</Text>
              <Skeleton height="6" width="120px" />
            </GridItem>
            <GridItem>
              <Text color="#6C757D" fontSize="14px" mb={1}>Picker</Text>
              <Skeleton height="6" width="120px" />
            </GridItem>
            <GridItem>
              <Text color="#6C757D" fontSize="14px" mb={1}>Cantidad</Text>
              <Skeleton height="6" width="120px" />
            </GridItem>
          </Grid>

          <Flex justifyContent="center" mb={8}>
            <Skeleton height="10" width="120px" borderRadius="full" />
          </Flex>

          <Box>
            <Text fontSize="16px" fontWeight="600" mb={4}>Detalle del pedido</Text>
            <VStack spacing={4} align="stretch">
              {[...Array(3)].map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </VStack>
          </Box>

          <Flex justifyContent="center" mt={8} mb={4}>
            <Skeleton height="10" width="100%" borderRadius="full" />
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
