import Tablero from '@components/Tablero/Tablero'
import CreateUserForm from '@components/partials/Users/CreateUserForm'

const CreateUser = () => {
  return (
    <Tablero title="Nuevo usuario" page="Usuarios / Nuevo usuario">
      <CreateUserForm />
    </Tablero>
  )
}

export default CreateUser
