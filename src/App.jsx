import './App.css'
import { AuthProvider } from './components/partials/Nav/useAuth'
import Router from './router/Router'

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}

export default App
