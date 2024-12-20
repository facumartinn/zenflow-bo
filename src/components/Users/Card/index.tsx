/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import { Box, Flex, Avatar, HStack, Icon, Spacer, VStack, Button, Text, useDisclosure, useColorMode } from '@chakra-ui/react'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { UserModal } from '../../Modal/Users/UserModal'
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
  tenant_id: number
  warehouse_id: number
}

export const UserCard = ({ user }: { user: UserCardProps }) => {
  const { isOpen: isEditUserModalOpen, onOpen: onEditUserModalOpen, onClose: onEditUserModalClose } = useDisclosure()
  const SpeedTrendIcon = user.speedTrend === 'increasing' ? TriangleUpIcon : TriangleDownIcon
  const speedTrendColor = userCardStyles.speedIconColor(user.speedTrend)
  const findRole = (roleId: number) => USER_ROLES.find((role) => role.id === roleId)?.description
  const { colorMode } = useColorMode()

  return (
    <Box
      style={{
        ...userCardStyles.container,
        background: colorMode === 'dark' ? 'darkMode.bg.secondary' : 'white',
        borderColor: colorMode === 'dark' ? 'darkMode.border.primary' : '#E2E8F0'
      }}
      onClick={() => { console.log('User Card clicked') }}
    >
      <Flex align="center">
        <Avatar size={userCardStyles.avatar.size} name={user.name} src="/path-to-image" />
        <HStack align="start" ml={4} spacing={6}>
          <Box w="200px">
            <Text
              style={userCardStyles.infoText}
              color={colorMode === 'dark' ? 'darkMode.text.tertiary' : 'gray.500'}
            >
              Nombre y apellido
            </Text>
            <Text
              style={userCardStyles.nameText}
              color={colorMode === 'dark' ? 'darkMode.text.primary' : 'inherit'}
            >
              {user.name}
            </Text>
          </Box>

          <Box>
            <Text
              style={userCardStyles.infoText}
              color={colorMode === 'dark' ? 'darkMode.text.tertiary' : 'gray.500'}
            >
              Código
            </Text>
            <Text
              style={userCardStyles.nameText}
              color={colorMode === 'dark' ? 'darkMode.text.primary' : 'inherit'}
            >
              {user.barcode}
            </Text>
          </Box>

          <Box>
            <Text
              style={userCardStyles.infoText}
              color={colorMode === 'dark' ? 'darkMode.text.tertiary' : 'gray.500'}
            >
              Rol
            </Text>
            <Text
              style={userCardStyles.nameText}
              color={colorMode === 'dark' ? 'darkMode.text.primary' : 'inherit'}
            >
              {findRole(user.role_id)}
            </Text>
          </Box>
          <Box>
            <Text
              style={userCardStyles.infoText}
              color={colorMode === 'dark' ? 'darkMode.text.tertiary' : 'gray.500'}
            >
              Dispositivo
            </Text>
            <Text
              style={userCardStyles.nameText}
              color={colorMode === 'dark' ? 'darkMode.text.primary' : 'inherit'}
            >
              {user.device}12394889213
            </Text>
          </Box>
          <Box>
            <Text
              style={userCardStyles.infoText}
              color={colorMode === 'dark' ? 'darkMode.text.tertiary' : 'gray.500'}
            >
              Velocidad de picking
            </Text>
            <Flex align="center">
              <Text
                style={userCardStyles.speedIndicator}
                color={colorMode === 'dark' ? 'darkMode.text.primary' : 'inherit'}
              >
                {user.pickingSpeed}55 min
              </Text>
              <Icon as={SpeedTrendIcon} color={speedTrendColor} style={userCardStyles.speedIcon} />
            </Flex>
          </Box>
        </HStack>
      </Flex>

      <Spacer />

      <VStack align="end" ml={4} spacing={0}>
        <Button
          size={userCardStyles.button.size}
          sx={userCardStyles.button.style}
          variant="none"
          colorScheme={userCardStyles.button.colorScheme}
          onClick={onEditUserModalOpen}
          color={colorMode === 'dark' ? 'brand.200' : 'brand.500'}
          _hover={{
            color: colorMode === 'dark' ? 'brand.100' : 'brand.600'
          }}
        >
          Editar
        </Button>
      </VStack>
      <UserModal isOpen={isEditUserModalOpen} onClose={onEditUserModalClose} userData={user} isNewUser={false} />
    </Box>
  )
}
