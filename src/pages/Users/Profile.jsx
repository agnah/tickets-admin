import useAuth from '@servicios/UseAuth'
import Tablero from '@components/Tablero/Tablero'

function Profile () {
  const { user } = useAuth()
  return (
    <Tablero title="Perfil usuario" page="Perfil usuario">
      <div id="user-detail-info">
        <article className="row">
          <div className="col-lg-4 col-md-4 col-sm-12">
            <p>
              <strong>Nombre:</strong> {user?.nombre}
            </p>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <p>
              <strong>Apellido:</strong> {user?.apellido}
            </p>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
          </div>
        </article>
        <article className="row">
          <div className="col-lg-4 col-md-4 col-sm-12">
            <p>
              <strong>Celular:</strong> {user?.celular}
            </p>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <p>
              <strong>Teléfono:</strong> {user?.telefono}
            </p>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <p>
              <strong>Interno:</strong> {user?.interno}
            </p>
          </div>
        </article>
        <article className="row">
          <div className="col-lg-4 col-md-4 col-sm-12">
            <p>
              <strong>Area:</strong> {user?.sector}
            </p>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <p>
              <strong>Sede:</strong> {user?.sede}
            </p>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <p>
              <strong>Piso:</strong> {user?.piso}
            </p>
          </div>
        </article>
        <article className="row">
          <div className="col-lg-4 col-md-4 col-sm-12">
            <p>
              <strong>Perfil:</strong> {user?.perfil}
            </p>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <p>
              <strong>Rol:</strong> {user?.rolUsuario}
            </p>
          </div>
        </article>
      </div>
    </Tablero>
  )
}

export default Profile
