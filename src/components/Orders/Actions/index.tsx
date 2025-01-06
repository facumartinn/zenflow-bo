/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Flex, InputGroup, InputLeftElement, Input, Button } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { DefaultButton } from '@/src/components/Button'
import Colors from '@/src/theme/Colors'
import { TrashSvg } from '../../svg/trashSvg'

interface OrdersActionsProps {
  selectedOrders: number[]
  onDelete: () => void
  onEdit: () => void
  onSearch: (value: string) => void
}

export const OrdersActions = ({
  selectedOrders,
  onDelete,
  onEdit,
  onSearch
}: OrdersActionsProps) => {
  return selectedOrders?.length > 0
    ? (
    <Flex gap={4} alignItems="center">
        <Button
          onClick={onDelete}
          borderRadius="full"
          backgroundColor="transparent"
          border="1px"
          borderColor={Colors.mainBlue}
          p={0}
          w={10}
          h={10}
        >
          <TrashSvg color={Colors.mainBlue} />
        </Button>
      <DefaultButton
        label="EDITAR"
        onClick={onEdit}
      />
    </Flex>
      )
    : (
    <InputGroup maxW="400px">
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="#B7BEC4" />
      </InputLeftElement>
      <Input
        type="text"
        placeholder="Buscá por número de pedido"
        onChange={(e) => { onSearch(e.target.value) }}
        borderRadius="xl"
        border="1px solid #B7BEC4"
        _placeholder={{ color: '#B7BEC4' }}
        _focus={{ borderColor: Colors.mainBlue }}
      />
    </InputGroup>
      )
}
