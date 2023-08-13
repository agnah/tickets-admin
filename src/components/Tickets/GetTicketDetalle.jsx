import React, { useState } from 'react'
import Button from '../partials/Button/Button'
import Select from 'react-select'
// import ButtonEdit from '../partials/Button/ButtonEdit'
import { useForm } from 'react-hook-form'
import solicitantes from '../../../public/assets/solicitantes.json'
import DatalistChangeInput from '../../components/Form/Input/DatalistCangeInput'
import InputForm from '../../components/Form/Input/InputForm'
import SelectInput from '../../components/Form/Input/Select'
import TextArea from '../../components/Form/Input/TextArea'

const tecnicos = [
  { value: 'juan', label: 'Juan' },
  { value: 'pedro', label: 'Pedro' },
  { value: 'maria', label: 'Maria' },
  { value: 'luis', label: 'Luis' },
  { value: 'jose', label: 'Jose' },
  { value: 'laura', label: 'Laura' }
]

const datalistSolicitante = solicitantes.map((s) => s.nombre)
const optionListSelect = ['CSTIMI', 'GDE', 'Computos', 'CID']

const REGEX_EMAIL = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/

const GetTicketDetalle = ({ ticket }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const [ticketInfo, setTicketInfo] = useState({
    solicitante: ticket.solicitante,
    email: ticket.email,
    fecha: ticket.fecha,
    telefono: ticket.telefono,
    area: ticket.area,
    sede: ticket.sede,
    piso: ticket.piso,
    referencia: ticket.referencia,
    pre_tarea: ticket.pre_tarea,
    motivo: 'Un motivo valido'
  })
  const [showSelect, setShowSelect] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [edit, setEdit] = useState(false)
  const [solicitanteEmail, setSolicitanteEmail] = useState(ticketInfo.email)

  const handleSelectTecnico = () => {
    setShowSelect(!showSelect)
  }

  const handleSelectChange = (selected) => {
    setSelectedOption(selected)
  }

  const handleEdit = () => {
    setEdit(!edit)
  }

  const handleCancelEdit = () => {
    setEdit(!edit)
    setTicketInfo({
      solicitante: ticket.solicitante,
      email: ticket.email,
      fecha: ticket.fecha,
      telefono: ticket.telefono,
      area: ticket.area,
      sede: ticket.sede,
      piso: ticket.piso,
      referencia: ticket.referencia,
      pre_tarea: ticket.pre_tarea,
      motivo: 'Un motivo valido'
    })
    setSolicitanteEmail(ticket.email)
  }

  const onSubmit = (data) => {
    setTicketInfo({ ...ticketInfo, ...data, email: solicitanteEmail })
    console.log(data)
    setEdit(!edit)
  }

  const onChangeSolicitante = (e) => {
    onChangeInput(e)
    const solicitante = e.target.value
    const solicitanteSeleccionado = solicitantes.find(
      (s) => s.nombre === solicitante
    )
    console.log({ solicitante, solicitanteSeleccionado })
    if (solicitanteSeleccionado) {
      setSolicitanteEmail(solicitanteSeleccionado.email)
    }
  }

  const onChangeInput = (e) => {
    const { value, name } = e.target
    setTicketInfo({ ...ticketInfo, [name]: value })
    console.log(ticketInfo)
  }

  const onChangeInputEmail = (e) => {
    onChangeInput(e)
    setSolicitanteEmail(e.target.value)
  }

  return (
    <section className="row ">
      <article className="col-md-7 position-relative">
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <div className="row">
            <div className="col-12">
              <p className="d-flex">
                <strong>Solicitante:</strong>{' '}
                {edit
                  ? (
                  <DatalistChangeInput
                    idList="datalistSolicitante"
                    label=""
                    name="solicitante"
                    placeholder=""
                    optionList={datalistSolicitante}
                    register={register}
                    errors={errors}
                    classCol="ms-1 col-md-6 col-lg-6 d-flex ms-2"
                    options={{
                      required: 'Campo obligatorio'
                    }}
                    onChangeSolicitante={onChangeSolicitante}
                    onChangeInput={onChangeInput}
                    value={ticketInfo.solicitante}
                  />
                    )
                  : (
                      ticketInfo.solicitante
                    )}
              </p>
            </div>
            <div className="col-6">
              <p className="d-flex">
                <strong>Email:</strong>{' '}
                {edit
                  ? (
                  <InputForm
                    label=""
                    type="email"
                    name="email"
                    placeholder=""
                    register={register}
                    errors={errors}
                    classCol="col-md-8 col-lg-8 d-flex ms-2 form-group item-form"
                    options={{
                      required: 'Campo obligatorio',
                      pattern: {
                        value: REGEX_EMAIL,
                        message: 'El e-mail tiene que ser valido'
                      }
                    }}
                    value={solicitanteEmail}
                    onChangeInput={onChangeInputEmail}
                  />
                    )
                  : (
                      ticketInfo.email
                    )}
              </p>
            </div>
            <div className="col-6">
              <p className="d-flex">
                <strong>Telefono:</strong>
                {edit
                  ? (
                  <InputForm
                    label=""
                    type="text"
                    name="telefono"
                    placeholder=""
                    register={register}
                    errors={errors}
                    classCol="col-md-7 col-lg-7 d-flex ms-2 form-group item-form"
                    options={{
                      required: 'Campo obligatorio'
                    }}
                    onChangeInput={onChangeInput}
                    value={ticketInfo.telefono}
                  />
                    )
                  : (
                      ticketInfo.telefono
                    )}
              </p>
            </div>
            <div className="col-6">
              <p className="d-flex">
                <strong>Area:</strong>{' '}
                {edit
                  ? (
                  <SelectInput
                    label=""
                    name="area"
                    placeholder="Selecciona un área"
                    optionList={optionListSelect}
                    register={register}
                    errors={errors}
                    classCol="col-md-6 col-lg-6 d-flex ms-2"
                    options={{
                      required: 'Campo obligatorio'
                    }}
                    onChangeInput={onChangeInput}
                  />
                    )
                  : (
                      ticketInfo.area
                    )}
              </p>
            </div>
            <div className="col-3">
              <p className="d-flex">
                <strong>Sede:</strong>{' '}
                {edit
                  ? (
                  <SelectInput
                    label=""
                    name="sede"
                    placeholder="Selecciona una sede"
                    optionList={optionListSelect}
                    register={register}
                    errors={errors}
                    classCol="col-md-8 col-lg-8 d-flex ms-2"
                    options={{
                      required: 'Campo obligatorio'
                    }}
                    onChangeInput={onChangeInput}
                  />
                    )
                  : (
                      ticketInfo.sede
                    )}
              </p>
            </div>
            <div className="col-3">
              <p className="d-flex">
                <strong>Piso:</strong>{' '}
                {edit
                  ? (
                  <SelectInput
                    label=""
                    name="piso"
                    placeholder=""
                    optionList={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                    register={register}
                    errors={errors}
                    classCol="col-md-12 col-lg-12 d-flex ms-2"
                    options={{
                      required: 'Campo obligatorio'
                    }}
                    onChangeInput={onChangeInput}
                  />
                    )
                  : (
                      ticketInfo.piso
                    )}
              </p>
            </div>
            <div className="col-12">
              <p className="d-flex">
                <strong>Referencia:</strong>{' '}
                {edit
                  ? (
                  <InputForm
                    label=""
                    type="text"
                    name="referencia"
                    placeholder=""
                    register={register}
                    errors={''}
                    classCol="col-md-2 col-lg-2 d-flex ms-2 form-group item-form"
                    onChangeInput={onChangeInput}
                    value={ticketInfo.referencia}
                  />
                    )
                  : (
                      ticketInfo.referencia
                    )}
              </p>
            </div>
            <div className="col-12">
              <p>
                <strong>Pre Tarea:</strong> {ticketInfo.pre_tarea}
              </p>
            </div>
            <div className="col-12">
              <p className="d-flex">
                <strong>Motivo:</strong>{' '}
                {edit
                  ? (
                  <TextArea
                    label=""
                    name="motivo"
                    rows="1"
                    register={register}
                    errors={errors}
                    classCol="col-md-10 col-lg-10 d-flex form-group item-form"
                    options={{
                      required: 'Campo obligatorio'
                    }}
                    onChangeInput={onChangeInput}
                    value={ticketInfo.motivo}
                  />
                    )
                  : (
                      ticketInfo.motivo
                    )}
              </p>
            </div>
            <div className="col-12"></div>
            {/* <p>
              <strong>Fecha:</strong> {ticketInfo.fecha}
            </p> */}
          </div>
          {edit
            ? (
            <div>
              <button onClick={handleCancelEdit}>Cancelar</button>
              <button type="submit">Guardar</button>
            </div>
              )
            : (
            <i
              className="fa fa-edit position-absolute top-0 end-0"
              onClick={handleEdit}
            ></i>
              )}
        </form>
      </article>
      <article className="col-md-5">
        {showSelect
          ? (
          <>
            <Select
              name="Tareas"
              options={tecnicos}
              onChange={handleSelectChange}
              value={selectedOption}
            />
            <Button
              classBoton="mx-1 btn btn-success"
              texto="Seleccionar Tecnico"
              onClick={handleSelectTecnico}
            />
          </>
            )
          : (
          <>
            <Button
              id="asignado"
              classBoton="mx-1 btn btn-success"
              texto={selectedOption ? selectedOption.label : ticket.colaborador}
            />
            <Button
              id="modificar"
              classBoton="mx-1 btn btn-danger"
              texto="Cambiar Tecnico"
              onClick={handleSelectTecnico}
            />
          </>
            )}
      </article>
    </section>
  )
}

export default GetTicketDetalle
