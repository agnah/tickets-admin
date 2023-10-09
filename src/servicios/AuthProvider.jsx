// import React, { useState, useEffect } from 'react'
// import { authContext } from './AuthContext'
// import { login, logout } from './AuthFunctions'
// import { perfil } from '@constantes/constUsers'

// export function AuthProvider ({ children }) {
//   const [user, setUser] = useState(null)
//   const [seccionTicket, setSeccionTicket] = useState(false)
//   const { ADMINISTRATIVO } = perfil

//   useEffect(() => {
//     const storedUser = sessionStorage.getItem('user')
//     if (storedUser) {
//       setUser(JSON.parse(storedUser))
//     }
//   }, [])

//   const handleLogin = async (credentials) => {
//     const result = await login(credentials)
//     if (result?.user) {
//       result.user.perfil.includes(ADMINISTRATIVO)
//         ? setSeccionTicket(false)
//         : setSeccionTicket(true)
//       setUser(result.user)
//     }
//     return result
//   }

//   const handleLogout = () => {
//     setSeccionTicket(false)
//     logout(setUser)
//   }

//   const handleSeccion = () => {
//     setSeccionTicket(!seccionTicket)
//   }

//   return (
//     <authContext.Provider value={{ handleSeccion, seccionTicket, user, login: handleLogin, logout: handleLogout }}>
//       {children}
//     </authContext.Provider>
//   )
// }

import React, { useState, useEffect } from 'react'
import { authContext } from './AuthContext'
import { login, logout } from './AuthFunctions'
import { perfil } from '@constantes/constUsers'

export function AuthProvider ({ children }) {
  const [user, setUser] = useState(null)
  const [seccionTicket, setSeccionTicket] = useState(false)
  const { ADMINISTRATIVO } = perfil

  useEffect(() => {
    // Recuperar el usuario desde sessionStorage
    const storedUser = sessionStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    // Recuperar la variable seccionTicket desde sessionStorage
    const storedSeccionTicket = sessionStorage.getItem('seccionTicket')
    if (storedSeccionTicket) {
      setSeccionTicket(JSON.parse(storedSeccionTicket))
    }
  }, [])

  const handleLogin = async (credentials) => {
    const result = await login(credentials)
    if (result?.user) {
      result.user.perfil.includes(ADMINISTRATIVO)
        ? setSeccionTicket(false)
        : setSeccionTicket(true)
      setUser(result.user)
      // Guardar la variable seccionTicket en sessionStorage
      sessionStorage.setItem('seccionTicket', JSON.stringify(seccionTicket))
    }
    return result
  }

  const handleLogout = () => {
    setSeccionTicket(false)
    logout(setUser)

    // Borrar la variable seccionTicket de sessionStorage al hacer logout
    sessionStorage.removeItem('seccionTicket')
  }

  const handleSeccion = () => {
    setSeccionTicket(!seccionTicket)

    // Actualizar la variable seccionTicket en sessionStorage cuando cambie
    sessionStorage.setItem('seccionTicket', JSON.stringify(!seccionTicket))
  }

  return (
    <authContext.Provider value={{ handleSeccion, seccionTicket, user, login: handleLogin, logout: handleLogout }}>
      {children}
    </authContext.Provider>
  )
}
