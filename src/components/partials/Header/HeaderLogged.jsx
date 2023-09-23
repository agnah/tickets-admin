import BotonProfile from '../../partials/Users/BotonProfile'
import Button from '../../partials/Button/Button'
import useApiMock from '@servicios/useApiMock'
import { apis } from '@constantes/constApis'
import './Header.css'

const HeaderLogged = (props) => {
  const url = apis.API_TICKETS
  const {
    isValidating,
    trigger
  } = useApiMock(url)

  return (
    <header className="header">
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
          <img className="menu-bars" id="icon-menu" src="../../../public/img/bars-solid.svg"></img>
          <span className="visually-hidden">Icon-only</span>
          </a>
          }
      <nav
        className="navbar-header"
        role="navigation"
      >
        <div className='container-header'>
          <div className="box-header">
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
          </div>
        </div>
        <div className="header-buttons">
          <Button
            className="btn-refresh"
            // classIcon="fa-solid fa-rotate-right"
            texto={isValidating ? 'Validando' : ''}
            type="button"
            onClick={() => trigger()}
          />
          <BotonProfile />
        </div>
      </nav>
    </header>
  )
}

export default HeaderLogged
