/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IconButton, useColorMode } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

export const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <IconButton
      aria-label="Toggle color mode"
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
      variant="ghost"
      color={colorMode === 'light' ? 'gray.600' : 'yellow.200'}
      _hover={{
        bg: colorMode === 'light' ? 'gray.100' : 'whiteAlpha.200'
      }}
    />
  )
}
