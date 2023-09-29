import LoginForm from '@components/Form/LoginForm'
import Header from '@components/partials/Header/Header'
import Tablero from '@components/Tablero/Tablero'
import './Login.css'

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
                  <span className="d-block mb-2">administrativoMesaEntrada</span>
                  <span className="d-block mb-2">computosAdministrador</span>
                  <span className="d-block mb-2">computosTecnicoEditor</span>
                  <span className="d-block mb-2">computosTecnicoLector</span>
                </div>
                <div className="col-md-6">
                </div>
              </div>
              {/* <span>mesa de entrada: pp@mindes.com</span>
              <span>area tecnica: eoli@mindes.com</span>
              <span>area tecnica admin: aareatecnica@mindes.com</span>
              <span> super admin: sadmin@mindes.com</span> */}
              <div className="container-login">
                <Tablero title="Iniciar Sesión" classTitle="title-login">
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
