/* eslint-disable @typescript-eslint/explicit-function-return-type */
// SubscriptionSettings.tsx
import { VStack, Flex, Text, Avatar, Button, Divider } from '@chakra-ui/react'
import { subscriptionSettingsStyles } from './styles' // Asegúrate que la ruta sea correcta

export const SubscriptionSettings = () => {
  return (
    <VStack divider={<Divider />} sx={subscriptionSettingsStyles.container}>
      <Flex sx={subscriptionSettingsStyles.section}>
        <Avatar />
        <Button sx={subscriptionSettingsStyles.linkButton}>Editar</Button>
      </Flex>
      <Flex sx={subscriptionSettingsStyles.section}>
        <Text sx={subscriptionSettingsStyles.text}>Nombre empresa</Text>
        <Text my={2}>Unilever</Text>
        <Button sx={subscriptionSettingsStyles.linkButton}>Cambiar nombre</Button>
      </Flex>
      <Flex sx={subscriptionSettingsStyles.section}>
        <Text sx={subscriptionSettingsStyles.text}>Email</Text>
        <Text>hergoadmin@gmail.com</Text>
      </Flex>
      <Flex sx={subscriptionSettingsStyles.section}>
        <Text sx={subscriptionSettingsStyles.text}>Contraseña</Text>
        <Button sx={subscriptionSettingsStyles.linkButton}>Cambiar contraseña</Button>
      </Flex>
    </VStack>
  )
}
