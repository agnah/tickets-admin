import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import useAuth from '@servicios/UseAuth'
import './BotonProfile.css'

function BotonProfile () {
  const { user, logout } = useAuth()
  const [showInfo, setShowInfo] = useState(false)
  const [initials, setInitials] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    getInitials()
  }, [])

  const toggleInfo = () => {
    setShowInfo(!showInfo)
  }

  const handleLogout = () => {
    logout()
    navigate('')
  }

  const getInitials = () => {
    setInitials(user.nombre.split(' ').map(nombre => nombre[0]).join(''))
  }

  const handlePerfil = () => {
    navigate(`/usuarios/${user.id}`)
  }

  return (
    <div onClick={toggleInfo} className='userButton'>
      {initials}
      {showInfo && (
        <ul className="dropDownUser">
          <li><a className="dropdown-item" href="#" onClick={handleLogout}>Cerrar sesión</a></li>
          <li><a className="dropdown-item" href="#" onClick={() => handlePerfil()}>Perfil</a></li>
        </ul>
      )}
    </div>
  )
}

export default BotonProfile
