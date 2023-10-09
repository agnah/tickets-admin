import { useForm } from 'react-hook-form'
import InputForm from '@components/Form/Input/InputForm'
import Select from '@components/Form/Input/select2'
import Button from '../Button/Button'
import useAuth from '@servicios/UseAuth'
import { useState } from 'react'

const REGEX_EMAIL = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/
const optionListArea = ['soportes', 'telefonia', 'computos', 'sistemas', 'gde']
const optionListSede = ['9 de Julio', 'Av. de Mayo', 'Moreno']
const optionListPerfil = ['administrativo', 'tecnico', 'administrador', 'superadmin']
const optionListRol = ['admin', 'editor', 'Lector']

const CreateUserForm = () => {
  const { user } = useAuth()
  const [selectedAreaIndex, setSelectedAreaIndex] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  // const handleAreaChange = (selectedIndex) => {
  //   console.log('Selected Area Index:', selectedIndex)
  //   setSelectedAreaIndex(selectedIndex)
  // }
  const handleAreaChange = (selectedIndex) => {
    setSelectedAreaIndex(selectedIndex)
  }

  // const onSubmit = (data) => console.log(data)
  const onSubmit = async (data) => {
    const formData = { ...data }
    if (user.sector[0] !== 'GDE') {
      formData.area_id =
        optionListArea.indexOf(user.sector[0].toUpperCase()) + 1
    }
    console.log(formData)

    const body = {
      nombre: formData.nombre,
      apellido: formData.apellido,
      email: formData.email,
      celular: formData.celular,
      telefono: formData.telefono,
      interno: formData.interno,
      area_id: selectedAreaIndex !== null ? selectedAreaIndex + 1 : '',
      piso: formData.piso,
      perfil: formData.perfil,
      rol: formData.rol,
      token: user.token
    }

    const jsonString = JSON.stringify(body)
    console.log(jsonString)

    const response = await fetch('http://localhost:8000/api/usuario', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const result = await response.json()
    console.log(result)
    reset()

    // if (result?.id !== null) {
    //   setShow(!show) // Asegúrate de definir `show` antes de usarlo
    // }
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
          classCol="col-md-4 col-lg-4"
          valueType="index"
          onChangeInput={handleAreaChange}
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
          valueType="value"
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
          // valueType="value"
          options={{
            required: 'Campo obligatorio'
          }}
        />
        <Select
          label="Rol"
          name="rol"
          placeholder="Seleccione Rol"
          optionList={optionListRol.map(String)}
          register={register}
          errors={errors}
          classCol="col-md-4 col-lg-4"
          valueType="value"
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
