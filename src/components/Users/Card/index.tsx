/* eslint-disable @typescript-eslint/explicit-function-return-type */
// UserCard.tsx
import { Box, Flex, Avatar, HStack, Icon, Spacer, VStack, Button, Text, useDisclosure } from '@chakra-ui/react'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { UserModal } from '../../Modal/Users/UserModal'
// import { EditUserModal } from '../Modal/EditUser'
import { userCardStyles } from './styles'
import { USER_ROLES } from '@/src/types/user'

export interface UserCardProps {
  id: number
  name: string
  barcode: number
  role_id: number
  device: string
  user_email: string
  password: string
  pickingSpeed: number
  speedTrend: 'increasing' | 'decreasing'
}

export const UserCard = ({ user }: { user: UserCardProps }) => {
  const { isOpen: isEditUserModalOpen, onOpen: onEditUserModalOpen, onClose: onEditUserModalClose } = useDisclosure()
  const SpeedTrendIcon = user.speedTrend === 'increasing' ? TriangleUpIcon : TriangleDownIcon
  const speedTrendColor = userCardStyles.speedIconColor(user.speedTrend)
  const findRole = (roleId: number) => USER_ROLES.find((role) => role.id === roleId)?.description

  return (
    <Box style={userCardStyles.container} onClick={() => { console.log('User Card clicked') }}>
      <Flex align="center">
        <Avatar size={userCardStyles.avatar.size} name={user.name} src="/path-to-image" />
        <HStack align="start" ml={4} spacing={6}>
          <Box w="200px">
            <Text style={userCardStyles.infoText}>Nombre y apellido</Text>
            <Text style={userCardStyles.nameText}>{user.name}</Text>
          </Box>

          <Box>
            <Text style={userCardStyles.infoText}>Código</Text>
            <Text style={userCardStyles.nameText}>{user.barcode}</Text>
          </Box>

          <Box>
            <Text style={userCardStyles.infoText}>Rol</Text>
            <Text style={userCardStyles.nameText}>{findRole(user.role_id)}</Text>
          </Box>
          <Box>
            <Text style={userCardStyles.infoText}>Dispositivo</Text>
            <Text style={userCardStyles.nameText}>{user.device}12394889213</Text>
          </Box>
          <Box>
            <Text style={userCardStyles.infoText}>Velocidad de picking</Text>
            <Flex align="center">
              <Text style={userCardStyles.speedIndicator}>{user.pickingSpeed}55 min</Text>
              <Icon as={SpeedTrendIcon} color={speedTrendColor} style={userCardStyles.speedIcon} />
            </Flex>
          </Box>
        </HStack>
      </Flex>

      <Spacer />

      <VStack align="end" ml={4} spacing={0}>
        <Button size={userCardStyles.button.size} sx={userCardStyles.button.style} variant="none" colorScheme={userCardStyles.button.colorScheme} onClick={onEditUserModalOpen}>
          Editar
        </Button>
      </VStack>
      <UserModal isOpen={isEditUserModalOpen} onClose={onEditUserModalClose} userData={user} isNewUser={false} />
      {/* <EditUserModal isOpen={false} onClose={() => { console.log('Modal closed') }} userData={user} isNewUser={false} /> */}
    </Box>
  )
}
