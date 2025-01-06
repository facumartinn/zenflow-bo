import { Box, Text, VStack } from '@chakra-ui/react'
import { OrdersSvg } from '../svg/sidebarSvg'

interface EmptyStateProps {
  message: string
}

export const EmptyState = ({ message }: EmptyStateProps): JSX.Element => {
  return (
    <VStack
      spacing={4}
      justify="center"
      align="center"
      h="full"
      minH="400px"
      w="full"
    >
      <Box>
        <OrdersSvg color="#4F5457" width={60} height={60} />
      </Box>
      <Text
        color="#4F5457"
        fontSize="24px"
        fontWeight="regular"
        textAlign="center"
      >
        {message}
      </Text>
    </VStack>
  )
}
