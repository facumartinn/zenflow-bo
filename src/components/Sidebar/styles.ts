export const styles = {
  container: {
    width: '100%',
    height: '100%',
    borderRight: '1px solid',
    borderRightColor: '#B7B7B7',
    justifyContent: 'space-between'
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'left'
  },
  button: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: '16px 8px 0px 8px',
    padding: '8px 16px',
    fontWeight: '400',
    description: {
      marginLeft: '8px',
      hover: {
        fontWeight: '800'
      }
    },
    hover: {
      backgroundColor: 'rgba(160, 170, 255, 0.3)',
      borderRadius: '8px',
      color: 'rgba(45, 65, 252, 1)',
      fontWeight: '800'

    },
    selected: {
      borderRadius: '8px',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      margin: '16px 8px 0px 8px',
      padding: '8px 16px',
      backgroundColor: 'rgba(160, 170, 255, 0.3)',
      color: 'rgba(45, 65, 252, 1)',
      fontWeight: '800'
    }
  },
  bottomContainer: {
    marginBottom: '16px'
  }
}
