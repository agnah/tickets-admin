import { Route, Routes } from 'react-router-dom'
import Login from '../../../pages/Login/Login'
import ProtectedRoutes from '../../../router/ProtectedRoutes'
import { lazy, Suspense } from 'react'
import SideBar from '../SideBar/SideBar'
import { sector, perfil, rolUsuario } from '../../../constantes/constUsers'
import useAuth from '../../../servicios/UseAuth'

function NavDashboard() {
  const { user } = useAuth()
  const Home = lazy(() => import('../../../pages/Home/Home'))
  const Tickets = lazy(() => import('../../../pages/Tickets/Tickets'))
  const TicketCreate = lazy(() => import('../../../pages/Tickets/TicketCreate'))
  const Usuarios = lazy(() => import('../../../pages/Users/usuarios'))
  const CreateUser = lazy(() => import('../../../pages/Users/CreateUser'))
  const DetalleTicket = lazy(() => import('../../../pages/Tickets/DetalleTicket'))
  const DetalleUsuario = lazy(() => import('../../../pages/Users/DetalleUsuario'))

  if (!(user && Object.keys(user).length > 0)) {
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
            <Route path="*" element={<Home />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/tickets/:id" element={<DetalleTicket />} />
            <Route path="/dashboard" element={<Home />} />
            <Route
              element={
                <ProtectedRoutes
                  isAllowed={
                    user.sector.includes(sector.MESA_DE_ENTRADA) ||
                    user.perfil.includes(perfil.ADMINISTRADOR)
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
                    (user.rolUsuario === rolUsuario.ADMIN ||
                      user.rolUsuario === rolUsuario.EDITOR)
                  }
                />
              }
            >
              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="/usuarios/create" element={<CreateUser />} />
              <Route path="/usuarios/:id" element={<DetalleUsuario />} />
            </Route>
            <Route
              element={
                <ProtectedRoutes
                  isAllowed={user.perfil.includes(perfil.ADMINISTRADOR)}
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
