import React, { useState } from 'react'
// import Button from '../partials/Button/Button'
// import Select from 'react-select'
// import ButtonEdit from '../partials/Button/ButtonEdit'
import { useForm } from 'react-hook-form'
import solicitantes from '../../../public/assets/solicitantes.json'
import DatalistChangeInput from '../../components/Form/Input/DatalistCangeInput'
import InputForm from '../../components/Form/Input/InputForm'
import SelectInput from '../../components/Form/Input/Select'
import SelectTecnico from '../Form/Input/SelectWithOption'
import TextArea from '../../components/Form/Input/TextArea'
import SelectTarea from '@components/Tickets/SelectTarea'
import './GetDetalleTicket.css'

const tecnicos = [
  "Franco Armani",
  "Juan",
  "Pedro",
  "Maria",
  "Luis",
  "Jose",
  "Laura",
]

const datalistSolicitante = solicitantes.map((s) => s.nombre)
const optionListSelect = ["CSTIMI", "GDE", "Computos", "CID", "Telefonía"]
const historial = [
  {
    area: "CSTIMI",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sit non voluptate consequuntur eum corrupti voluptates adipisci eos maiores ut?",
  },
  {
    area: "GDE",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sit non voluptate consequuntur eum corrupti voluptates adipisci eos maiores ut?",
  },
  {
    area: "CSTIMI",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sit non voluptate consequuntur eum corrupti voluptates adipisci eos maiores ut?",
  },
  {
    area: "Computos",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sit non voluptate consequuntur eum corrupti voluptates adipisci eos maiores ut?",
  },
  {
    area: "Computos",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sit non voluptate consequuntur eum corrupti voluptates adipisci eos maiores ut?",
  },
  {
    area: "CSTIMI",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sit non voluptate consequuntur eum corrupti voluptates adipisci eos maiores ut?",
  },
  {
    area: "GDE",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sit non voluptate consequuntur eum corrupti voluptates adipisci eos maiores ut?",
  }
]

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
    motivo: "Un motivo valido"
  })
  // const [showSelect, setShowSelect] = useState(false)
  const [selectedOption, setSelectedOption] = useState(ticket.colaborador)
  const [selectedOptionArea, setSelectedOptionArea] = useState(null)
  const [edit, setEdit] = useState(false)
  const [solicitanteEmail, setSolicitanteEmail] = useState(ticketInfo.email)
  const [historialMensajes, setHistorialMensajes] = useState(historial)

  // const handleSelectTecnico = () => {
  //   setShowSelect(!showSelect)
  // }

  const handleSelectChange = (e) => {
    if (e.target.name === "tecnico") setSelectedOption(e.target.value)
    if (e.target.name === "derivar") setSelectedOptionArea(e.target.value)
  }
  const handleSubmitMessage = (e) => {
    e.preventDefault()
    const user = JSON.parse(sessionStorage.getItem("user"))
    console.log(user.sector[0])
    console.log(e.target[0].value)
    setHistorialMensajes([
      ...historialMensajes,
      { area: user.sector[0], info: e.target[0].value }
    ])
  }

  const handleEdit = () => {
    setEdit(!edit)
  }

  const handleCancelEdit = () => {
    setEdit(!edit);
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
      motivo: "Un motivo valido"
    })
    setSolicitanteEmail(ticket.email)
  }

  const onSubmit = (data) => {
    setTicketInfo({ ...ticketInfo, ...data, email: solicitanteEmail })
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
    const { value, name } = e.target;
    setTicketInfo({ ...ticketInfo, [name]: value });
    console.log(ticketInfo)
  }

  const onChangeInputEmail = (e) => {
    onChangeInput(e)
    setSolicitanteEmail(e.target.value)
  }

  const handleAnular = (e) => {
    // TODO: LOGICA DE ANULAR TICKET
  }

  const handleFinalizar = (e) => {
    // TODO: LOGICA DE FINALIZAR TICKET
  }

  return (
    <section className="row ">
      <article className="col-md-7 position-relative container-left-detalle">
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off" className='d-flex flex-column'>
          <div className="row">
            <div className="col-12">
              <p className="d-flex align-items-center item-form">
                <strong className='strong-title'>Solicitante:</strong>{' '}
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
                    classCol="d-flex flex-row-reverse"
                    options={{
                      required: "Campo obligatorio"
                    }}
                    onChangeSolicitante={onChangeSolicitante}
                    onChangeInput={onChangeInput}
                    value={ticketInfo.solicitante}
                  />)
                  : (ticketInfo.solicitante)}
              </p>
            </div>
            <div className="d-flex align-items-center">
              <p className="d-flex align-items-center item-form">
                <strong className='strong-title'>Email:</strong>{' '}
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
                        message: "El e-mail tiene que ser valido"
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
            <div>
              <p className="d-flex align-items-center item-form">
                <strong className='strong-title'>Telefono:</strong>
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
                      required: "Campo obligatorio"
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
            <div className="d-flex align-items-center">
            <div>
                <p className="d-flex align-items-center item-form">
                  <strong className='strong-title'>Area:</strong>{' '}
                  {edit
                    ? (
                    <SelectInput
                      label=""
                      name="area"
                      placeholder="Selecciona un área"
                      optionList={optionListSelect}
                      register={register}
                      errors={errors}
                      classCol="d-flex ms-2"
                      options={{
                        required: "Campo obligatorio"
                      }}
                      onChangeInput={onChangeInput}
                    />
                      )
                    : (
                        ticketInfo.area
                      )}
                </p>
              </div>
            </div>
            <div>
              <p className="d-flex align-items-center item-form">
                <strong className="strong-title">Sede:</strong>{' '}
                {edit
                  ? (
                  <SelectInput
                    label=""
                    name="sede"
                    placeholder="Selecciona una sede"
                    optionList={optionListSelect}
                    register={register}
                    errors={errors}
                    classCol="d-flex ms-2"
                    options={{
                      required: "Campo obligatorio"
                    }}
                    onChangeInput={onChangeInput}
                  />
                    )
                  : (
                      ticketInfo.sede
                    )}
              </p>
            </div>
            <div>
              <p className="d-flex align-items-center item-form">
                <strong className="strong-title">Piso:</strong>{' '}
                {edit
                  ? (
                  <SelectInput
                    label=""
                    name="piso"
                    placeholder=""
                    optionList={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                    register={register}
                    errors={errors}
                    classCol="d-flex ms-2"
                    options={{
                      required: "Campo obligatorio"
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
              <p className="d-flex align-items-center item-form">
                <strong className="strong-title">Referencia:</strong>{' '}
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
                  />)
                  : (ticketInfo.referencia)}
              </p>
            </div>
            <div className="col-12 my-1">
              <p className="d-flex align-items-center item-form">
                <strong className="strong-title">Pre Tarea:</strong> {ticketInfo.pre_tarea}
              </p>
            </div>
            <div className="col-12">
              <p className="d-flex align-items-center item-form">
                <strong className="strong-title">Motivo:</strong>{' '}
                {edit
                  ? (
                  <TextArea
                    label=""
                    name="motivo"
                    rows="1"
                    register={register}
                    errors={errors}
                    classCol="w-100 d-flex form-group"
                    options={{
                      required: "Campo obligatorio"
                    }}
                    onChangeInput={onChangeInput}
                    value={ticketInfo.motivo}
                  />)
                  : (ticketInfo.motivo)}
              </p>
            </div>
            <div className="col-12"></div>
          </div>
          {edit
            ? (
            <div className='box-btn-detalles'>
              <button id="btn-cancelar" onClick={handleCancelEdit}>Cancelar</button>
              <button id="btn-aceptar" type="submit">Guardar</button>
            </div>
              )
            : (
            <img
              src="../public/img/pen-to-square-solid.svg"
              className="pen-edit"
              onClick={handleEdit}
            ></img>
              )}
        </form>
        <div className="historial">
          <p className="strong-title my-2">Historial</p>
          <div className="historial-box">
            <div
              style={{ height: '200px', overflowY: 'scroll' }}
              className="p-3"
            >
              {historialMensajes.map((mensaje) => (
                <p>
                  <span className="texto-area">{`${mensaje.area}:`}</span>{' '}
                  {mensaje.info}
                </p>
              ))}
            </div>
            <div className="w-100 p-2 input-box">
              <form onSubmit={handleSubmitMessage} className="d-flex gap-2">
                <input type="text" name="info" className="flex-grow-1" placeholder='Ingresar un nuevo mensaje...'/>
                <button type="submit">Enviar</button>
              </form>
            </div>
          </div>
        </div>
      </article>
      <article className="col-md-5">
        <section className="row px-3">
          <article className="col-lg-12 tecnico-asignado">
            <div>
              <SelectTecnico
                label="Asignar Técnico:"
                name="tecnico"
                placeholder="Selecciona un técnico"
                optionList={tecnicos}
                register={register}
                errors={errors}
                classCol="d-flex align-items-center ms-2 select-tecnico"
                options={{
                  required: "Campo obligatorio"
                }}
                selectedOption={selectedOption}
                onChangeInput={handleSelectChange}
              />
            </div>
          </article>
          <article className="col-lg-12 box-derivar">
            <div className="my-2">
              <SelectTecnico
                label=""
                name="area"
                placeholder="Derivar"
                optionList={optionListSelect}
                register={register}
                errors={errors}
                classCol="col-md-12 col-lg-12 d-flex ms-2 select-derivar"
                options={{
                  required: "Campo obligatorio"
                }}
                selectedOption={selectedOptionArea}
                onChangeInput={handleSelectChange}
              />
            </div>
            <div>
              <p className="mb-1 ms-2 subtitle-derivar">Tiempo de espera: {''}</p>
              <p className="mb-0 ms-2 subtitle-derivar">Última acción: {''}</p>
            </div>
          </article>
        </section>
        <section>
          <article>
            <div>
              <SelectTarea />
            </div>
          </article>
        </section>
      </article>
    </section>
  )
}

export default GetTicketDetalle
