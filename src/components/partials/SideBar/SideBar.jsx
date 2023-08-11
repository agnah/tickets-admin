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

  const classDisplay = showNav ? 'd-flex flex-column flex-shrink-0 bg-dark' : 'd-flex flex-column flex-shrink-0 bg-dark hideNav'
  // ! TRAER LOGICA DE NAVEGACION
  return (
    <div className="sidebar">

      <div
        className={classDisplay}
        style={{ width: '6.5rem' }}
      >
        <a
          className="d-block p-3 link-dark text-decoration-none text-center mt-2 mb-4 display-nav-icon"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          data-bs-original-title="Icon-only"
          onClick={() => {
            setShowNav(false)
          }}
        >
          <i
            className="fa-solid fa-bars fa-2xl"
            style={{ color: '#ffffff' }}
          ></i>
          <span className="visually-hidden">Icon-only</span>
        </a>
        <ul className="nav flex-column mb-auto text-center px-2">
          <li className="item mb-4">
            <div className="item-nav mb-2">
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
                  style={{ color: '#ffffff' }}
                ></i>
              </Link>
            </div>
            <span style={{ color: '#eee', fontSize: '12px' }}>Inicio</span>
          </li>
          <li className="item mb-4">
            <div className="item-nav mb-2">
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
                  style={{ color: '#ffffff' }}
                ></i>
              </Link>
            </div>
            <span style={{ color: '#eee', fontSize: '12px' }}>Tickets</span>
          </li>
          {!user.perfil.includes(DIRECTOR) && (
          <li className="item mb-4">
            <div className="item-nav mb-2">
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
                  style={{ color: '#ffffff' }}
                ></i>
              </Link>
            </div>
            <span style={{ color: '#eee', fontSize: '12px' }}>
              Crear Ticket
            </span>
          </li>
          )}
          {(user.rolUsuario === rolUsuario.ADMIN ||
            user.rolUsuario === rolUsuario.EDITOR) && (
              <li className="item mb-4">
                <div className="item-nav mb-2">
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
                      style={{ color: '#ffffff' }}
                    ></i>
                  </Link>
                </div>
                <span style={{ color: '#eee', fontSize: '12px' }}>
                  Usuarios
                </span>
              </li>
          )}
          {(user.perfil.includes(DIRECTOR) || user.perfil.includes(RESPONSABLE) || user.perfil.includes(COORDINADOR)) && (
            <li className="item mb-4">
              <div className="item-nav mb-2">
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
                    style={{ color: '#ffffff' }}
                  ></i>
                </Link>
              </div>
              <span style={{ color: '#eee', fontSize: '12px' }}>
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
