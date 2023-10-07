import { React, useState } from 'react'
import Tablero from '@components/Tablero/Tablero'
import TicketCreateForm from '@components/Tickets/TicketCreateForm'
import './TicketCreate.css'

const TicketCreate = () => {

  return (
    <Tablero title="Crear Nuevo Ticket"
    classTitle="title-ticketCreate"
    page="Tickets / Crear Ticket"
    >
      <TicketCreateForm />
    </Tablero>
  )
}

export default TicketCreate
