import React, { useState } from 'react'
import useAuth from '../../../servicios/UseAuth'
import './BotonProfile.css'

function BotonProfile () {
  const { user, logout } = useAuth()
  const [showInfo, setShowInfo] = useState(false)

  const toggleInfo = () => {
    setShowInfo(!showInfo)
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="item-nav">
      <div>
        <a className='circle-item'>
          <i className="fa-solid fa-user fa-lg " onClick={toggleInfo}></i>
          {showInfo && (
            <button onClick={handleLogout}>Cerrar sesión</button>
          )}
        </a>
      </div>
      <span className="span-user">{user.nombre}</span>
    </div>
  )
}

export default BotonProfile
