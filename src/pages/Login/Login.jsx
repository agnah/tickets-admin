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
              <span>mesa de entrada: pp@mindes.com</span>
              <span>area tecnica: eoli@mindes.com</span>
              <span>area tecnica admin: aareatecnica@mindes.com</span>
              <span> super admin: sadmin@mindes.com</span>
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
