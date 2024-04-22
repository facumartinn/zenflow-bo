import { switchAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

// eslint-disable-next-line @typescript-eslint/unbound-method
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(switchAnatomy.keys)

const baseStyleTrack = defineStyle((props) => {
  const { colorScheme: c } = props

  return {
    bg: '#EAECEE',
    _checked: {
      bg: '#A0AAFF4D'
    },
    _dark: {
      bg: `${c}.900`,
      _checked: {
        bg: '#2D41FC'
      }
    }
  }
})

const baseStyle = definePartsStyle((props) => ({
  // define the part you're going to style
  container: {
    // ...
  },
  thumb: {
    bg: '#808081',
    _checked: {
      bg: '#2D41FC'
    },
    // let's also provide dark mode alternatives
    _dark: {
      bg: 'gray.900'
    }
  },
  track: baseStyleTrack(props)
}))

const boxy = definePartsStyle({
  track: {
    borderRadius: 'sm',
    p: 1
  }
})

export const switchTheme = defineMultiStyleConfig({ baseStyle, variants: { boxy } })
