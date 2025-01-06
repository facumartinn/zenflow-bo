import Colors from '@/src/theme/Colors'

export const userCardStyles = {
  container: {
    padding: '16px', // 4*4px
    marginTop: '16px', // 4*4px
    marginBottom: '16px', // 4*4px
    borderRadius: 'lg',
    borderBottom: '1px solid #E2E8F0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent'
  },
  avatar: {
    size: 'md'
  },
  infoText: {
    fontSize: 'sm',
    color: 'gray.500'
  },
  nameText: {
    fontSize: 'md',
    fontWeight: 'bold'
  },
  speedIndicator: {
    fontSize: 'md',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center'
  },
  speedIcon: {
    marginLeft: '4px' // 1*4px
  },
  button: {
    size: 'md',
    colorScheme: 'blue',
    style: {
      color: Colors.mainBlue,
      fontWeight: 'bold'
    }
  }
}
