import { useForm } from 'react-hook-form'
import Input from './Input/Input'
import Button from './Button/Button'
import Select from './Input/Select'
import TextArea from './Input/TextArea'
import RadioButton from './Input/RadioButton'
import Datalist from './Input/Datalist'

const REGEX_PASSWORD =
  /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
const REGEX_EMAIL = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/

const optionListSelect = ['DNI', 'Pasaporte Extranjero']
const optionListRadio = [
  { label: 'Masculino', value: 'masc' },
  { label: 'Femenino', value: 'fem' },
  { label: 'No binario', value: 'nobin' }
]
const optionListData = ['Buenos Aires', 'CABA', 'Salta', 'Santa Cruz']

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) => console.log(data)

  return (
    <>
      <div className="container">
        <div className="row m-b-2">
          <div className="col-md-6 col-md-offset-3">
            <h4 className="activities-sidbar">Ingresá a la plataforma</h4>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              autoComplete="off"
            >
              <div className="row">
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="Ingrese su correo..."
                  register={register}
                  errors={errors}
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
                  placeholder="Ingrese su nombre..."
                  register={register}
                  errors={errors}
                  options={{
                    required: 'Campo obligatorio',
                    pattern: {
                      value: REGEX_PASSWORD,
                      message:
                        'La contraseña no cumple con el formato requerido'
                    }
                  }}
                />
              </div>
              <div className="row">
                <Select
                  label="Tipo de Documento"
                  name="tipoDni"
                  placeholder="Selecciona una opcion..."
                  optionList={optionListSelect}
                  register={register}
                  errors={errors}
                  options={{
                    required: 'Campo obligatorio'
                  }}
                />
              </div>
              <div className="row">
                <Datalist
                  idList="datalistCiudad"
                  label="Seleccione una ciudad"
                  name="ciudad"
                  placeholder="Escriba para buscar..."
                  optionList={optionListData}
                  register={register}
                  errors={errors}
                  options={{
                    required: 'Campo obligatorio'
                  }}
                />
              </div>
              <div className="row">
                <TextArea
                  label="Comentarios"
                  name="comentarios"
                  rows="5"
                  register={register}
                  errors={errors}
                  options={{
                    required: 'Campo obligatorio'
                  }}
                />
              </div>
              <div className="row">
                <RadioButton
                  label="Sexo"
                  name="sexo"
                  optionList={optionListRadio}
                  register={register}
                  options={{
                    required: 'Seleccione una opcion'
                  }}
                  errors={errors}
                />
              </div>
              <div className="row">
                <div className="col-sm-3">
                  <Button title="INGRESAR" classes="btn btn-success" />
                </div>
              </div>
              <div className="row">
                <div className="col-xs-10">
                  <hr />
                </div>
              </div>
            </form>

            <div className="row">
              <div className="col-xs-12">
                <p>
                  <a href="#">Recuperar mi contraseña</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginForm
