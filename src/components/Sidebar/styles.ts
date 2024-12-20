export const styles = {
  container: {
    width: '100%',
    height: '100%',
    borderRight: '1px solid',
    justifyContent: 'space-between'
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'left'
  },
  button: {
    cursor: 'pointer',
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
      borderRadius: '8px',
      fontWeight: '800'
    },
    darkSelected: {
      borderRadius: '8px',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      margin: '16px 8px 0px 8px',
      padding: '8px 16px',
      backgroundColor: '#2D41FC',
      color: 'white',
      fontWeight: '800'
    },
    selected: {
      borderRadius: '8px',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      margin: '16px 8px 0px 8px',
      padding: '8px 16px',
      backgroundColor: '#A0AAFF4D',
      color: '#2D41FC',
      fontWeight: '800'
    }
  },
  bottomContainer: {
    marginBottom: '16px'
  }
}
