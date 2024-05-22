/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Stack, Skeleton } from '@chakra-ui/react'

export const SkeletonList = () => {
  return (
    <Stack mt={4}>
      <Skeleton height='100px' borderRadius='md' />
      <Skeleton height='100px' borderRadius='md' />
      <Skeleton height='100px' borderRadius='md' />
      <Skeleton height='100px' borderRadius='md' />
      <Skeleton height='100px' borderRadius='md' />
    </Stack>
  )
}
