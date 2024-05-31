/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Box, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'

export const MultiPickingPacking = () => {
  return (
    <Box mt={4}>
      <Text fontSize={14}>Volumen del cajón</Text>
      <InputGroup w='150px'>
        <Input placeholder='150' onChange={() => { console.log('first') }} />
        <InputRightElement>
          <Text fontSize={14} fontWeight='bold' pr={2}>cm3</Text>
        </InputRightElement>
      </InputGroup>
    </Box>
  )
}
