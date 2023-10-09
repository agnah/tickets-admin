import useAuth from '@servicios/UseAuth'
import Tablero from '@components/Tablero/Tablero'
// import UserDetail from '../../components/partials/Users/UserDetail'
import UserDetail2 from '../../components/partials/Users/userDetail2'
import { useLocation } from 'react-router-dom'

function Profile () {
  const { user } = useAuth()
  const location = useLocation()
  const datos = location.state
  return (
    <Tablero title="Detalle usuario" page="Usuarios / Detalle usuario">
      {/* <UserDetail user={user} datos={datos}/> */}
      <UserDetail2 user={user} datos={datos}/>
    </Tablero>
  )
}

export default Profile
