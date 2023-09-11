import React, { useState, useEffect } from 'react'
import { authContext } from './AuthContext'
import { login, logout } from './AuthFunctions'
import { perfil } from '@constantes/constUsers'

export function AuthProvider ({ children }) {
  const [user, setUser] = useState(null)
  const [seccionTicket, setSeccionTicket] = useState(false)
  const { ADMINISTRATIVO } = perfil

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogin = async (credentials) => {
    const result = await login(credentials)
    if (result?.user) {
      result.user.perfil.includes(ADMINISTRATIVO)
        ? setSeccionTicket(false)
        : setSeccionTicket(true)
      setUser(result.user)
    }
    return result
  }

  const handleLogout = () => {
    setSeccionTicket(false)
    logout(setUser)
  }

  const handleSeccion = () => {
    setSeccionTicket(!seccionTicket)
  }

  return (
    <authContext.Provider value={{ handleSeccion, seccionTicket, user, login: handleLogin, logout: handleLogout }}>
      {children}
    </authContext.Provider>
  )
}
