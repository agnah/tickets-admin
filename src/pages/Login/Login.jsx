import LoginForm from '@components/Form/LoginForm'
import Header from '@components/partials/Header/Header'
import Tablero from '@components/Tablero/Tablero'

const Login = () => {
  return (
    <>
      <Header />
      <section className="main-container">
        <article>
          <div className="container">
            <div className="row">
              <div className="row">
                <div className="col-md-6">
                  <span className="d-block mb-2">mesa_de_entradaOperadorUsuario</span>
                  <span className="d-block mb-2">gdeResponsableAdmin</span>
                  <span className="d-block mb-2">computosResponsableAdmin</span>
                  <span className="d-block mb-2">computosColaboradorEditor</span>
                  <span className="d-block mb-2">computosColaboradorUsuario</span>
                  <span className="d-block mb-2">cidResponsableAdmin</span>
                  <span className="d-block mb-2">cidColaboradorEditor</span>
                  <span className="d-block mb-2">cidColaboradorUsuario</span>
                </div>
                <div className="col-md-6">
                  <span className="d-block mb-2">soporteResponsableAdmin</span>
                  <span className="d-block mb-2">soporteColaboradorEditor</span>
                  <span className="d-block mb-2">soporteColaboradorUsuario</span>
                  <span className="d-block mb-2">telefoniaResponsableAdmin</span>
                  <span className="d-block mb-2">telefoniaColaboradorEditor</span>
                  <span className="d-block mb-2">telefoniaColaboradorUsuario</span>
                  <span className="d-block mb-2">director</span>
                  <span className="d-block mb-2">cstimi</span>
                </div>
              </div>
              {/* <span>mesa de entrada: pp@mindes.com</span>
              <span>area tecnica: eoli@mindes.com</span>
              <span>area tecnica admin: aareatecnica@mindes.com</span>
              <span> super admin: sadmin@mindes.com</span> */}
              <div className="col-md-6 offset-md-3">
                <Tablero title="Iniciar Sesión" classTitle="text-center">
                  <LoginForm />
                </Tablero>
              </div>
            </div>
          </div>
        </article>
      </section>
    </>
  )
}

export default Login
