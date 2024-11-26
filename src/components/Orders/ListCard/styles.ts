import { type SystemStyleObject } from '@chakra-ui/react'

export const styles: Record<string, SystemStyleObject> = {
  cardContainer: {
    cursor: 'pointer',
    w: '100%',
    p: 6,
    borderWidth: '1px',
    borderRadius: 'lg',
    mb: 4,
    gap: 4,
    templateColumns: 'min-content 1fr min-content',
    backgroundColor: 'white'
  },
  cardContent: {
    gap: 6,
    gridTemplateColumns: '20px 1fr 1fr 1fr 1fr 1fr',
    alignItems: 'center'
  },
  cardContentWithoutCheckbox: {
    gap: 6,
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
    alignItems: 'center'
  },
  label: {
    fontSize: 'sm'
  },
  boldText: {
    fontWeight: 'bold'
  },
  badge: {
    px: 4,
    py: 2,
    borderRadius: 'full'
  },
  iconButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    variant: 'ghost'
  }
}
