import { Route, Routes } from 'react-router-dom'
import Login from '../../../pages/Login/Login'
import ProtectedRoutes from '../../../router/ProtectedRoutes'
import { useAuth } from './useAuth'
import { lazy, Suspense } from 'react'
import SideBar from '../SideBar/SideBar'

function NavDashboard () {
  // const { user, logout } = useAuth()
  const { user } = useAuth()
  console.log(user)
  const Home = lazy(() => import('../../../pages/Home/Home'))
  const Tickets = lazy(() => import('../../../pages/Tickets/Tickets'))
  const TicketCreate = lazy(() => import('../../../pages/Tickets/TicketCreate'))
  const Usuarios = lazy(() => import('../../../pages/Users/usuarios'))
  const CreateUser = lazy(() => import('../../../pages/Users/CreateUser'))

  if (!user.isLogged) {
    return (
      <>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </>
    )
  }

  return (
    <>
      <SideBar>
        <Suspense fallback={<div>Cargando...</div>}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/404" element={<div>404</div>} />
            <Route path="*" element={<h1>carga de requerimiento + lista</h1>} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/dashboard" element={<Home />} />
            {/* <Route element={<ProtectedRoutes isAllowed={user.isLogged} />}>
              <Route path="/dashboard" element={<Home />} />
              <Route path="/tickets" element={<Tickets />} />
            </Route> */}
            <Route
              element={
                <ProtectedRoutes
                  isAllowed={
                    user.isLogged && (user.role.includes('mesa_entrada') ||
                      user.role.includes('sadmin'))
                  }
                />
              }
            >
              <Route path="/tickets/create" element={<TicketCreate />} />
            </Route>
            <Route
              element={
                <ProtectedRoutes
                  isAllowed={
                    user.isLogged && user.role.includes('admin')
                  }
                />
              }
            >
              <Route path="/usuarios" element={<Usuarios/>} />
              <Route path="/usuarios/create" element={<CreateUser/>} />
            </Route>
            <Route
              element={
                <ProtectedRoutes
                  isAllowed={user.isLogged && user.role.includes('sadmin')}
                />
              }
            >
              <Route path="/estadisticas" element={<h1>estadisticas</h1>} />
              <Route path="/admin" element={<h1>admin</h1>} />
            </Route>
          </Routes>
        </Suspense>
      </SideBar>
    </>
  )
}

export default NavDashboard
