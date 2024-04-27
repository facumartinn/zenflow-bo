export type QueryParams = Record<string, string | number>

export function objectToQueryString (params: QueryParams): string {
  const searchParams = new URLSearchParams()

  Object.keys(params).forEach(key => {
    const value = params[key]
    if (value === undefined) return
    searchParams.append(key, value.toString())
  })

  return searchParams.toString()
}

export function getFormattedDay (date?: string): string {
  const day = date ? new Date(`${date} EDT`) : new Date()
  const yyyy = day.getFullYear()
  let mm: any = day.getMonth() + 1 // Months start at 0!
  let dd: any = day.getDate()

  if (dd < 10) dd = '0' + dd
  if (mm < 10) mm = '0' + mm

  const formattedDay = yyyy + '-' + mm + '-' + dd
  return formattedDay
}
