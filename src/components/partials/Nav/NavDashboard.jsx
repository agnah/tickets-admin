import { Route, Routes } from 'react-router-dom'
import Login from '../../../pages/Login/Login'
import ProtectedRoutes from '../../../router/ProtectedRoutes'
import { useAuth } from './useAuth'
import { lazy, Suspense } from 'react'
import SideBar from '../SideBar/SideBar'
import Tickets from '../../../pages/Tickets/Tickets'

function NavDashboard () {
  // const { user, logout } = useAuth()
  const { user } = useAuth()
  console.log(user)
  const Home = lazy(() => import('../../../pages/Home/Home'))

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
            <Route index element={<h1>carga de requerimiento + lista</h1>} />
            <Route path="/404" element={<div>404</div>} />
            <Route path="*" element={<h1>carga de requerimiento + lista</h1>} />
            <Route
              path="/requerimientos"
              element={<h1>carga de requerimiento + lista</h1>}
            />
            '
            <Route element={<ProtectedRoutes isAllowed={user.isLogged} />}>
              <Route path="/dashboard" element={<Home />} />
              <Route path="/tickets" element={<Tickets />} />
            </Route>
            <Route
              element={
                <ProtectedRoutes
                  isAllowed={
                    user.isLogged && user.role.includes('mesa_entrada')
                  }
                />
              }
            >
              <Route path="/tickets/create" element={<h1>Create Item</h1>} />
            </Route>
            <Route
              element={
                <ProtectedRoutes
                  isAllowed={user.isLogged && user.role.includes('admin')}
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
