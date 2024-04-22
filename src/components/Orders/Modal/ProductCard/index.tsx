import React from 'react'
import {
  Box,
  Badge,
  Image,
  Text,
  VStack,
  HStack,
  Tag
} from '@chakra-ui/react'

interface ProductCardProps {
  productName: string
  productCode: string
  quantity: number
  imageSrc?: string | null
  additionalInfo?: string
  status?: 'delivered' | 'replaced'
  replacementCode?: string
}

const ProductCard: React.FC<ProductCardProps> = ({
  productName,
  productCode,
  quantity,
  imageSrc,
  additionalInfo,
  status,
  replacementCode
}) => {
  return (
    <Box
      p={4}
      bg="white"
      boxShadow="sm"
      borderRadius="lg"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <VStack align="start" spacing={2}>
        <Text fontWeight="bold">{productName}</Text>
        <Text fontSize="sm">Código {productCode}</Text>
        {status === 'delivered' && (
          <Tag colorScheme="green" size="sm">
            Entregados {additionalInfo}
          </Tag>
        )}
        {status === 'replaced' && (
          <Text fontSize="sm" color="gray.500">Reemplazado por {replacementCode}</Text>
        )}
      </VStack>
      <HStack>
        {imageSrc && <Image boxSize="50px" borderRadius="md" src={imageSrc} alt={productName} />}
        <Badge colorScheme="blue" variant="subtle" borderRadius="full">
          {quantity}
        </Badge>
      </HStack>
    </Box>
  )
}

export default ProductCard
