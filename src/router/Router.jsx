import { BrowserRouter } from 'react-router-dom'
import NavDashboard from '../components/partials/Nav/NavDashboard'
import { AuthProvider } from '../components/partials/Nav/useAuth'
import { FiltrosProvider } from '../components/tabla/contextTabla'
import DetalleUsuario from '../pages/Users/DetalleUsuario'

const Router = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FiltrosProvider>
        <DetalleUsuario/>
          <NavDashboard />
        </FiltrosProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default Router
