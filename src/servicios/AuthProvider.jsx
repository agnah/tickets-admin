import React, { useState, useEffect } from 'react'
import { authContext } from './AuthContext'
import { login, logout } from './AuthFunctions'

export function AuthProvider ({ children }) {
  const [user, setUser] = useState(null)
  const [seccionTicket, setSeccionTicket] = useState(false)

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogin = async (credentials) => {
    const result = await login(credentials)
    if (result?.user) {
      setUser(result.user)
    }
    return result
  }

  const handleLogout = () => {
    logout(setUser)
  }

  const handleSeccion = () => {
    setSeccionTicket(!seccionTicket)
  }

  return (
    <authContext.Provider value={{ handleSeccion, user, login: handleLogin, logout: handleLogout }}>
      {children}
    </authContext.Provider>
  )
}
