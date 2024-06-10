/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Flex, Text } from '@chakra-ui/react'
import { BiCheckCircle, BiErrorCircle } from 'react-icons/bi'
import { ToastStyles } from './styles'

type ToastStatus = 'success' | 'error' | 'warning'
interface ToastMessageProps {
  title: string
  description?: string
  status: ToastStatus
  onClick?: () => void
}
const toastBg = (status: ToastStatus) => {
  switch (status) {
    case 'success':
      return '#3EBC59'
    case 'error':
      return '#EC0000'
    case 'warning':
      return '#DEAE34'
    default:
      return '#3EBC59'
  }
}

export const ToastMessage = ({ title, description, status, onClick }: ToastMessageProps) => {
  const { container, icon, titleText, descriptionText } = ToastStyles
  return (
    <Flex sx={container} bg={toastBg(status)} onClick={onClick} _hover={{ cursor: 'pointer' }}>
      {status === 'success'
        ? <BiCheckCircle style={icon} />
        : <BiErrorCircle style={icon} />
      }
      <Flex flexDirection='column'>
        <Text sx={titleText}>{title}</Text>
        {description && <Text sx={descriptionText}>{description}</Text>}
      </Flex>
    </Flex>
  )
}
