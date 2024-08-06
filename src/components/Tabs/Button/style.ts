import { type SystemStyleObject } from '@chakra-ui/react'

export const styles: Record<string, SystemStyleObject> = {
  activeButton: {
    height: 54,
    borderRadius: 'full',
    backgroundColor: 'transparent',
    border: '2px solid',
    borderColor: '#2D41FC',
    color: '#2D41FC',
    fontSize: '16px',
    fontWeight: 700
  },
  disabledButton: {
    borderRadius: 'full',
    backgroundColor: 'transparent',
    border: '1px solid',
    borderColor: '#B7B7B7',
    color: '#B7B7B7',
    fontSize: '16px',
    fontWeight: 700
  },
  badge: {
    borderRadius: 'full',
    p: 2,
    ml: 2,
    backgroundColor: '#2D41FC',
    color: 'white'
  }
}
