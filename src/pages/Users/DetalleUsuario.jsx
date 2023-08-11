import useAuth from '@servicios/UseAuth'

function Profile () {
  const { user } = useAuth()
  return (
    <div>
      Sector: {user?.sector} Perfil: {user?.perfil} Rol Usuario: {user?.rolUsuario} Nombre: {user?.nombre}
    </div>
  )
}

export default Profile
