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
                  <span className="d-block mb-2">administrativoMesaEntrada</span>
                  <span className="d-block mb-2">computosAdministrador</span>
                  <span className="d-block mb-2">computosTecnicoEditor</span>
                  <span className="d-block mb-2">computosTecnicoLector</span>
                  <span className="d-block mb-2">cidResponsableAdmin</span>
                  <span className="d-block mb-2">cidTecnicoEditor</span>
                  <span className="d-block mb-2">cidTecnicoLector</span>
                </div>
                <div className="col-md-6">
                  <span className="d-block mb-2">soporteResponsableAdmin</span>
                  <span className="d-block mb-2">soporteTecnicoEditor</span>
                  <span className="d-block mb-2">soporteTecnicoLector</span>
                  <span className="d-block mb-2">telefoniaResponsableAdmin</span>
                  <span className="d-block mb-2">telefoniaTecnicoEditor</span>
                  <span className="d-block mb-2">telefoniaTecnicoLector</span>
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
