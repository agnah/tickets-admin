import React, { useEffect, useState } from 'react'
import useAuth from '../../../servicios/UseAuth'

function BotonProfile () {
  const { user, logout } = useAuth()
  const [showInfo, setShowInfo] = useState(false)
  const [initials, setInitials] = useState()

  useEffect(() => {
    getInitials()
  }, [])

  const toggleInfo = () => {
    setShowInfo(!showInfo)
  }

  const handleLogout = () => {
    logout()
  }

  const getInitials = () => {
    setInitials(user.nombre.split(' ').map(nombre => nombre[0]).join(''))
  }

  return (
    <div onClick={toggleInfo} className='userButton'>
      {initials}
      {showInfo && (
        <ul className="dropDownUser">
            <li><a className="dropdown-item" href="#" onClick={handleLogout}>Cerrar sesión</a></li>
            <li><a className="dropdown-item" href="#">Perfil</a></li>
        </ul>
      )}
    </div>
  )
}

export default BotonProfile
