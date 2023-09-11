import { Link } from 'react-router-dom'
import HeaderLogged from '../Header/HeaderLogged'
import './SideBar.css'
import { perfil } from '@constantes/constUsers'
import useAuth from '@servicios/UseAuth'
import { useState } from 'react'

const SideBar = ({ children }) => {
  const { user, seccionTicket } = useAuth()
  const [showNav, setShowNav] = useState(true)
  const { SUPERADMIN, ADMINISTRADOR, ADMINISTRATIVO } = perfil

  const classDisplay = showNav ? 'show-nav' : 'close-nav'
  const classColorBoton = seccionTicket ? 'circle-item' : 'circle-item-tramite'
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
                to="/inicio"
                className={classColorBoton}
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
          {seccionTicket && (
            <>
              <li className="item mb-4">
                <div className="item-nav">
                  <Link
                    to="/tickets"
                    className={classColorBoton}
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
              <li className="item mb-4">
                <div className="item-nav">
                  <Link
                    to="/tickets/create"
                    className={classColorBoton}
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
            </>
          )}
          {!seccionTicket && (
            <><li className="item mb-4">
              <div className="item-nav">
                <Link
                  to="/tramites"
                  className={classColorBoton}
                  aria-current="page"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  data-bs-original-title="Tramites"
                >
                  <i
                    className="fa-solid fa-ticket fa-lg"
                  ></i>
                </Link>
              </div>
              <span className="span-nav">Tramites</span>
            </li><li className="item mb-4">
                <div className="item-nav">
                  <Link
                    to="/tramites/create"
                    className={classColorBoton}
                    aria-current="page"
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    data-bs-original-title="TramitesCreate"
                  >
                    <i
                      className="fa-solid fa-plus fa-lg"
                    ></i>
                  </Link>
                </div>
                <span className='span-nav'>
                  Crear Tramite
                </span>
              </li></>
          )}
              <li className="item mb-4">
                <div className="item-nav">
                  <Link
                    to="/usuarios"
                    className={classColorBoton}
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
          {(user.perfil.includes(SUPERADMIN) || user.perfil.includes(ADMINISTRADOR) || user.perfil.includes(ADMINISTRATIVO)) && (
            <li className="item mb-4">
              <div className="item-nav">
                <Link
                  to="/estadisticas"
                  className={classColorBoton}
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
