import { Link } from 'react-router-dom'
import Header from '../Header/Header'
import './SideBar.css'
import { sector, perfil, rolUsuario } from '../../../constantes/constUsers'
import BotonProfile from '../Users/BotonProfile'
import useAuth from '../../../servicios/UseAuth'

const SideBar = ({ children }) => {
  const { user } = useAuth()
  // ! TRAER LOGICA DE NAVEGACION
  return (
    <div className="sidebar">
      <div
        className="d-flex flex-column flex-shrink-0 bg-dark"
        style={{ width: '6.5rem' }}
      >
        <a
          href="/"
          className="d-block p-3 link-dark text-decoration-none text-center my-3"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          data-bs-original-title="Icon-only"
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
          {(user.sector.includes(sector.MESA_DE_ENTRADA) ||
            user.perfil.includes(perfil.ADMINISTRADOR)) && (
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
          {user.perfil.includes(perfil.ADMINISTRADOR) && (
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
          <li>
            <BotonProfile />
          </li>
        </ul>
      </div>
      <main className="main">
        <Header />
        <section className="main-container">
          {children}
        </section>
      </main>
    </div>
  )
}

export default SideBar
