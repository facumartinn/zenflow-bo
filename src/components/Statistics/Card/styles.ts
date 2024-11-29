import { type SystemStyleObject } from '@chakra-ui/react'

export const styles: Record<string, SystemStyleObject> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: { base: 4, md: 6 },
    borderRadius: 'xl',
    transition: 'all 0.2s',
    _hover: {
      transform: 'translateY(-2px)',
      boxShadow: 'md'
    }
  },
  icon: {
    marginBottom: 2,
    color: 'gray.500',
    boxSize: { base: 5, md: 6 }
  },
  todayText: {
    fontSize: { base: 'xs', md: 'sm' },
    fontWeight: 'medium',
    color: 'gray.500',
    marginBottom: 2
  },
  titleText: {
    fontSize: { base: 'xs', md: 'sm' },
    color: 'gray.500',
    marginBottom: 2
  },
  countContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  countHeading: {
    fontSize: { base: '2xl', md: '3xl' },
    fontWeight: 'bold',
    color: 'gray.700'
  }
}
