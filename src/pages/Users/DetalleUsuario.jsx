import { authContext } from '../../components/partials/Nav/useAuth'
import { useContext } from 'react'

function Profile () {
  const { user } = useContext(authContext)
  return (
    <div>
      Sector: {user.sector} Perfil: {user.perfil} Rol Usuario: {user.rolUsuario}
      {/* <h2>Perfil del Usuario</h2>
      <p>Nombre: {user.nombre}</p>
      <p>Email: {user.email}</p>
      <p>Rol: {user.role}</p>
      <p>Estado: {user.estado}</p>
      <p>Sector: {user.sector}</p>
      <p>Perfil: {user.perfil}</p>
      <p>Rol Usuario: {user.rolUsuario}</p>
      <p>Estado Usuario: {user.estadoUsuario}</p> */}
    </div>
  )
}

export default Profile
