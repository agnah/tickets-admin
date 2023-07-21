import { BrowserRouter } from 'react-router-dom'
import NavDashboard from '../components/partials/Nav/NavDashboard'
import { AuthProvider } from '../components/partials/Nav/useAuth'
import { FiltrosProvider } from '../components/tabla/contextTabla'

const Router = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <FiltrosProvider>
          <NavDashboard />
        </FiltrosProvider>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default Router
