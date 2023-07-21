import { createContext, useContext, useState } from 'react'
// ! Usuarios hardcodeados
// import usuarios from '../../../assets/users.json'
const authContext = createContext()

export function useAuth () {
  const user = useContext(authContext)
  return user
}

export function AuthProvider ({ children }) {
  const [user, setUser] = useState({})
  // const [users, setusers] = useState(usuarios)
  // console.log(users)

  const login = async ({ email, password }) => {
    const response = await fetch('./assets/users.json')
    const users = await response.json()
    await users.forEach(user => {
      if (user.email === email) {
        if (user.password === password) {
          setUser({
            user: user.username,
            role: user.perfil,
            email: user.email,
            isLogged: true
          })
        }
      }
    })
    // if (!user?.email) return { error: 'El email o password proporcionados son incorrectos.' }
    return { success: 'Login correcto', user }
  }

  const logout = () => {
    setUser({})
  }

  return (
        <authContext.Provider value={{ user, login, logout }}>
            {children}
        </authContext.Provider>
  )
}
