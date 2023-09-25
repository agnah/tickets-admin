import { useForm } from 'react-hook-form'
import InputForm from './Input/InputForm'
import Button from './Button/Button'
import { useNavigate } from 'react-router-dom'
import useAuth from '@servicios/UseAuth'
import './LoginForm.css'

const REGEX_PASSWORD =
  /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
// const REGEX_EMAIL = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/

const LoginForm = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async (credentials) => {
    const result = await login(credentials)
    if (result?.error) {
      alert(result.error)
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
      <div className="row inputLogin">
        <InputForm
          label="Email"
          // type="email"
          type="text"
          name="email"
          inputMode="email"
          placeholder="Ingrese su correo..."
          register={register}
          errors={errors}
          // value="pp@mindes.com"
          classCol="col-md-10 w-100 form-group item-form"
          options={{
            required: 'Campo obligatorio',
            pattern: {
              // value: REGEX_EMAIL,
              message: 'El e-mail tiene que ser valido'
            }
          }}
          display={false}
        />
      </div>
      <div className="row inputLogin">
        <InputForm
          label="Password"
          type="password"
          name="password"
          placeholder="Ingrese su contraseña..."
          register={register}
          errors={errors}
          classCol="col-md-10 w-100 form-group item-form"
          value="Prueba@123"
          options={{
            required: 'Campo obligatorio',
            pattern: {
              value: REGEX_PASSWORD,
              message: 'La contraseña no cumple con el formato requerido'
            }
          }}
          display={false}
        />
      </div>
      <div className="row">
        <div className="col-sm-3 w-100 d-flex justify-content-center">
          <Button title="Ingresar" classes="btn btn-success btn-login" />
        </div>
      </div>
    </form>
  )
}

export default LoginForm
