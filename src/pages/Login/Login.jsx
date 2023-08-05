import LoginForm from '../../components/Form/LoginForm'
import Header from '../../components/partials/Header/Header'
import Footer from '../../components/partials/Footer/Footer'
import Tablero from '../../components/Tablero/Tablero'

const Login = () => {
  return (
    <>
      <Header />
      <section className="main-container">
        <article>
          <div className="container">
            <div className="row">
              <div class="row">
                <div class="col-md-6">
                  <span class="d-block mb-2">mesa_de_entradaOperadorUsuario</span>
                  <span class="d-block mb-2">gdeResponsableAdmin</span>
                  <span class="d-block mb-2">computosResponsableAdmin</span>
                  <span class="d-block mb-2">computosColaboradorEditor</span>
                  <span class="d-block mb-2">computosColaboradorUsuario</span>
                  <span class="d-block mb-2">cidResponsableAdmin</span>
                  <span class="d-block mb-2">cidColaboradorEditor</span>
                  <span class="d-block mb-2">cidColaboradorUsuario</span>
                </div>
                <div class="col-md-6">
                  <span class="d-block mb-2">soporteResponsableAdmin</span>
                  <span class="d-block mb-2">soporteColaboradorEditor</span>
                  <span class="d-block mb-2">soporteColaboradorUsuario</span>
                  <span class="d-block mb-2">telefoniaResponsableAdmin</span>
                  <span class="d-block mb-2">telefoniaColaboradorEditor</span>
                  <span class="d-block mb-2">telefoniaColaboradorUsuario</span>
                  <span class="d-block mb-2">administrador</span>
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
      <Footer />
    </>
  )
}

export default Login
