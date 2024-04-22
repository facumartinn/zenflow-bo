/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { Flex, Box, Avatar, HStack, Icon, Spacer, VStack, Button, Text, useDisclosure } from '@chakra-ui/react'
import { UserModal } from '../Modal'

export interface UserCardProps {
  id: number
  name: string
  code: string
  role: string
  device: string
  pickingSpeed: number
  speedTrend: string
}

export const UserCard = (user: { user: UserCardProps }) => {
  const { user: userData } = user
  const { isOpen, onOpen, onClose } = useDisclosure()
  const SpeedTrendIcon = userData.speedTrend === 'increasing' ? TriangleUpIcon : TriangleDownIcon
  const speedTrendColor = userData.speedTrend === 'increasing' ? 'green.500' : 'red.500'
  return (
    <Box
      p={4}
      my={4}
      bg="white"
      boxShadow="sm"
      borderRadius="lg"
      border={'1px solid #E2E8F0'}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      onClick={onOpen}
    >
      <Flex align="center">
        <Avatar size={'sm'} name={userData.name} src="path-to-image" />
        <HStack align="start" ml={4} spacing={8}>
          <Box>
            <Text fontSize="sm" color="gray.500">Nombre y apellido</Text>
            <Text fontSize="md" fontWeight="bold">{userData.name}</Text>
          </Box>

          <Box>
            <Text fontSize="sm" color="gray.500">Código</Text>
            <Text fontSize="md" fontWeight="bold">{userData.code}</Text>
          </Box>

          <Box>
            <Text fontSize="sm" color="gray.500">Rol</Text>
            <Text fontSize="md" fontWeight="bold">{userData.role}</Text>
          </Box>
          <Box>
            <Text fontSize="sm" color="gray.500">Dispositivo</Text>
            <Text fontSize="md" fontWeight="bold">{userData.device}</Text>
          </Box>
          <Box>
            <Text fontSize="sm" color="gray.500">Velocidad de picking</Text>
            <Flex align="center">
              <Text fontSize="md" fontWeight="bold">{userData.pickingSpeed} min</Text>
              <Icon as={SpeedTrendIcon} color={speedTrendColor} ml={1} />
            </Flex>
          </Box>
        </HStack>
      </Flex>

      <Spacer />

      <VStack align="end" ml={4} spacing={0}>
        <Button size="md" variant="ghost" colorScheme="blue">
          Editar
        </Button>
      </VStack>
      <UserModal isOpen={isOpen} onClose={onClose} userData={userData} isNewUser={false} />
    </Box>
  )
}
