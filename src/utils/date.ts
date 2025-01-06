export function getFormattedDay (date?: string): string {
  // Si no se proporciona fecha, usar la fecha actual en la zona horaria local
  if (!date) {
    const now = new Date()
    return now.toLocaleDateString('en-CA') // Formato YYYY-MM-DD
  }

  // Si la fecha ya está en formato YYYY-MM-DD, usarla directamente
  if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return date
  }

  // Si es una fecha ISO, convertirla a la zona horaria local
  const localDate = new Date(date)
  return localDate.toLocaleDateString('en-CA') // Formato YYYY-MM-DD
}

export function addDays (date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export function subtractDays (date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() - days)
  return result
}

export const formatDateToLocal = (date: string | Date): string => {
  if (!date) return ''

  // Si la fecha es una string en formato YYYY-MM-DD, la procesamos directamente
  if (typeof date === 'string' && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
    const [year, month, day] = date.split('-')
    return `${day}/${month}/${year}`
  }

  // Si es una fecha ISO con UTC (termina en Z), extraemos solo la parte de la fecha
  if (typeof date === 'string' && date.endsWith('Z')) {
    const [year, month, day] = date.split('T')[0].split('-')
    return `${day}/${month}/${year}`
  }

  // Para otros formatos de fecha, usamos el constructor Date
  const dateObj = new Date(date)
  const day = String(dateObj.getDate()).padStart(2, '0')
  const month = String(dateObj.getMonth() + 1).padStart(2, '0')
  const year = dateObj.getFullYear()

  return `${day}/${month}/${year}`
}

export function parseLocalDate (dateStr: string): Date {
  // Convertir fecha en formato DD/MM/YYYY a objeto Date
  const [day, month, year] = dateStr.split('/').map(Number)
  return new Date(year, month - 1, day)
}

export function toISOLocalDate (date: Date): string {
  // Convertir fecha a formato ISO pero preservando la zona horaria local
  const offset = date.getTimezoneOffset()
  const localDate = new Date(date.getTime() - (offset * 60 * 1000))
  return localDate.toISOString().split('T')[0]
}
