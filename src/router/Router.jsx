import { BrowserRouter } from 'react-router-dom'
import NavDashboard from '../components/partials/Nav/NavDashboard'
import { FiltrosProvider } from '../components/tabla/contextTabla'
import DetalleUsuario from '../pages/Users/DetalleUsuario'

const Router = () => {
  return (
    <BrowserRouter>
      <FiltrosProvider>
        <DetalleUsuario />
        <NavDashboard />
      </FiltrosProvider>
    </BrowserRouter>
  )
}

export default Router
