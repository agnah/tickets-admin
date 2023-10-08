import useAuth from '@servicios/UseAuth'
import Tablero from '@components/Tablero/Tablero'
import UserDetail from '../../components/partials/Users/UserDetail'
import { useLocation } from 'react-router-dom'

function Profile () {
  const { user } = useAuth()
  const location = useLocation()
  const datos = location.state
  return (
    <Tablero title="Detalle usuario" page="Usuarios / Detalle usuario">
      <UserDetail user={user} datos={datos}/>
    </Tablero>
  )
}

export default Profile
