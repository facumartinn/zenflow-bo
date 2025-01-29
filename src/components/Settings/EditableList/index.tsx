import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tag,
  TagLabel,
  Wrap,
  WrapItem,
  useDisclosure
} from '@chakra-ui/react'
import { useState } from 'react'

interface Item {
  id: number
  name: string
}

interface EditableListProps {
  items: Item[]
  onUpdate: (items: Item[]) => void
  colorScheme?: string
  title: string
  addLabel: string
}

export const EditableList = ({ items, onUpdate, colorScheme = 'blue', title, addLabel }: EditableListProps): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [editingItem, setEditingItem] = useState<Item | null>(null)
  const [itemName, setItemName] = useState('')

  const handleAdd = (): void => {
    setEditingItem(null)
    setItemName('')
    onOpen()
  }

  const handleEdit = (item: Item): void => {
    setEditingItem(item)
    setItemName(item.name)
    onOpen()
  }

  const handleDelete = (itemId: number): void => {
    const newItems = items.filter(item => item.id !== itemId)
    onUpdate(newItems)
  }

  const handleSave = (): void => {
    if (!itemName.trim()) return

    if (editingItem) {
      // Editar existente
      const newItems = items.map(item =>
        item.id === editingItem.id ? { ...item, name: itemName.trim() } : item
      )
      onUpdate(newItems)
    } else {
      // Crear nuevo
      const newId = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1
      onUpdate([...items, { id: newId, name: itemName.trim() }])
    }

    onClose()
    setItemName('')
    setEditingItem(null)
  }

  return (
    <>
      <Stack spacing={3}>
        <Wrap spacing={2}>
          {items.map((item) => (
            <WrapItem key={item.id}>
              <Tag size="md" variant="subtle" colorScheme={colorScheme}>
                <TagLabel>{item.name}</TagLabel>
                <Box ml={2}>
                  <IconButton
                    aria-label="Editar"
                    icon={<EditIcon />}
                    size="xs"
                    variant="ghost"
                    onClick={() => { handleEdit(item) }}
                  />
                  <IconButton
                    aria-label="Eliminar"
                    icon={<DeleteIcon />}
                    size="xs"
                    variant="ghost"
                    colorScheme="red"
                    onClick={() => { handleDelete(item.id) }}
                  />
                </Box>
              </Tag>
            </WrapItem>
          ))}
        </Wrap>
        <Button
          leftIcon={<AddIcon />}
          variant="outline"
          size="sm"
          onClick={handleAdd}
          colorScheme={colorScheme}
        >
          {addLabel}
        </Button>
      </Stack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editingItem ? `Editar ${title}` : `Nuevo ${title}`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder={`Nombre del ${title.toLowerCase()}`}
              value={itemName}
              onChange={(e) => { setItemName(e.target.value) }}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme={colorScheme} onClick={handleSave}>
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
