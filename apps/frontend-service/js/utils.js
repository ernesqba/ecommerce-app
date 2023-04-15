export function getUserToken() {
  return JSON.parse(localStorage.getItem('session'))
}

export function shouldDisplayFeatures() {
  const session = getUserToken()
  return session?.user?.role === 'admin' ? true : false
}
