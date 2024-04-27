// styles.ts
export const settingsModalStyles = {
  modalContent: {
    height: '600px',
    width: '650px'
  },
  modalHeader: {
    fontSize: '32px' // Ejemplo de tamaño de fuente grande para el encabezado
  },
  tab: {
    selected: {
      color: '#2D41FC',
      fontWeight: 'bold',
      borderColor: '#2D41FC'
    }
  },
  tabIndicator: {
    marginTop: '-1.5px',
    height: '2px',
    background: '#2D41FC',
    borderRadius: '1px'
  },
  tabPanel: {
    overflowY: 'auto',
    height: 'auto' // Puede ajustarse según la necesidad de otros paneles específicos
  },
  systemTabPanel: {
    height: '450px', // Altura específica para el panel de sistema
    overflow: 'scroll'
  }
}
