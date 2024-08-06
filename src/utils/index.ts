type PathName = 'homePage' | 'ordersPage' | 'usersPage'

export const urlPath = (pathName: string): PathName => {
  if (pathName === '/') {
    return 'homePage'
  }
  if (pathName === '/orders') {
    return 'ordersPage'
  }
  if (pathName === '/users') {
    return 'usersPage'
  }
  return 'homePage'
}
