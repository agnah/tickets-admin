import BotonProfile from '../../partials/Users/BotonProfile'

const HeaderLogged = (props) => {
  return (
    <header className="header">

      <nav
        className="navbar navbar-top navbar-default bg-celeste-argentina"
        role="navigation"
      >
        {
      !props.showNav &&
      <a
      // href="/"
      className="d-block px-3 ms-4 me-3 link-dark text-decoration-none text-center display-nav-icon"
      data-bs-toggle="tooltip"
      data-bs-placement="right"
      data-bs-original-title="Icon-only"
      onClick={() => {
        props.setShowNav(true)
      }}
    >
      <i
        className="fa-solid fa-bars fa-2xl"
        style={{ color: '#ffffff' }}
      ></i>
      <span className="visually-hidden">Icon-only</span>
    </a>
      }
        <div className="container">
          <div>
            <div className="navbar-header">
              <a
                className="navbar-brand"
                href="/"
                aria-label="Argentina.gob.ar Presidencia de la Nación"
              >
                <img
                  alt="Argentina.gob.ar"
                  src="/img/argentinagob-2.svg"
                  width={236}
                  height={50}
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
