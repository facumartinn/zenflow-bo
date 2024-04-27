export const userCardStyles = {
  container: {
    padding: '16px', // 4*4px
    margin: '16px', // 4*4px
    background: 'white',
    boxShadow: 'sm',
    borderRadius: 'lg',
    border: '1px solid #E2E8F0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer'
  },
  avatar: {
    size: 'sm'
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
  speedIconColor: (trend: 'increasing' | 'decreasing') => {
    return trend === 'increasing' ? 'green.500' : 'red.500'
  },
  button: {
    size: 'md',
    variant: 'ghost',
    colorScheme: 'blue'
  }
}
