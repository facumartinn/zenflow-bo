/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Flex, Text } from '@chakra-ui/react'
import { BiCheckCircle, BiErrorCircle } from 'react-icons/bi'
import { ToastStyles } from './styles'

interface ToastMessageProps {
  title: string
  description?: string
  status: string
}

export const ToastMessage = ({ title, description, status }: ToastMessageProps) => {
  const { container, icon, titleText, descriptionText } = ToastStyles
  return (
    <Flex sx={container} bg={'white'}>
      {status === 'success'
        ? <BiCheckCircle style={icon.success} />
        : <BiErrorCircle style={icon.error} />
      }
      <Flex flexDirection='column'>
        <Text sx={titleText}>{title}</Text>
        {description && <Text sx={descriptionText}>{description}</Text>}
      </Flex>
    </Flex>
  )
}
