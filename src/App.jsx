import './App.css'
import { AuthProvider } from '@servicios/AuthProvider'
import { FiltrosProvider } from '@components/tabla/contextTabla'
import Router from './router/Router'

function App () {
  return (
    <AuthProvider>
      <FiltrosProvider>
        <Router />
      </FiltrosProvider>
    </AuthProvider>
  )
}

export default App
