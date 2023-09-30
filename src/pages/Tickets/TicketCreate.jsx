import { React, useState } from 'react'
import Tablero from '@components/Tablero/Tablero'
import TicketCreateForm from '@components/Tickets/TicketCreateForm'
import './TicketCreate.css'

const TicketCreate = () => {
  const [prioridad, setPrioridad] = useState(false)

  const handlePrioridadChange = (value) => {
    setPrioridad(value)
  }
  return (
    <Tablero title="Crear Nuevo Ticket"
    classTitle="title-ticketCreate"
    page="Tickets / Crear Ticket"
    showPrioridad
    updatePrioridad={handlePrioridadChange}
    >
      <TicketCreateForm prioridad={prioridad}/>
    </Tablero>
  )
}

export default TicketCreate
