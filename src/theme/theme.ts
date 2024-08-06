import { extendTheme } from '@chakra-ui/react'
import { switchTheme } from './components/Switch'

export const theme = extendTheme({
  components: {
    Switch: switchTheme
  }
})
