/* eslint-disable @typescript-eslint/explicit-function-return-type */
// UserCard.tsx
import { Box, Flex, Avatar, HStack, Icon, Spacer, VStack, Button, Text } from '@chakra-ui/react'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { UserModal } from '../Modal'
import { userCardStyles } from './styles'

export interface UserCardProps {
  id: number
  name: string
  code: string
  role: string
  device: string
  pickingSpeed: number
  speedTrend: 'increasing' | 'decreasing'
}

export const UserCard = ({ user }: { user: UserCardProps }) => {
  const SpeedTrendIcon = user.speedTrend === 'increasing' ? TriangleUpIcon : TriangleDownIcon
  const speedTrendColor = userCardStyles.speedIconColor(user.speedTrend)

  return (
    <Box style={userCardStyles.container} onClick={() => { console.log('User Card clicked') }}>
      <Flex align="center">
        <Avatar size={userCardStyles.avatar.size} name={user.name} src="/path-to-image" />
        <HStack align="start" ml={4} spacing={8}>
          <Box>
            <Text style={userCardStyles.infoText}>Nombre y apellido</Text>
            <Text style={userCardStyles.nameText}>{user.name}</Text>
          </Box>

          <Box>
            <Text style={userCardStyles.infoText}>Código</Text>
            <Text style={userCardStyles.nameText}>{user.code}</Text>
          </Box>

          <Box>
            <Text style={userCardStyles.infoText}>Rol</Text>
            <Text style={userCardStyles.nameText}>{user.role}</Text>
          </Box>
          <Box>
            <Text style={userCardStyles.infoText}>Dispositivo</Text>
            <Text style={userCardStyles.nameText}>{user.device}</Text>
          </Box>
          <Box>
            <Text style={userCardStyles.infoText}>Velocidad de picking</Text>
            <Flex align="center">
              <Text style={userCardStyles.speedIndicator}>{user.pickingSpeed} min</Text>
              <Icon as={SpeedTrendIcon} color={speedTrendColor} style={userCardStyles.speedIcon} />
            </Flex>
          </Box>
        </HStack>
      </Flex>

      <Spacer />

      <VStack align="end" ml={4} spacing={0}>
        <Button size={userCardStyles.button.size} variant={userCardStyles.button.variant} colorScheme={userCardStyles.button.colorScheme}>
          Editar
        </Button>
      </VStack>
      <UserModal isOpen={false} onClose={() => { console.log('Modal closed') }} userData={user} isNewUser={false} />
    </Box>
  )
}
