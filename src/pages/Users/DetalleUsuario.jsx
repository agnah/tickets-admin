import useAuth from '@servicios/UseAuth'
import Tablero from '@components/Tablero/Tablero'
import UserDetail from '../../components/partials/Users/UserDetail'

function Profile () {
  const { user } = useAuth()
  return (
    <Tablero title="Detalle usuario" page="Usuarios / Detalle usuario">
      <UserDetail user={user} />
    </Tablero>
  )
}

export default Profile
