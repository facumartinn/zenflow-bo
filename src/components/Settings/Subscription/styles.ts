// styles.ts
export const subscriptionSettingsStyles = {
  container: {
    spacing: 2,
    align: 'start',
    overflowY: 'scroll' // 'scroll' en lugar de 'auto' para garantizar consistencia en todos los navegadores
  },
  section: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  text: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginY: '8px' // 2*4px
  },
  linkButton: {
    variant: 'link',
    color: '#2D41FC',
    marginTop: '16px', // 4*4px
    fontWeight: 'normal'
  }
}
