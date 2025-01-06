import Colors from '@/src/theme/Colors'

// styles.ts
export const userModalStyles = {
  modalContent: {
    padding: '16px'
  },
  modalHeader: {
    fontSize: '32px' // Ejemplo de gran tamaño de fuente para el encabezado
  },
  inputFormControl: {
    margin: '8px 0' // Espaciado vertical para cada control de formulario
  },
  profilePhotoBox: {
    width: '100%',
    borderRadius: 'lg',
    textAlign: 'left',
    marginBottom: '8px' // Margen debajo del texto
  },
  modalFooter: {
    justifyContent: 'center'
  },
  deleteButton: {
    marginTop: '16px',
    color: '#EC0000'
  },
  cancelButton: {
    marginTop: '16px',
    color: Colors.mainBlue
  }
}
