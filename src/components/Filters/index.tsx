/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  HStack,
  IconButton,
  Flex,
  Heading
} from '@chakra-ui/react'
import { SearchIcon, RepeatIcon, EditIcon, ViewIcon } from '@chakra-ui/icons'
import ActionPopover from './ActionPopover'

interface FiltersProps {
  onSelectAll: () => void
  selectedOrders: number[]
  onLoadOrders: () => void
  onProgramPicking: () => void
}

export const Filters = ({
  onSelectAll,
  selectedOrders,
  onLoadOrders,
  onProgramPicking
}: FiltersProps) => {
  return (
      <HStack mt={2} spacing={2} flexDirection={'column'} alignItems={'flex-start'}>
        <Heading as="h2" size="sm">Seleccioná los pedidos listos para preparar</Heading>
        <Flex w='100%'>
          <Flex w='75%'>
            <InputGroup w='45%' mr={4} bg='white' >
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input type="text" placeholder="Número de pedido" />
            </InputGroup>

              <InputGroup w='45%'mr={8} bg='white'>
                <Input type="date" />
              </InputGroup>
          </Flex>
            {selectedOrders.length > 0
              ? (
              <Flex justifyContent='end' w='35%'>
                <IconButton
                icon={<RepeatIcon />}
                aria-label="Reset filters"
                variant="outline"
                mr={4}
                />
                <IconButton
                icon={<EditIcon />}
                aria-label="Edit order"
                variant="outline"
                mr={4}
                />
                <IconButton
                icon={<ViewIcon />}
                aria-label="View order"
                variant="outline"
                mr={4}
                />
                <IconButton
                icon={<ViewIcon />}
                aria-label="View order"
                variant="outline"
                mr={4}
                />
                <ActionPopover onLoadOrders={onLoadOrders} onProgramPicking={onProgramPicking} />
              </Flex>
                )
              : <Flex justifyContent='end' w='25%'>
                <Button fontSize={16} color="#2D41FC" colorScheme='none' onClick={onSelectAll}>SELECCIONAR TODOS</Button>
              </Flex>

          }
        </Flex>
      </HStack>
  )
}
