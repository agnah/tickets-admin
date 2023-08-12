import BotonProfile from '../../partials/Users/BotonProfile'
import './Header.css'

const HeaderLogged = (props) => {
  return (
    <header className="header">

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
        </div>
        <BotonProfile />
      </nav>
    </header>
  )
}

export default HeaderLogged
