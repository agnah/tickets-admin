import { Route, Routes } from 'react-router-dom'
import Login from '@pages/Login/Login'
import ProtectedRoutes from '../../../router/ProtectedRoutes'
import { lazy, Suspense } from 'react'
import SideBar from '../SideBar/SideBar'
import { perfil, rolUsuario } from '@constantes/constUsers'
import useAuth from '@servicios/UseAuth'

function NavDashboard () {
  const { ADMINISTRATIVO, ADMINISTRADOR, TECNICO, SUPERADMIN } = perfil
  const { DIOS, ADMIN, EDITOR } = rolUsuario
  const { user } = useAuth()
  // const Home = lazy(() => import('@pages/Home/Home'))
  const Tickets = lazy(() => import('@pages/Tickets/Tickets'))
  const TicketCreate = lazy(() => import('@pages/Tickets/TicketCreate'))
  const Usuarios = lazy(() => import('@pages/Users/usuarios'))
  const CreateUser = lazy(() => import('@pages/Users/CreateUser'))
  const DetalleTicket = lazy(() => import('@pages/Tickets/DetalleTicket'))
  const DetalleUsuario = lazy(() => import('@pages/Users/DetalleUsuario'))
  const Inicio = lazy(() => import('@pages/Inicio/Inicio'))
  const Tramites = lazy(() => import('@pages/Tramites/Tramites'))
  const TramiteCreate = lazy(() => import('@pages/Tramites/TramiteCreate'))
  const DetalleTramite = lazy(() => import('@pages/Tramites/DetalleTramite'))

  // if (!(user && Object.keys(user).length > 0)) {
  if (!user) {
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

            <Route index element={<Inicio />} />
            <Route path="/404" element={<div>404</div>} />
            {/* <Route path="*" element={<Home />} /> */}
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/usuarios/:id" element={<DetalleUsuario />} />
            <Route path="/estadisticas" element={<h1>estadisticas</h1>} />
            <Route
              element={
                <ProtectedRoutes
                  isAllowed={
                    user.perfil.includes(TECNICO) ||
                    user.perfil.includes(ADMINISTRADOR) ||
                    user.perfil.includes(ADMINISTRATIVO)
                  }
                />
              }>
              <Route path="/tickets" element={<Tickets />} />
              <Route path="/tickets/:id" element={<DetalleTicket />} />
              <Route path="/tickets/create" element={<TicketCreate />} />
            </Route>
            <Route
              element={
                <ProtectedRoutes
                  isAllowed={
                    !user.perfil.includes(TECNICO)
                  }
                />
              }>
              <Route path="/tramites" element={<Tramites />} />
              <Route path="/tramites/create" element={<TramiteCreate />} />
              <Route path="/tramites/:id" element={<DetalleTramite />} />
            </Route>
            <Route
              element={
                <ProtectedRoutes
                  isAllowed={
                    (user.rolUsuario === ADMIN ||
                      user.rolUsuario === EDITOR)
                  }
                />
              }>
              <Route path="/usuarios/create" element={<CreateUser />} />
            </Route>
            <Route
              element={
                <ProtectedRoutes
                  isAllowed={user.perfil.includes(ADMINISTRADOR) || user.perfil.includes(SUPERADMIN) || user.perfil.includes(DIOS)}
                />
              }>
            </Route>
          </Routes>
        </Suspense>
      </SideBar>
    </>
  )
}

export default NavDashboard
