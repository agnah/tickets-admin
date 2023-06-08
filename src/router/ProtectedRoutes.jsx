import { Outlet, Navigate } from 'react-router-dom'

function ProtectedRoutes ({ isAllowed, children, redirectTo = '/' }) {
  if (!isAllowed) {
    return <Navigate to={redirectTo} />
  }
  return children || <Outlet />
}

export default ProtectedRoutes
