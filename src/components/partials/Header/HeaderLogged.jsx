import BotonProfile from '../../partials/Users/BotonProfile'
import './Header.css'
import useAuth from '@servicios/UseAuth'
import Button from '@components/partials/Button/Button'
import { useNavigate } from 'react-router-dom'
import { perfil } from '@constantes/constUsers'

const HeaderLogged = (props) => {
  const { seccionTicket, handleSeccion, user } = useAuth()
  const { TECNICO } = perfil
  const navigate = useNavigate()
  const redirectTickets = () => {
    handleSeccion()
    navigate('/tickets')
  }
  const redirectTramites = () => {
    handleSeccion()
    navigate('/tramites')
  }
  const classColorHeaderBackground = seccionTicket ? 'backgroundTicket' : 'backgroundTramite'
  return (
    <header className={`header ${classColorHeaderBackground}`}>
      <nav
        className="navbar-header"
        role="navigation"
      >
        {
          !props.showNav &&
          <a
            className="menu-nav-h"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            data-bs-original-title="Icon-only"
            onClick={() => {
              props.setShowNav(true)
            }}
          >
            <i
              className="fa-solid fa-bars fa-2xl"
            ></i>
            <span className="visually-hidden">Icon-only</span>
          </a>
        }
        <div className="container-header">
          <div>
            <div className="navbar-header">
              <a
                className="navbar-brand"
                href="/"
                aria-label="Argentina.gob.ar Presidencia de la Nación"
              >
                <img
                  alt="Argentina.gob.ar"
                  src="/img/logo-mini-des.svg"
                  height={55}
                />

                <img
                  alt="CAI"
                  src="/img/CAI.svg"
                  height={40}
                />
              </a>
            </div>
          </div>
          {!user.perfil.includes(TECNICO) &&
            (seccionTicket
              ? <Button type="button" style={{ width: 'auto' }} texto="Tramites" classBoton="btn btn-info" onClick={redirectTramites} />
              : <Button type="button" style={{ width: 'auto' }} texto="Tickets" classBoton="btn btn-success" onClick={redirectTickets} />
            )
          }
        </div>
        <BotonProfile />
      </nav>
    </header>
  )
}

export default HeaderLogged
