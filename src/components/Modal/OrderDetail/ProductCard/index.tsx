import React from 'react'
import {
  Box,
  Badge,
  Image,
  Text,
  VStack,
  Tag,
  Flex,
  useColorModeValue
} from '@chakra-ui/react'

interface ProductCardProps {
  productName: string
  productCode: string
  quantity: number
  quantityPicked?: number | null
  imageSrc?: string | null
  additionalInfo?: string
  status?: 'delivered' | 'replaced'
  replacementCode?: string
}

const ProductCard: React.FC<ProductCardProps> = ({
  productName,
  productCode,
  quantity,
  quantityPicked,
  imageSrc,
  additionalInfo,
  status,
  replacementCode
}) => {
  const bgColor = useColorModeValue('#F6F6F6', '#1A202C')
  const shadowColor = useColorModeValue('sm', 'md')
  const textColor = useColorModeValue('#808081', '#FFFFFF')
  const badgeColor = useColorModeValue('#2D41FC', '#FFFFFF')
  const tagColor = useColorModeValue('green', 'red')

  return (
    <Box
      p={6}
      bg={bgColor}
      boxShadow={shadowColor}
      borderRadius="lg"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <VStack align="start" spacing={2}>
        <Text fontWeight="bold">{productName}</Text>
        <Flex alignItems='center'>
          <Text fontSize="sm" color={textColor} mr={2}>Código</Text>
          <Text fontSize="md">{productCode}</Text>
        </Flex>
        {status === 'delivered' && (
          <Tag colorScheme={tagColor} size="sm">
            Recogidos: {additionalInfo}
          </Tag>
        )}
        {status === 'replaced' && (
          <Text fontSize="sm" color={textColor}>Reemplazado por {replacementCode}</Text>
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
        bg={badgeColor}
        color={useColorModeValue('#FFFFFF', '#000000')}
        borderRadius="8px 0 8px 0"
        px={2}
        py={1}
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
