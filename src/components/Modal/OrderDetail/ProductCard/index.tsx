import React from 'react'
import {
  Box,
  Badge,
  Image,
  Text,
  VStack,
  Tag,
  Flex
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
  console.log(productName, productCode, quantity, imageSrc, additionalInfo, status, replacementCode)
  return (
    <Box
      p={6}
      bg="#F6F6F6"
      boxShadow="sm"
      borderRadius="lg"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <VStack align="start" spacing={2}>
        <Text fontWeight="bold">{productName}</Text>
        <Flex alignItems='center'>
          <Text fontSize="sm" color="#808081" mr={2}>Código</Text>
          <Text fontSize="md">{productCode}</Text>
        </Flex>
        {status === 'delivered' && (
          <Tag colorScheme="green" size="sm">
            Entregados {additionalInfo}
          </Tag>
        )}
        {status === 'replaced' && (
          <Text fontSize="sm" color="gray.500">Reemplazado por {replacementCode}</Text>
        )}
      </VStack>
      <Box position="relative" display="inline-block">
      {imageSrc && (
        <Image
          boxSize="50px"
          borderRadius="md"
          src={imageSrc}
          alt={productName}
        />
      )}
      <Badge
        // colorScheme="blue"
        // variant="solid"
        bg="#2D41FC"
        color="white"
        borderRadius="8px 0 8px 0"
        px={2}
        py={1}
        // borderRadius="full"
        position="absolute"
        bottom="0"
        right="0"
        transform="translate(50%, 50%)"
      >
        {quantity}
      </Badge>
    </Box>
    </Box>
  )
}

export default ProductCard
