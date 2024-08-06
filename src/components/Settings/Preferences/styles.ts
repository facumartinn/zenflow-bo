// styles.ts
export const preferenceSettingsStyles = {
  saveButtonContainer: {
    width: 'full',
    marginBottom: '16px', // 4*4px
    justifyContent: 'end'
  },
  formControl: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    marginBottom: '16px' // 4*4px
  },
  labelContainer: {
    width: 'full',
    justifyContent: 'space-between',
    alignItems: 'start',
    marginBottom: '16px' // 4*4px
  },
  label: {
    marginBottom: '0',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  descriptionText: {
    textAlign: 'start',
    fontSize: '14px',
    color: '#4A4D4F'
  },
  switch: {
    colorScheme: 'brand'
  },
  toastBox: {
    backgroundColor: 'white',
    border: '2px solid',
    borderColor: '#3EBC59',
    borderRadius: '5px',
    paddingY: '16px', // 4*4px
    paddingX: '8px', // 2*4px
    display: 'flex',
    alignItems: 'center'
  },
  toastIcon: {
    size: '24px',
    color: '#3EBC59'
  },
  toastText: {
    marginLeft: '8px', // 2*4px
    color: '#4A4D4F',
    fontSize: '16px',
    fontWeight: 'bold'
  }
}
