import './App.css'
import { AuthProvider } from '@servicios/AuthProvider'
import Router from './router/Router'

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}

export default App
