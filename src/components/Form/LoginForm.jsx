import { useForm } from 'react-hook-form'
import Input from './Input/Input'
import Button from './Button/Button'
import { useAuth } from '../partials/Nav/useAuth'
import { Navigate } from 'react-router-dom'

const REGEX_PASSWORD =
  /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
const REGEX_EMAIL = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/

const LoginForm = () => {
  const { user, login } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    const result = await login(data)

    if (result?.error) {
      alert(result.error)
    } else {
      console.log(user)
      return <Navigate to="/tickets"/>
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
      <div className="row">
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="Ingrese su correo..."
          register={register}
          errors={errors}
          value="pp@mindes.com"
          options={{
            required: 'Campo obligatorio',
            pattern: {
              value: REGEX_EMAIL,
              message: 'El e-mail tiene que ser valido'
            }
          }}
        />
      </div>
      <div className="row">
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Ingrese su contraseña..."
          register={register}
          errors={errors}
          value="Prueba@123"
          options={{
            required: 'Campo obligatorio',
            pattern: {
              value: REGEX_PASSWORD,
              message: 'La contraseña no cumple con el formato requerido'
            }
          }}
        />
      </div>
      <div className="row">
        <div className="col-sm-3 w-100 d-flex justify-content-center">
          <Button title="INGRESAR" classes="btn btn-success" />
        </div>
      </div>
    </form>
  )
}

export default LoginForm
