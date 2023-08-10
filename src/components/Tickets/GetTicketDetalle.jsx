import React, { useState } from 'react'
import detalleTicket from '@servicios/TicketDetalleService'
import Button from '../partials/Button/Button'
import Select from 'react-select'
import ButtonEdit from '../partials/Button/ButtonEdit'

const tecnicos = [
  { value: 'juan', label: 'Juan' },
  { value: 'pedro', label: 'Pedro' },
  { value: 'maria', label: 'Maria' },
  { value: 'luis', label: 'Luis' },
  { value: 'jose', label: 'Jose' },
  { value: 'laura', label: 'Laura' }
]

const GetTicketDetalle = ({ id }) => {
  const { ticket, loading, error } = detalleTicket(id)
  const [showSelect, setShowSelect] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)

  const handleSelectTecnico = () => {
    setShowSelect(!showSelect)
  }

  const handleSelectChange = (selected) => {
    setSelectedOption(selected)
  }
  if (loading) {
    return <div>Cargando...</div>
  }
  if (error) {
    return <div>Error: {error}</div>
  }
  if (!ticket) {
    return <div>No se encontraron datos del usuario.</div>
  }

  return (
    <section className="row">
      <article className='"col-md-6"'>
        <p>Solicitante: {ticket.solicitante}</p>
        <p>Email: {ticket.email}</p>
        <p>Fecha: {ticket.fecha}</p>
        <p>Telefono: {ticket.telefono}</p>
        <p>Area: {ticket.area}</p>
        <p>Sede: {ticket.sede}</p>
        <p>Piso: {ticket.piso}</p>
        <p>Referencia: {ticket.referencia}</p>
        <p>Pre Tarea: {ticket.pre_tarea}</p>
        <ButtonEdit />
      </article>
      <article className='"col-md-6"'>
        <p>Titulo: {ticket.titulo}</p>
        <p>Descripcion: {ticket.descripcion}</p>
        <p>Prioridad: {ticket.prioridad}</p>
        <p>Estado: {ticket.estado}</p>
        <p>Tipo: {ticket.tipo}</p>
        <p>Categoria: {ticket.categoria}</p>
        <p>Subcategoria: {ticket.subcategoria}</p>
        <p>Asignado: {ticket.asignado}</p>
        <p>Tecnico Asignado: {ticket.colaborador}</p>
        <p>Area asignada: {ticket.area_asignada}</p>
        {(showSelect)
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
                texto={selectedOption ? selectedOption.label : ticket.firstName}
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
