import { useForm } from 'react-hook-form'
import Select from '../Form/Input/Select'
import { useState } from 'react'
import InputForm from '../Form/Input/InputForm'
import Button from '../partials/Button/Button'
const optionListSelect = ['Area Técnica', 'CID', 'Data Center', 'Telefonía']
const REGEX_EMAIL = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/

const TicketCreateForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const [display, setDisplay] = useState(true)

  const onSubmit = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
      <div className="row">
        <Select
          label="Area Asignada"
          name="area2"
          placeholder="Selecciona un departamento"
          optionList={optionListSelect}
          register={register}
          errors={errors}
          classCol="col-md-6 col-lg-6"
          options={{
            required: 'Campo obligatorio'
          }}
          displayFields={setDisplay}
          display="true"
        />
        <div className='col-md-6 col-lg-6 d-flex align-items-center'>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" name="prioridad"/>
            <label class="form-check-label" for="flexCheckDefault">
              Prioridad
            </label>
          </div>
        </div>
      </div>

      <hr className="mt-0" />
      <div className="row">
        <Select
          label="Sede"
          name="sede"
          placeholder="Selecciona una sede"
          optionList={optionListSelect}
          register={register}
          errors={errors}
          classCol="col-md-4 col-lg-4"
          options={{
            required: 'Campo obligatorio'
          }}
          display={display}
        />
        <Select
          label="Área"
          name="area"
          placeholder="Selecciona una áreas"
          optionList={optionListSelect}
          register={register}
          errors={errors}
          classCol="col-md-4 col-lg-4"
          options={{
            required: 'Campo obligatorio'
          }}
          display={display}
        />
        <Select
          label="Solicitante"
          name="solicitante"
          placeholder=""
          optionList={optionListSelect}
          register={register}
          errors={errors}
          classCol="col-md-4 col-lg-4"
          options={{
            required: 'Campo obligatorio'
          }}
          display={display}
        />
      </div>
      <div className="row">
        <InputForm
          label="Email"
          type="email"
          name="email"
          placeholder=""
          register={register}
          errors={errors}
          classCol="col-md-4 col-lg-4 form-group item-form"
          options={{
            required: 'Campo obligatorio',
            pattern: {
              value: REGEX_EMAIL,
              message: 'El e-mail tiene que ser valido'
            }
          }}
          display={display}
        />
        <InputForm
          label="Teléfono"
          type="text"
          name="telefono"
          placeholder=""
          register={register}
          errors={errors}
          classCol="col-md-4 col-lg-4 form-group item-form"
          options={{
            required: 'Campo obligatorio'
          }}
          display={display}
        />
        <InputForm
          label="Celular"
          type="text"
          name="celular"
          placeholder=""
          register={register}
          errors={errors}
          classCol="col-md-4 col-lg-4 form-group item-form"
          options={{
            required: 'Campo obligatorio'
          }}
          display={display}
        />
      </div>
      <hr className="m-0" />
      <div className="row">
        <InputForm
          label="Archivos"
          type="file"
          name="files"
          placeholder=""
          register={register}
          errors={errors}
          classCol="col-md-4 col-lg-4 form-group item-form"
          options={{
            required: 'Campo obligatorio'
          }}
          display={display}
        />
        <Select
          label="Pretarea"
          name="pretarea"
          placeholder=""
          optionList={optionListSelect}
          register={register}
          errors={errors}
          classCol="col-md-4 col-lg-4"
          options={{
            required: 'Campo obligatorio'
          }}
          display={display}
        />
        <InputForm
          label="Observaciones"
          type="text"
          name="observaciones"
          placeholder=""
          register={register}
          errors={errors}
          classCol="col-md-4 col-lg-4 form-group item-form"
          options={{
            required: 'Campo obligatorio'
          }}
          display={display}
        />
      </div>
      <div className='d-flex justify-content-end'>
          <Button type="reset" classBoton="mx-1 btn btn-danger" texto="cancelar"/>
          <Button type="submit" classBoton="mx-1 btn btn-success" texto="Guardar"/>
      </div>
    </form>
  )
}

export default TicketCreateForm
