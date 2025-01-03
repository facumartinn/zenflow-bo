export type QueryParams = Record<string, string | number | number[]>

export function objectToQueryString (params: QueryParams): string {
  const searchParams = new URLSearchParams()

  Object.keys(params).forEach(key => {
    const value = params[key]
    if (value === undefined) return
    if (Array.isArray(value)) {
      value.forEach(item => { searchParams.append(key, item.toString()) })
    } else {
      searchParams.append(key, value.toString())
    }
  })

  return searchParams.toString()
}

export function getFormattedDay (date?: string): string {
  let day: Date

  if (date) {
    // Handle both ISO string and date-input format (YYYY-MM-DD)
    day = date.includes('T') ? new Date(date) : new Date(date + 'T00:00:00')
  } else {
    day = new Date()
  }

  const yyyy = day.getFullYear()
  let mm: string | number = day.getMonth() + 1 // Months start at 0!
  let dd: string | number = day.getDate()

  // Add leading zeros
  mm = mm.toString().padStart(2, '0')
  dd = dd.toString().padStart(2, '0')

  return `${yyyy}-${mm}-${dd}`
}
