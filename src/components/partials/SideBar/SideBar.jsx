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
          <i
            className="fa-solid fa-bars fa-2xl" id="icon-menu"
          ></i>
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
                <i
                  className="fa-solid fa-house fa-lg"
                ></i>
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
                <i
                  className="fa-solid fa-ticket fa-lg"
                ></i>
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
                <i
                  className="fa-solid fa-plus fa-lg"
                ></i>
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
                    <i
                      className="fa-solid fa-network-wired fa-lg"
                    ></i>
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
                  <i
                    className="fa-solid fa-chart-column fa-lg"
                  ></i>
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
