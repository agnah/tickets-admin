import React, { useState } from 'react'
import useAuth from '../../../servicios/UseAuth'

function BotonProfile() {
  const { user, logout } = useAuth()
  const [showInfo, setShowInfo] = useState(false)

  const toggleInfo = () => {
    setShowInfo(!showInfo)
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <div>
      <h2 style={{ color: '#eee' }}>{user.nombre}</h2>
      <i className="fas fa-user fa-lg circle-item" onClick={toggleInfo} style={{ cursor: 'pointer', color: '#eee' }}></i>
      {showInfo && (
        <button onClick={handleLogout}>Cerrar sesión</button>
      )}
    </div>
  )
}

export default BotonProfile
