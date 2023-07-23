import React from 'react'
import Tablero from '../../components/Tablero/Tablero'
import TicketCreateForm from '../../components/Tickets/TicketCreateForm'

const TicketCreate = () => {
  return (
    <Tablero title="Crear Nuevo Ticket" page="Tickets / Crear Ticket">
        <TicketCreateForm />
    </Tablero>
  )
}

export default TicketCreate
