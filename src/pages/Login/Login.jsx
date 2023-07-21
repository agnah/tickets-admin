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
                <div className="col-md-6 col-md-offset-3">
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
