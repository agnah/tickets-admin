import { Route, Routes } from 'react-router-dom'
import NavItem from './NavItem'
import Login from '../../../pages/Login/Login'
import Home from '../../../pages/Home/Home'
import ProtectedRoutes from '../../../router/ProtectedRoutes'
import Button from '../../partials/Button/Button'
import { useAuth } from './useAuth'

function NavDashboard () {
  const { user, login, loginAdmin, loginOperador, logout } = useAuth()

  if (!user.isLogged) {
    return (
            <>
                <Button onClick={login} texto="login usuario" icon="fa fa-sign-in-alt" />
                <Button onClick={loginOperador} texto="login operador" icon="fa fa-sign-in-alt" />
                <Button onClick={loginAdmin} texto="login admin" icon="fa fa-sign-in-alt" />

                <Routes>
                    <Route index element={<Login />} />
                    <Route path="*" element={<Login />} />
                </Routes>
            </>
    )
  }
  return (
        <>
            <nav>
                <NavItem to="/requerimientos" texto="Requerimientos" icon="fa fa-plus" />
                {user.isLogged && user.role.includes('operador') && (
                    <>
                        <NavItem to="/dashboard" texto="Dashboard" icon="fa-solid fa-gauge" />
                        <NavItem to="/tickets" texto="Tickets" icon="fa fa-ticket" />
                    </>
                )}
                {user.isLogged && user.role.includes('admin') && (
                    <>
                        <NavItem to="/estadisticas" texto="Estadisticas" icon="fa fa-chart-bar" />
                        <NavItem to="/admin" texto="Admin" icon="fa fa-user-cog" />
                    </>
                )}
                <Button onClick={logout} texto="logout" icon="fa fa-sign-in-alt" />
                <small> hola {user.user}</small>
            </nav>
            <Routes>
                <Route index element={<h1>carga de requerimiento + lista</h1>} />
                <Route path="/404" element={<div>404</div>} />
                <Route path="*" element={<h1>carga de requerimiento + lista</h1>} />
                <Route path='/requerimientos' element={<h1>carga de requerimiento + lista</h1>} />'
                <Route element={<ProtectedRoutes
                    isAllowed={user.isLogged && user.role.includes('operador', 'admin')}
                />}>
                    <Route path="/dashboard" element={<h1>dashboard</h1>} />
                    <Route path="/tickets" element={<Home />} />
                </Route>
                <Route element={<ProtectedRoutes
                    isAllowed={user.isLogged && user.role.includes('admin')} />}>
                    <Route path="/estadisticas" element={<h1>estadisticas</h1>} />
                    <Route path="/admin" element={<h1>admin</h1>} />
                </Route>
            </Routes>
        </>
  )
}

export default NavDashboard
