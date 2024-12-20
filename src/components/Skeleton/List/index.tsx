/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Stack, Skeleton, useColorMode } from '@chakra-ui/react'

export const SkeletonList = () => {
  const { colorMode } = useColorMode()

  return (
    <Stack mt={4}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton
          key={i}
          height="100px"
          borderRadius="md"
          startColor={colorMode === 'dark' ? 'gray.700' : 'gray.50'}
          endColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
        />
      ))}
    </Stack>
  )
}
