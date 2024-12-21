import Colors from '@/src/theme/Colors'
import { type SystemStyleObject } from '@chakra-ui/react'

export const styles: Record<string, SystemStyleObject> = {
  activeButton: {
    height: 54,
    borderRadius: 'full',
    backgroundColor: 'transparent',
    border: '2px solid',
    borderColor: Colors.mainBlue,
    color: Colors.mainBlue,
    fontSize: '16px',
    fontWeight: 700
  },
  darkActiveButton: {
    height: 54,
    borderRadius: 'full',
    backgroundColor: Colors.mainBlue,
    border: '2px solid',
    borderColor: Colors.mainBlue,
    color: Colors.white,
    fontSize: '16px',
    fontWeight: 700
  },
  disabledButton: {
    borderRadius: 'full',
    backgroundColor: 'transparent',
    border: '2px solid',
    borderColor: Colors.grey3,
    color: Colors.grey3,
    fontSize: '16px',
    fontWeight: 700
  },
  darkDisabledButton: {
    borderRadius: 'full',
    backgroundColor: 'transparent',
    border: '1px solid',
    borderColor: Colors.white,
    color: Colors.white,
    fontSize: '16px',
    fontWeight: 700
  },
  badge: {
    borderRadius: 'full',
    p: 2,
    ml: 2,
    backgroundColor: Colors.mainBlue,
    color: Colors.white
  },
  darkBadge: {
    borderRadius: 'full',
    p: 2,
    ml: 2,
    backgroundColor: Colors.white,
    color: Colors.mainBlue
  }
}
