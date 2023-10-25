import { useForm } from 'react-hook-form'
import InputForm from '@components/Form/Input/InputForm'
import Select from '@components/Form/Input/select2'
import Button from '../Button/Button'
import useAuth from '@servicios/UseAuth'
import { areas } from '../../../constantes/constAreas'
import { rolUsuario } from '../../../constantes/constUsers'
import { apis } from '../../../constantes/constApis'

const REGEX_EMAIL = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/

const CreateUserForm = () => {
  const { user } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()
  const { COMPUTOS, TELEFONIA, SOPORTES, SISTEMAS, GDE } = areas
  const { ADMIN, DIOS } = rolUsuario

  let { optionListArea, optionListPerfil, optionListRol } = []
  const optionListSede = ['nueve_de_julio', 'anexo1', 'anexo2', 'anexo3']
  const rolSelect = user.rolUsuario === ADMIN || user.rolUsuario === DIOS ? optionListRol = ['admin', 'editor', 'lector'] : optionListRol = ['editor', 'lector']
  switch (user.sector) {
    case COMPUTOS:
      optionListArea = ['computos']
      optionListPerfil = ['tecnico']
      optionListRol = rolSelect
      break
    case TELEFONIA:
      optionListArea = ['telefonia']
      optionListPerfil = ['tecnico']
      optionListRol = rolSelect
      break
    case SOPORTES:
      optionListArea = ['soportes']
      optionListPerfil = ['tecnico']
      optionListRol = rolSelect
      break
    case SISTEMAS:
      optionListArea = ['sistemas']
      optionListPerfil = ['tecnico']
      optionListRol = rolSelect
      break
    case GDE:
      optionListArea = ['gde']
      optionListPerfil = ['administrativo']
      optionListRol = rolSelect
      break
    default:
      optionListArea = ['computos', 'telefonia', 'soportes', 'sistemas', 'gde']
      optionListPerfil = ['superadmin', 'administrador', 'tecnico', 'administrativo']
      optionListRol = ['admin', 'editor', 'lector']
      break
  }

  const areaMapping = {
    1: 'computos',
    2: 'telefonia',
    3: 'soporte',
    4: 'sistemas',
    5: 'gde'
  }

  const idSector = (sector) => {
    const entry = Object.entries(areaMapping).find(([, value]) => value === sector)
    return entry ? parseInt(entry[0], 10) : null
  }

  const onSubmit = async (data) => {
    try {
      const formData = { ...data }
      const formDataAreaId = idSector(formData.area_id)
      console.log(formDataAreaId)
      console.log(formData)
      const body = {
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        celular: formData.celular,
        telefono: formData.telefono,
        interno: formData.interno,
        area_id: formDataAreaId,
        piso: formData.piso,
        perfil: formData.perfil,
        rol: formData.rol,
        token: user.token
      }
      const response = await fetch(apis.API_CREAR_USUARIO, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!response.ok) {
        throw new Error('Error al crear el usuarior')
      }
      await response.json()
      console.log('agregado con exito')
      reset()
    } catch (error) {
      console.error(error)
    }
  }

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
          inputMode="email"
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
          inputMode="tel"
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
          inputMode="tel"
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
          inputMode="numeric"
          classCol="col-md-4 col-lg-4 form-group item-form"
          options={{
            pattern: {
              message: 'Solo numeros'
            }
          }}
        />
        <Select
          label="Area"
          name="area_id"
          placeholder="Seleccione Area"
          optionList={optionListArea}
          register={register}
          errors={errors}
          value={user.sector}
          classCol="col-md-4 col-lg-4"
          options={{
            required: 'Campo obligatorio'
          }} /><Select
          label="Sede"
          name="sede"
          placeholder="Seleccione Sede"
          optionList={optionListSede}
          register={register}
          errors={errors}
          classCol="col-md-4 col-lg-4"
          options={{
            required: 'Campo obligatorio'
          }} /><Select
          label="Piso"
          name="piso"
          placeholder="Piso"
          optionList={['PB', 1, 2, 3, 4, 5, 6, 7, 8, 9]}
          register={register}
          errors={errors}
          classCol="col-md-1 col-lg-1"
          options={{
            // required: 'Campo obligatorio'
          }} /><Select
          label="Perfil"
          name="perfil"
          placeholder="Seleccione Perfil"
          optionList={optionListPerfil}
          register={register}
          errors={errors}
          classCol="col-md-4 col-lg-4"
          options={{
            required: 'Campo obligatorio'
          }} /><Select
          label="Rol"
          name="rol"
          placeholder="Seleccione Rol"
          optionList={optionListRol}
          register={register}
          errors={errors}
          classCol="col-md-4 col-lg-4"
          options={{
            required: 'Campo obligatorio'
          }} />
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
