import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { switchTheme } from './components/Switch'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true
}

const colors = {
  brand: {
    50: '#E8E9FF',
    100: '#A0AAFF',
    200: '#7C89FF',
    300: '#5868FF',
    400: '#2D41FC',
    500: '#2D41FC', // Primary brand color
    600: '#1E2DB3',
    700: '#162185',
    800: '#0F1657',
    900: '#070B2B'
  },
  darkMode: {
    bg: {
      primary: '#1A202C',
      secondary: '#2D3748',
      tertiary: '#4A5568'
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#CBD5E0',
      tertiary: '#A0AEC0'
    },
    border: {
      primary: '#2D3748',
      secondary: '#4A5568'
    }
  }
}

const styles = {
  global: (props: { colorMode: 'light' | 'dark' }) => ({
    body: {
      bg: props.colorMode === 'dark' ? 'darkMode.bg.primary' : 'gray.50',
      color: props.colorMode === 'dark' ? 'darkMode.text.primary' : 'gray.800'
    }
  })
}

const components = {
  Switch: switchTheme,
  Card: {
    baseStyle: (props: { colorMode: 'light' | 'dark' }) => ({
      container: {
        bg: props.colorMode === 'dark' ? 'darkMode.bg.secondary' : 'white',
        borderColor: props.colorMode === 'dark' ? 'darkMode.border.primary' : 'gray.200'
      }
    })
  },
  Button: {
    variants: {
      primary: (props: { colorMode: 'light' | 'dark' }) => ({
        bg: 'brand.500',
        color: 'white',
        _hover: {
          bg: 'brand.600',
          _disabled: {
            bg: 'brand.500'
          }
        }
      }),
      secondary: (props: { colorMode: 'light' | 'dark' }) => ({
        bg: 'transparent',
        border: '2px solid',
        borderColor: 'brand.500',
        color: 'brand.500',
        _hover: {
          bg: 'brand.50'
        }
      })
    }
  }
}

export const theme = extendTheme({
  config,
  colors,
  styles,
  components
})
