import React, { useState } from 'react'
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

const GetTicketDetalle = ({ ticket }) => {
  const [showSelect, setShowSelect] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)

  const handleSelectTecnico = () => {
    setShowSelect(!showSelect)
  }

  const handleSelectChange = (selected) => {
    setSelectedOption(selected)
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
