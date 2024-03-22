import { type SystemStyleObject } from '@chakra-ui/react'

export const styles: Record<string, SystemStyleObject> = {
  cardContainer: {
    p: 6,
    borderWidth: '1px',
    borderRadius: 'lg',
    mb: 4,
    mx: 4,
    gap: 4,
    templateColumns: 'min-content 1fr min-content'
  },
  cardContent: {
    gap: 6,
    gridTemplateColumns: '20px 1fr 1fr 1fr 1fr 1fr 1fr',
    alignItems: 'center'
  },
  label: {
    fontSize: 'sm'
  },
  boldText: {
    fontWeight: 'bold'
  },
  badge: {
    px: 2,
    py: 1
  },
  iconButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    variant: 'ghost'
  }
}
