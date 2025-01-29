import { Card, CardBody, CardHeader, Heading, Text } from '@chakra-ui/react'
import { type ReactNode } from 'react'

interface SectionProps {
  title: string
  description?: string
  children: ReactNode
}

export const SettingsSection = ({ title, description, children }: SectionProps): JSX.Element => {
  return (
    <Card variant="outline" bg="white" shadow="sm">
      <CardHeader pb={description ? 2 : 4}>
        <Heading size="md" color="gray.700">{title}</Heading>
        {description && (
          <Text mt={2} color="gray.600" fontSize="sm">
            {description}
          </Text>
        )}
      </CardHeader>
      <CardBody pt={description ? 2 : 4}>
        {children}
      </CardBody>
    </Card>
  )
}
