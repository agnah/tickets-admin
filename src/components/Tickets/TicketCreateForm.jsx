import { useForm } from 'react-hook-form'
import Select from '@components/Form/Input/Select'
import { useState, useRef } from 'react'
import InputForm from '@components/Form/Input/InputForm'
import Button from '../partials/Button/Button'
import DatalistChangeInput from '@components/Form/Input/DatalistCangeInput'
import solicitantes from '../../../public/assets/solicitantes.json'
import TextArea from '@components/Form/Input/TextArea'
import { useNavigate } from 'react-router'
import useAuth from '@servicios/UseAuth'
import { areas } from '@constantes/constAreas'
import DragAndDrop from '../Form/dragAndDrop'

const REGEX_EMAIL = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/

const optionListSelect = ['CSTIMI', 'GDE', 'Computos', 'CID']
const optionCstimi = ['Soporte', 'Telefonia']
const datalistSolicitante = solicitantes.map(s => s.nombre)

const TicketCreateForm = () => {
  const { user } = useAuth()
  const dragAndDropRef = useRef(null)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const navigate = useNavigate()

  const getFilterResult = (filter) => {
    const { MESA_DE_ENTRADA, CSTIMI } = areas
    const opcionesCompartidas = {
      label: 'Área asignada',
      name: 'area_asignada',
      placeholder: 'Selecciona un área',
      register,
      errors,
      classCol: 'col-md-4 col-lg-4',
      options: {
        required: 'Campo obligatorio'
      },
      classInput: 'area_input'
    }
    if (filter.includes(MESA_DE_ENTRADA)) {
      return (
        <Select
        {...opcionesCompartidas}
        optionList={optionListSelect}
        />
      )
    } else if (filter.includes(CSTIMI)) {
      return (
        <Select
        {...opcionesCompartidas}
        optionList={optionCstimi}
        />
      )
    } else {
      return (
        <label htmlFor="area" className="col-md-4 col-lg-4">
          Área asignada:
          <p name="area" id="area" className="form-group item-form">
            {filter}
          </p>
        </label>
      )
    }
  }

  const onSubmit = (data) => {
    const dragAndDropData = dragAndDropRef.current.getData()
    const formData = { ...data, dragAndDropData }
    console.log('Datos a enviar:', formData)
  }

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
          <h2>Ticket</h2>
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
          inputmode="email"
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
          inputmode="tel"
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
        {getFilterResult(user.sector)}
      </div>
      <label>Archivos
      <DragAndDrop
      ref={dragAndDropRef}
      register={register}
      errors={errors}
      />
      </label>
      <div className='d-flex justify-content-end'>
        <Button type="reset" classBoton="mx-1 btn btn-danger" texto="cancelar" onClick={redirectTickets} />
        <Button type="submit" classBoton="mx-1 btn btn-success" texto="Guardar" />
      </div>
    </form>
  )
}

export default TicketCreateForm
