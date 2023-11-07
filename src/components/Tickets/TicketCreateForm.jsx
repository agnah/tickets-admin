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
import DragAndDrop from '../Form/dragAndDrop'
import SelectWithOption from '../Form/Input/SelectWithOption'
import './TicketCreateForm.css'

const REGEX_EMAIL = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/

const optionListSelect = [
  'COMPUTOS',
  'TELEFONIA',
  'SOPORTE',
  'SISTEMAS',
  'GDE'
]
const optionListAreaSolicitante = [
  'ADMINISTRACION',
  'RRHH',
  'CONTABILIDAD',
  'LEGALES'
]
const sedes = ['NUEVE_DE_JULIO', 'ANEXO1', 'ANEXO2', 'ANEXO3']
const datalistSolicitante = solicitantes.map((s) => s.email)

const TicketCreateForm = ({ prioridad }) => {
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState('')
  const { user } = useAuth()
  const dragAndDropRef = useRef(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    // const dragAndDropData = dragAndDropRef.current.getData();
    // const formData = { ...data, dragAndDropData, prioridad };
    const formData = { ...data }
    if (user.sector !== 'GDE') {
      formData.area_asignada =
        optionListSelect.indexOf(user.sector.toUpperCase()) + 1
    }
    console.log(formData)
    // let images = dragAndDropData.map((image) => image.name).join(";");
    const body = {
      email_solicitante: formData.email,
      nombre_solicitante: formData.solicitante,
      telefono_solicitante: formData.telefono,
      celular_solicitante: formData.telefono,
      area_solicitante:
        optionListAreaSolicitante[formData.area_solicitante - 1].toLowerCase(),
      sede_solicitante: 'nueve_de_julio',
      piso_solicitante: formData.piso,
      referencia: formData.referencia,
      area_asignada_id: Number(formData.area_asignada),
      prioridad: formData.prioridad ? 'alta' : 'baja',
      estado: 'pendiente',
      descripcion: formData.motivo
      // archivos: images,
    }
    console.log(body)
    const response = await fetch('http://localhost:8000/api/tickets', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const result = await response.json()
    reset()
    reset({ area_asignada: user.sector.toUpperCase() })
    if (result?.id !== null) {
      setMessage(`El ticket se genero correctamente. Referencia: ${result?.identificador}`)
      setShow(!show)
    }
  }

  const redirectTickets = () => {
    navigate('/tickets')
  }

  return (
    <>
      {show && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          {message}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => {
              setShow(!show)
            }}
          ></button>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <div className="row">
          <InputForm
            label="Solicitante"
            type="text"
            name="solicitante"
            placeholder=""
            register={register}
            errors={errors}
            classCol="col-4 form-group"
            options={{
              required: 'Campo obligatorio'
            }}
          />
          <DatalistChangeInput
            idList="datalistSolicitante"
            label="Email"
            name="email"
            placeholder=""
            optionList={datalistSolicitante}
            register={register}
            errors={errors}
            classCol="col-4 align-items-start "
            options={{
              required: 'Campo obligatorio',
              pattern: {
                value: REGEX_EMAIL,
                message: 'El e-mail tiene que ser valido'
              }
            }}
          />
          <InputForm
            label="Teléfono"
            type="text"
            name="telefono"
            placeholder=""
            register={register}
            errors={errors}
            classCol="col-2 form-group"
            inputMode="tel"
            options={{
              required: 'Campo obligatorio'
            }}
          />
          <InputForm
            label="N° GDE"
            type="text"
            name="gde"
            placeholder=""
            register={register}
            errors={''}
            classCol="col-2 form-group"
          />
        </div>
        <div className="col-12 d-flex justify-content-between">
          <Select
            label="Sede"
            name="sede"
            placeholder="Selecciona una sede"
            optionList={sedes}
            register={register}
            errors={errors}
            classCol="col-3 align-items-start mt-2"
            options={{
              required: 'Campo obligatorio'
            }}
          />
          <Select
            label="Área Solicitante"
            name="area_solicitante"
            placeholder="Selecciona un área"
            optionList={optionListAreaSolicitante}
            register={register}
            errors={errors}
            classCol="col-4 align-items-start mt-2"
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
            classCol="col-2 align-items-start mt-2"
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
            classCol="col-3 form-group mt-2"
          />
        </div>

        <hr />
        <div className="row">
          <TextArea
            label="Motivo"
            name="motivo"
            rows="20"
            register={register}
            errors={errors}
            classCol="col-6 form-group"
            options={{
              required: 'Campo obligatorio'
            }}
            placeholder="Motivo por el cual precisa asistencia."
          />
          {user.sector.includes('gde')
            ? (
              <Select
                label="Área Asignada"
                name="area_asignada"
                placeholder="Selecciona un área"
                optionList={optionListSelect}
                register={register}
                errors={errors}
                classCol="align-items-start col-3 form-group"
                options={{
                  required: 'Campo obligatorio'
                }}
              />
            )
            : (
              <SelectWithOption
                label="Sector"
                name="area_asignada"
                optionList={optionListSelect}
                register={register}
                errors={''}
                classCol="align-items-start col-3 form-group"
                selectedOption={user.sector.toUpperCase()}
                onChangeInput={''}
                isDisable={true}
              />
            )}
          <div className="form-create-prioridad col-2 mt-2">
            <input
              className="check-prioridad-form"
              type="checkbox"
              id="flexCheckDefault"
              name="prioridad_ticket"
              {...register('prioridad')}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Prioridad
            </label>
          </div>
        </div>

        {/* <label className='label-dragAndDrop'>Archivos
        <DragAndDrop
          ref={dragAndDropRef}
          register={register}
          errors={errors}
        />
      </label> */}
        <div className="d-flex justify-content-end">
          <Button
            type="reset"
            classBoton="btn-action btn-danger"
            texto="Cancelar"
            onClick={redirectTickets}
          />
          <Button
            type="submit"
            classBoton="btn-action btn-success"
            texto="Crear"
          />
        </div>
      </form>
    </>
  )
}

export default TicketCreateForm
