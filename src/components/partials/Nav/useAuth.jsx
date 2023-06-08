import { createContext, useContext, useState } from 'react'

const authContext = createContext()

export function useAuth () {
  const user = useContext(authContext)
  return user
}

export function AuthProvider ({ children }) {
  const [user, setUser] = useState({})

  const login = () => {
    setUser({
      user: 'tito - usuario',
      role: ['usuario'],
      isLogged: true
    })
  }

  const loginOperador = () => {
    setUser({
      user: 'cacho - operador',
      role: ['operador'],
      isLogged: true
    })
  }

  const loginAdmin = () => {
    setUser({
      user: 'pepe - Admin',
      role: ['admin', 'usuario', 'operador'],
      isLogged: true
    })
  }

  const logout = () => {
    setUser({})
  }

  return (
        <authContext.Provider value={{ user, login, loginAdmin, loginOperador, logout }}>
            {children}
        </authContext.Provider>
  )
}
