/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Grid,
  GridItem,
  Box,
  Flex,
  Text,
  Input,
  Button,
  Avatar,
  VStack,
  IconButton,
  useToast
} from '@chakra-ui/react'
import { Header } from '@/src/components/Header'
import { ChatIcon, CloseIcon } from '@chakra-ui/icons'

interface Message {
  id: number
  content: string
  sender: 'user' | 'bot'
  isTyping?: boolean
  isHtml?: boolean
}

const getAIResponse = async (query: string): Promise<string> => {
  try {
    const response = await fetch(`http://localhost:8000/search/?query=${encodeURIComponent(query)}`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data.results || 'Lo siento, no pude generar una respuesta.'
  } catch (error) {
    console.error('Error fetching AI response:', error)
    throw error
  }
}

const ChatbotPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, content: 'Hola, soy Flowy. ¿En qué puedo ayudarte hoy?', sender: 'bot' }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const toast = useToast()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const simulateTyping = (text: string, messageId: number, isHtml: boolean) => {
    let i = 0
    const typingInterval = setInterval(() => {
      setMessages(prevMessages =>
        prevMessages.map(msg =>
          msg.id === messageId
            ? { ...msg, content: text.slice(0, i), isTyping: i < text.length, isHtml }
            : msg
        )
      )
      i += 5 // Incrementar por 5 caracteres para un tipeo más rápido
      if (i > text.length) {
        clearInterval(typingInterval)
      }
    }, 10) // Reducido a 10ms para un tipeo más rápido
  }

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== '') {
      const newUserMessage: Message = {
        id: messages.length + 1,
        content: inputMessage,
        sender: 'user'
      }
      setMessages(prevMessages => [...prevMessages, newUserMessage])
      setInputMessage('')
      setIsLoading(true)

      // Agregar mensaje de "pensando" inmediatamente
      const thinkingMessage: Message = {
        id: messages.length + 2,
        content: 'El agente está pensando la respuesta...',
        sender: 'bot',
        isTyping: true
      }
      setMessages(prevMessages => [...prevMessages, thinkingMessage])

      try {
        const aiResponse = await getAIResponse(inputMessage)
        const isHtml = true
        // Reemplazar el mensaje de "pensando" con la respuesta real
        setMessages(prevMessages =>
          prevMessages.map(msg =>
            msg.id === thinkingMessage.id
              ? { ...msg, content: '', isTyping: true, isHtml }
              : msg
          )
        )
        simulateTyping(aiResponse, thinkingMessage.id, isHtml)
      } catch (error) {
        console.error('Error al obtener respuesta de IA:', error)
        toast({
          title: 'Error',
          description: 'No se pudo obtener una respuesta. Por favor, intenta de nuevo más tarde.',
          status: 'error',
          duration: 5000,
          isClosable: true
        })
        // Reemplazar el mensaje de "pensando" con un mensaje de error
        setMessages(prevMessages =>
          prevMessages.map(msg =>
            msg.id === thinkingMessage.id
              ? { ...msg, content: 'Lo siento, hubo un error al procesar tu solicitud. Por favor, intenta de nuevo más tarde.', isTyping: false }
              : msg
          )
        )
      } finally {
        setIsLoading(false)
      }
    }
  }

  const toggleChat = () => { setIsChatOpen(!isChatOpen) }

  return (
    <Grid
      h="100%"
      templateAreas={`"header"
                      "main"`}
      gridTemplateRows={'auto 1fr'}
      gridTemplateColumns={'1fr'}
    >
      <GridItem area="header" p={4}>
        <Header title="Flowy" showButton={false} />
      </GridItem>
      <GridItem area="main" position="relative" overflow="hidden">
        {isChatOpen
          ? (
          <Flex direction="column" h="100%" bg="white">
            <VStack flex={1} overflowY="auto" p={4} alignItems="stretch" spacing={4}>
              {messages.map((message) => (
                <Flex key={message.id} justifyContent={message.sender === 'user' ? 'flex-end' : 'flex-start'}>
                  {message.sender === 'bot' && (
                    <Avatar size="sm" name="AI Bot" src="/placeholder-avatar.jpg" mr={2} />
                  )}
                  <Box
                    maxW="70%"
                    paddingLeft={30}
                    paddingRight={30}
                    paddingTop={4}
                    paddingBottom={4}
                    borderRadius="lg"
                    bg={message.sender === 'user' ? 'blue.500' : 'gray.100'}
                    color={message.sender === 'user' ? 'white' : 'black'}
                  >
                    <div dangerouslySetInnerHTML={{ __html: message.content }} />
                    {message.isTyping && (
                      <Text as="span" animation="blink 0.7s infinite">▋</Text>
                    )}
                  </Box>
                  {message.sender === 'user' && (
                    <Avatar size="sm" name="User" src="/placeholder-user.jpg" ml={2} />
                  )}
                </Flex>
              ))}
              <div ref={messagesEndRef} />
            </VStack>
            <Box borderTop="1px" borderColor="gray.200" p={4}>
              <form onSubmit={(e) => {
                e.preventDefault()
                void handleSendMessage()
              }}>
                <Flex>
                  <Input
                    value={inputMessage}
                    onChange={(e) => { setInputMessage(e.target.value) }}
                    placeholder="Escribe tu mensaje..."
                    mr={2}
                    disabled={isLoading}
                  />
                  <Button type="submit" colorScheme="blue" isLoading={isLoading}>
                    Enviar
                  </Button>
                </Flex>
              </form>
            </Box>
          </Flex>
            )
          : (
          <Flex h="100%" alignItems="center" justifyContent="center">
            <Text color="gray.500">Chat cerrado. Haz clic en el botón para abrir.</Text>
          </Flex>
            )}
        <IconButton
          aria-label={isChatOpen ? 'Cerrar chat' : 'Abrir chat'}
          icon={isChatOpen ? <CloseIcon /> : <ChatIcon />}
          onClick={toggleChat}
          position="absolute"
          bottom={4}
          right={4}
          colorScheme="blue"
          isRound
        />
      </GridItem>
    </Grid>
  )
}

export default ChatbotPage
