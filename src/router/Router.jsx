import { BrowserRouter } from 'react-router-dom'
import Header from '../components/partials/Header/Header'
import Footer from '../components/partials/Footer/Footer'

const Router = () => {
  return (
    <BrowserRouter>
      <Header />

      <Footer />
    </BrowserRouter>
  )
}

export default Router
