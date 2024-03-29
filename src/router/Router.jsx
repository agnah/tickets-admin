import { BrowserRouter } from 'react-router-dom'
import NavDashboard from '../components/partials/Nav/NavDashboard'
import { AuthProvider } from '../components/partials/Nav/useAuth'
import { FiltrosProvider } from '../components/tabla/contextTabla'

const Router = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FiltrosProvider>
          <NavDashboard />
        </FiltrosProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default Router
