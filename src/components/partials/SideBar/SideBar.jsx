import { Link } from 'react-router-dom'
import HeaderLogged from '../Header/HeaderLogged'
import './SideBar.css'
import { perfil, rolUsuario } from '@constantes/constUsers'
import useAuth from '@servicios/UseAuth'
import { useState } from 'react'

const SideBar = ({ children }) => {
  const { user } = useAuth()
  const [showNav, setShowNav] = useState(true)
  const { DIRECTOR, RESPONSABLE, COORDINADOR } = perfil

  const classDisplay = showNav ? 'show-nav' : 'close-nav'
  // ! TRAER LOGICA DE NAVEGACION
  return (
    <div className="sidebar">

      <div
        className={`menu-container ${classDisplay}`}
      >
        <a
          className={`menu-h ${classDisplay}`}
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          data-bs-original-title="Icon-only"
          onClick={() => {
            setShowNav(false)
          }}
        >
          <img className="menu-bars" id="icon-menu" src="../../../public/img/bars-solid.svg"></img>
          <span className="visually-hidden">Icon-only</span>
        </a>
        <ul className="nav flex-column mb-auto text-center px-2">
          <li className="item mb-4">
            <div className="item-nav">
              <Link
                to="/dashboard"
                className="circle-item "
                aria-current="page"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                data-bs-original-title="Home"
              >
               <img className="nav-icon house" src="../../../public/img/house-solid.svg"></img>
              </Link>
            </div>
            <span className="span-nav">Inicio</span>
          </li>
          <li className="item mb-4">
            <div className="item-nav">
              <Link
                to="/tickets"
                className="circle-item "
                aria-current="page"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                data-bs-original-title="Home"
              >
                <img className="nav-icon ticket" src="../../../public/img/ticket-solid.svg"></img>
              </Link>
            </div>
            <span className="span-nav">Tickets</span>
          </li>
          {!user.perfil.includes(DIRECTOR) && (
          <li className="item mb-4">
            <div className="item-nav">
              <Link
                to="/tickets/create"
                className="circle-item "
                aria-current="page"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                data-bs-original-title="Home"
              >
                <img className="nav-icon plus" src="../../../public/img/plus-solid.svg"></img>
              </Link>
            </div>
            <span className='span-nav'>
              Crear Ticket
            </span>
          </li>
          )}
          {(user.rolUsuario === rolUsuario.ADMIN ||
            user.rolUsuario === rolUsuario.EDITOR) && (
              <li className="item mb-4">
                <div className="item-nav">
                  <Link
                    to="/usuarios"
                    className="circle-item "
                    aria-current="page"
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    data-bs-original-title="Home"
                  >
                    <img className="nav-icon user" id="icon-menu" src="../../../public/img/network-wired-solid.svg"></img>
                  </Link>
                </div>
                <span className="span-nav">
                  Usuarios
                </span>
              </li>
          )}
          {(user.perfil.includes(DIRECTOR) || user.perfil.includes(RESPONSABLE) || user.perfil.includes(COORDINADOR)) && (
            <li className="item mb-4">
              <div className="item-nav">
                <Link
                  to="/estadisticas"
                  className="circle-item "
                  aria-current="page"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  data-bs-original-title="Home"
                >
                  <img className="nav-icon chart" id="icon-menu" src="../../../public/img/chart-column-solid.svg"></img>
                </Link>
              </div>
              <span className="span-nav">
                Estadisticas
              </span>
            </li>
          )}
        </ul>
      </div>

      <main className="main">
        <HeaderLogged showNav={showNav} setShowNav={setShowNav} />
        <section className="main-container">{children}</section>
      </main>
    </div>
  )
}

export default SideBar
