import { useForm } from 'react-hook-form'
import InputForm from '@components/Form/Input/InputForm'
import Select from '@components/Form/Input/Select'
import Button from '../Button/Button'

const REGEX_EMAIL = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/
const optionListSelect = ['Cómputos', 'Soporte Técnico', 'Telefonía', 'Cid', 'GDE', 'Mesa de Entrada']
const optionListSede = ['9 de Julio', 'Av. de Mayo', 'Moreno']
const optionListPerfil = ['Operador - Mesa de Entrada', 'Colaborador', 'Responsable de Area', 'Coordinador CSTIMI', 'Director??']
const optionListRol = ['Administrador', 'Editor', 'Lector']

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
            // required: 'Campo obligatorio'
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
            // required: 'Campo obligatorio'
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
          inputmode="email"
          options={{
            required: 'Campo obligatorio',
            pattern: {
              value: REGEX_EMAIL,
              message: 'El e-mail tiene que ser valido'
            }
          }}
        />
        <InputForm
          label="Celular"
          type="tel"
          name="celular"
          placeholder=""
          register={register}
          errors={errors}
          classCol="col-md-4 col-lg-4 form-group item-form"
          inputmode="tel"
          options={{
            pattern: {
              message: 'Solo numeros'
            }
          }}
        />
        <InputForm
          label="Teléfono"
          type="tel"
          name="telefono"
          placeholder=""
          register={register}
          errors={errors}
          classCol="col-md-4 col-lg-4 form-group item-form"
          inputmode="tel"
          options={{
            pattern: {
              message: 'Solo numeros'
            }
          }}
        />
        <InputForm
          label="Interno"
          type="interno"
          name="interno"
          placeholder=""
          register={register}
          errors={errors}
          inputmode="numeric"
          classCol="col-md-4 col-lg-4 form-group item-form"
          options={{
            pattern: {
              message: 'Solo numeros'
            }
          }}
        />
        <Select
          label="Area"
          name="area"
          placeholder="Seleccione Area"
          optionList={optionListSelect}
          register={register}
          errors={errors}
          classCol="col-md-4 col-lg-4"
          options={{
            required: 'Campo obligatorio'
          }}
        />
        <Select
          label="Sede"
          name="sede"
          placeholder="Seleccione Sede"
          optionList={optionListSede}
          register={register}
          errors={errors}
          classCol="col-md-4 col-lg-4"
          options={{
            required: 'Campo obligatorio'
          }}
        />
        <Select
          label="Piso"
          name="piso"
          placeholder="Piso"
          optionList={['PB', 1, 2, 3, 4, 5, 6, 7, 8, 9]}
          register={register}
          errors={errors}
          classCol="col-md-1 col-lg-1"
          options={{
            // required: 'Campo obligatorio'
          }}
        />
        <Select
          label="Perfil"
          name="perfil"
          placeholder="Seleccione Perfil"
          optionList={optionListPerfil}
          register={register}
          errors={errors}
          classCol="col-md-4 col-lg-4"
          options={{
            required: 'Campo obligatorio'
          }}
        />
        <Select
          label="Rol"
          name="rol"
          placeholder="Seleccione Rol"
          optionList={optionListRol}
          register={register}
          errors={errors}
          classCol="col-md-4 col-lg-4"
          options={{
            required: 'Campo obligatorio'
          }}
        />
      </div>
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
