import { Button, HStack, Text } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import Colors from '@/src/theme/Colors'

interface PaginationProps {
  currentPage: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  totalPages: number
}

export const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange, totalPages }: PaginationProps) => {
  // Comentamos esta condición temporalmente para ver si el componente se renderiza
  // if (totalPages <= 1) return null

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  return (
    <HStack spacing={4} p={4}>
      <Button
        onClick={handlePrevious}
        isDisabled={currentPage === 1}
        variant="ghost"
        color={Colors.mainBlue}
        leftIcon={<ChevronLeftIcon />}
      >
        Anterior
      </Button>

      <Text color="gray.600" fontWeight="medium">
        Página {currentPage} de {totalPages}
      </Text>

      <Button
        onClick={handleNext}
        isDisabled={currentPage === totalPages}
        variant="ghost"
        color={Colors.mainBlue}
        rightIcon={<ChevronRightIcon />}
      >
        Siguiente
      </Button>
    </HStack>
  )
}
