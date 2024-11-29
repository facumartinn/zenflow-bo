/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import { Box, Flex, Heading, Image, IconButton, useDisclosure, useMediaQuery, Drawer, DrawerOverlay, DrawerContent, DrawerBody } from '@chakra-ui/react'
import { styles } from './styles'
import { NavbarSkeleton } from '../Skeleton/Navbar'
import { useSystemPreferences } from '@/src/hooks/useConfig'
import { HamburgerIcon } from '@chakra-ui/icons'
import { Sibebar } from '../Sidebar'

export const NavBar = () => {
  const { isLoading } = useSystemPreferences()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isMobile] = useMediaQuery('(max-width: 768px)')

  if (isLoading) {
    return <NavbarSkeleton />
  }

  return (
    <Flex style={styles.container}>
      <Box style={styles.clientLogo.container}>
        <Image src={'/static/unilever.png'} alt="Client Logo" height='30' width='30' />
        <Heading as='h1' style={styles.clientLogo.title}>Unilever</Heading>
      </Box>
      <Flex alignItems="center">
        <Box display={{ base: 'none', md: 'block' }}>
          <Heading as='h3' style={styles.poweredBy.h3}>Powered by</Heading>
          <Heading as='h2' style={styles.poweredBy.h2}>ZenFlow</Heading>
        </Box>
        {isMobile && (
          <>
            <IconButton
              aria-label="Menu"
              icon={<HamburgerIcon />}
              variant="ghost"
              ml={4}
              onClick={onOpen}
              display={{ base: 'flex', md: 'none' }}
            />
            <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerBody p={0}>
                  <Sibebar />
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </>
        )}
      </Flex>
    </Flex>
  )
}
