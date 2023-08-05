export const login = async ({ email, password }) => {
  try {
    const response = await fetch('./assets/users.json')
    const users = await response.json()
    const checkUser = users.find(user => user.email === email && user.password === password)
    if (checkUser) {
      sessionStorage.setItem('user', JSON.stringify(checkUser))
      return { success: 'Login correcto', user: checkUser }
    } else {
      return { error: 'El email o la contraseña son incorrectos.' }
    }
  } catch (error) {
    return { error: 'Ha ocurrido un error al realizar el login.' }
  }
}

export const logout = (setUser) => {
  sessionStorage.removeItem('user')
  setUser(null)
}

export const getUserFromSessionStorage = () => {
  const storedUser = sessionStorage.getItem('user')
  return storedUser ? JSON.parse(storedUser) : null
}
