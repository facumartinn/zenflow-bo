/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { VStack, Divider, Flex, Text, Avatar, Button } from '@chakra-ui/react'

export const AccountSettings = () => {
  return (
    <VStack divider={<Divider />} spacing={2} align={'start'} overflow='scroll'>
      <Flex flexDirection='column'>
        <Avatar />
        <Button variant="link" color='#2D41FC' mt={4} fontWeight='normal'>Editar</Button>
      </Flex>
      <Flex flexDirection='column' alignItems='flex-start'>
        <Text fontSize={18} fontWeight='bold'>Nombre empresa</Text>
        <Text my={2}>Unilever</Text>
        <Button variant="link" color='#2D41FC' fontWeight='normal'>Cambiar nombre</Button>
      </Flex>
      <Flex flexDirection='column' alignItems='flex-start'>
        <Text my={2} fontSize={18} fontWeight='bold'>Email</Text>
        <Text>hergoadmin@gmail.com</Text>
      </Flex>
      <Flex flexDirection='column' alignItems='flex-start'>
        <Text my={2} fontSize={18} fontWeight='bold'>Contraseña</Text>
        <Button variant="link" color='#2D41FC' fontWeight='normal'>Cambiar contraseña</Button>
      </Flex>
    </VStack>
  )
}
