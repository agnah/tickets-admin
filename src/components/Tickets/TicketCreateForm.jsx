import { useForm } from 'react-hook-form'
import Select from '../Form/Input/Select'
import { useState } from 'react'
import InputForm from '../Form/Input/InputForm'
import Button from '../partials/Button/Button'
import DatalistChangeInput from '../Form/Input/DatalistCangeInput'
import solicitantes from '../../../public/assets/solicitantes.json'
import TextArea from '../Form/Input/TextArea'
import { useNavigate } from 'react-router'

const REGEX_EMAIL = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/

const optionListSelect = ['Area Técnica', 'CID', 'Data Center', 'Telefonía']
const datalistSolicitante = solicitantes.map(s => s.nombre)

const TicketCreateForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const navigate = useNavigate()

  const onSubmit = (data) => console.log(data)

  const [solicitanteEmail, setSolicitanteEmail] = useState(null)

  const onChangeSolicitante = (e) => {
    const solicitante = e.target.value
    const solicitanteSeleccionado = solicitantes.find(s => s.nombre === solicitante)
    console.log({ solicitante, solicitanteSeleccionado })
    if (solicitanteSeleccionado) setSolicitanteEmail(solicitanteSeleccionado.email)
  }

  const redirectTickets = () => {
    navigate('/tickets')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
      <div className="row">
        <div className="col-md-6 col-lg-6">
          <h2>Tickets #C0000001</h2>
        </div>
        <div className='col-md-6 col-lg-6 d-flex align-items-center'>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" name="prioridad" />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Prioridad
            </label>
          </div>
        </div>
      </div>
      <hr className="mt-0" />
      <div className="row">
        <>
          <DatalistChangeInput
            idList="datalistSolicitante"
            label="Solicitante"
            name="solicitante"
            placeholder=""
            optionList={datalistSolicitante}
            register={register}
            errors={errors}
            classCol="col-md-4 col-lg-4"
            options={{
              required: 'Campo obligatorio'
            }}
            onChangeSolicitante={onChangeSolicitante}
          />
        </>
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
        />
        <Select
          label="Área"
          name="area"
          placeholder="Selecciona un área"
          optionList={optionListSelect}
          register={register}
          errors={errors}
          classCol="col-md-3 col-lg-3"
          options={{
            required: 'Campo obligatorio'
          }}
        />
        <Select
          label="Piso"
          name="piso"
          placeholder=""
          optionList={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          register={register}
          errors={errors}
          classCol="col-md-1 col-lg-1"
          options={{
            required: 'Campo obligatorio'
          }}
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
          value={solicitanteEmail}
        />
        <InputForm
          label="Teléfono"
          type="text"
          name="telefono"
          placeholder=""
          register={register}
          errors={errors}
          classCol="col-md-2 col-lg-2 form-group item-form"
          options={{
            required: 'Campo obligatorio'
          }}
        />
        <InputForm
          label="Referencia"
          type="text"
          name="referencia"
          placeholder=""
          register={register}
          errors={''}
          classCol="col-md-2 col-lg-2 form-group item-form"
        />
        <InputForm
          label="N° GDE"
          type="text"
          name="gde"
          placeholder=""
          register={register}
          errors={''}
          classCol="col-md-4 col-lg-4 form-group item-form"
        />
      </div>
      <hr className="m-0" />
      <div className="row">
        <TextArea
          label="Motivo"
          name="motivo"
          rows="20"
          register={register}
          errors={errors}
          classCol="col-md-8 col-lg-8 form-group item-form"
          options={{
            required: 'Campo obligatorio'
          }}
        />
        <Select
          label="Área"
          name="area"
          placeholder="Selecciona un área"
          optionList={optionListSelect}
          register={register}
          errors={errors}
          classCol="col-md-4 col-lg-4"
          options={{
            required: 'Campo obligatorio'
          }}
          classInput="area_input"
        />
      </div>
      <div className='d-flex justify-content-end'>
        <Button type="reset" classBoton="mx-1 btn btn-danger" texto="cancelar" onClick={redirectTickets}/>
        <Button type="submit" classBoton="mx-1 btn btn-success" texto="Guardar" />
      </div>
    </form>
  )
}

export default TicketCreateForm
