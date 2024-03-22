/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Button } from '@chakra-ui/react'
import { styles } from './styles'

export const DefaultButton = ({ type = 'primary', label }: { type: string, label: string }) => {
  return (
    <Button style={styles[type]} _active={styles[type].onPress}>{label}</Button>
  )
}
