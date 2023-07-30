import { useForm } from 'react-hook-form'
import InputForm from '../../Form/Input/InputForm'
import Select from '../../Form/Input/Select'
import Button from '../Button/Button'

const REGEX_PASSWORD =
  /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
const REGEX_EMAIL = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/
const optionListSelect = ['Area Técnica', 'CID', 'Data Center', 'Telefonía']

const CreateUserForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
      <div className="row">
        <InputForm
          label="Nombre"
          type="text"
          name="nombre"
          placeholder="Ingrese su nombre..."
          register={register}
          errors={errors}
          classCol="col-md-4 col-lg-4 form-group item-form"
          options={{
            required: 'Campo obligatorio'
          }}
        />
        <InputForm
          label="Apellido"
          type="text"
          name="apellido"
          placeholder="Ingrese su apellido..."
          register={register}
          errors={errors}
          classCol="col-md-4 col-lg-4 form-group item-form"
          options={{
            required: 'Campo obligatorio'
          }}
        />
        <InputForm
          label="Email"
          type="email"
          name="email"
          placeholder="Ingrese su correo..."
          classCol="col-md-4 col-lg-4 form-group item-form"
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
        <InputForm
          label="Password"
          type="password"
          name="password"
          placeholder=""
          register={register}
          errors={errors}
          classCol="col-md-4 col-lg-4 form-group item-form"
          options={{
            required: 'Campo obligatorio',
            pattern: {
              value: REGEX_PASSWORD,
              message: 'La contraseña no cumple con el formato requerido'
            }
          }}
        />
        <InputForm
          label="Confirmar Password"
          type="password"
          name="confirmPassword"
          placeholder=""
          register={register}
          errors={errors}
          classCol="col-md-4 col-lg-4 form-group item-form"
          options={{
            required: 'Campo obligatorio',
            pattern: {
              value: REGEX_PASSWORD,
              message: 'La contraseña no cumple con el formato requerido'
            }
          }}
        />
        <Select
          label="Area"
          name="area"
          placeholder=""
          optionList={optionListSelect}
          register={register}
          errors={errors}
          classCol="col-md-4 col-lg-4"
          options={{
            required: 'Campo obligatorio'
          }}
        />
      </div>
      {/* <div className="row">
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
    </div> */}
      <div className="row">
        <div className="col-sm-3">
          <Button
            type="submit"
            classBoton="mx-1 btn btn-success"
            texto="Guardar"
          />
        </div>
      </div>
    </form>
  )
}

export default CreateUserForm
