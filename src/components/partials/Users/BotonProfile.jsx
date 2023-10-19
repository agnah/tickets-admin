import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState, useRef, useContext } from 'react'
import useAuth from '@servicios/UseAuth'
import './BotonProfile.css'
import { FiltrosContext } from '../../tabla/contextTabla'

function BotonProfile () {
  const { user, logout } = useAuth()
  const [showInfo, setShowInfo] = useState(false)
  const [initials, setInitials] = useState()
  const navigate = useNavigate()
  const dropdownRef = useRef(null)
  const {
    // handlePrioridadChange,
    handleSeleccionadosChange,
    handleFiltroUserChange,
    handleFiltroSectorChange
  } = useContext(FiltrosContext)

  useEffect(() => {
    getInitials()
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])
  // Función para cerrar el dropdown cuando se hace click afuera
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowInfo(false)
    }
  }

  const toggleInfo = () => {
    setShowInfo(!showInfo)
  }

  const handleLogout = () => {
    handleFiltroSectorChange('')
    handleFiltroUserChange('')
    handleSeleccionadosChange([])
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
    <div onClick={toggleInfo} className='userButton' ref={dropdownRef}>
      {initials}
      {showInfo && (
        <ul className="dropDownUser">
          <li><img src="../../public/img/arrow-right-from-bracket-solid.svg" /><a className="dropdown-item" href="#" onClick={handleLogout}>Cerrar sesión</a></li>
          <li><img src="../../public/img/user-solid.svg" /><a className="dropdown-item" href="#" onClick={() => handlePerfil()}>Perfil</a></li>
        </ul>
      )}
    </div>
  )
}

export default BotonProfile
