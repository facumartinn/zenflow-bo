/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import { Box, Text, Heading } from '@chakra-ui/react'

interface DynamicChakraContentProps {
  content: string
}

export const DynamicChakraContent: React.FC<DynamicChakraContentProps> = ({ content }) => {
  const renderChakraComponent = (componentString: string) => {
    // This is a simple parser and should be enhanced for production use
    const componentType = componentString.match(/<(\w+)/)?.[1]
    const props = Object.fromEntries(
      Array.from(componentString.matchAll(/(\w+)=["'](.+?)["']/g)).map(([, key, value]) => [key, value])
    )

    switch (componentType) {
      case 'Box':
        return <Box {...props}>{renderChildren(componentString)}</Box>
      case 'Text':
        return <Text {...props}>{renderChildren(componentString)}</Text>
      case 'Heading':
        return <Heading {...props}>{renderChildren(componentString)}</Heading>
      default:
        return null
    }
  }

  const renderChildren = (componentString: string) => {
    const childrenMatch = componentString.match(/>([^<]+)</)
    if (childrenMatch) {
      const childrenString = childrenMatch[1]
      const childComponents = childrenString.match(/<.+?>.*?<\/.+?>/g) || []
      return childComponents.map((child, index) => (
        <React.Fragment key={index}>
          {renderChakraComponent(child)}
        </React.Fragment>
      ))
    }
    return componentString.replace(/<.*?>([\s\S]*?)<\/.*?>/, '$1')
  }

  return <>{renderChakraComponent(content)}</>
}
