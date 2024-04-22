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
