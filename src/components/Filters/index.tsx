/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  HStack,
  IconButton,
  Text,
  Flex,
  Icon
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { PiTrash } from 'react-icons/pi'
import { MdOutlinePersonAddAlt, MdOutlineEditCalendar, MdOutlineUnpublished } from 'react-icons/md'
import { getFormattedDay } from '@/src/utils/queryParams'
import { type FilterParamTypes } from '@/src/types'

/*
  FILTROS
    NEW: Filtro por estado.
    PENDING: Filtro por estado, turno(si hay) y fecha de hoy(modificable).
    COMPLETED: Filtro por estado, turno(si hay) y fecha de hoy(modificable).
*/

interface FiltersProps {
  onDeselectAll: () => void
  onSelectAll: () => void
  ordersCount: number
  selectedOrders: number[]
  activeTab: string
  onLoadOrders: () => void
  filters: FilterParamTypes
}

export const Filters = ({
  onDeselectAll,
  onSelectAll,
  ordersCount,
  selectedOrders,
  onLoadOrders,
  activeTab,
  filters
}: FiltersProps) => {
  const selectedDate = filters?.assemblyDate || getFormattedDay()

  return (
      <HStack mt={2} spacing={2} flexDirection={'column'} alignItems={'flex-start'}>
        <Flex w='100%'>
          <Flex w='75%'>
            <InputGroup w='45%' mr={4} bg='white' >
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input type="text" placeholder="Número de pedido" />
            </InputGroup>
          </Flex>
          {selectedOrders.length > 0
            ? (
            <Flex alignItems='center' justifyContent='end' w='35%'>
              <Icon
              as={MdOutlineUnpublished}
              aria-label="Deselect all orders"
              w='6'
              h='6'
              mr={4}
              size='lg'
              onClick={onDeselectAll}
              />
              {activeTab === 'pending' &&
              <>
                <IconButton
                icon={<MdOutlinePersonAddAlt />}
                aria-label="Assign picker"
                variant="none"
                mr={4}
                />
                <Icon
                as={MdOutlineEditCalendar}
                w='6'
                h='6'
                aria-label="Edit order"
                mr={4}
                />
              </>
              }
              <Icon
                as={PiTrash}
                aria-label="Delete order"
                w='6'
                h='6'
                mr={4}
              />
              <Button
                borderRadius='full'
                bg='#2D41FC'
                color="white"
                px={6}
                py={4}
                _hover={{ bg: '#A0AAFF4D', color: '#2D41FC' }}
                onClick={onLoadOrders}
                >SUBIR PEDIDOS
              </Button>
            </Flex>
              )
            : <Flex justifyContent='end' w='25%'>
              <Button
                fontSize={16}
                color="#2D41FC"
                colorScheme='none'
                onClick={onSelectAll}
                isDisabled={ordersCount <= 0}
                _disabled={{ color: 'grey', cursor: 'not-allowed' }}>
                SELECCIONAR TODOS
              </Button>
            </Flex>
          }
        </Flex>
        {activeTab === 'new'
          ? <Text fontSize={14} mt={4} color='#4A4D4F'>Estos son los pedidos cargados recientemente, pero aún todavía falta subirlos para que los pickers puedan prepararlos.</Text>
          : <Text fontSize={14} mt={4} color='#4A4D4F'>{selectedDate} - {ordersCount} pedidos</Text>
        }
      </HStack>
  )
}
