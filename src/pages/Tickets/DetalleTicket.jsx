import { useParams } from 'react-router-dom'
import Tablero from '../../components/Tablero/Tablero'
import GetTicketDetalle from '../../components/Tickets/GetTicketDetalle'
import detalleTicket from '../../servicios/TicketDetalleService'

const optionListSelect = [
  "COMPUTOS",
  "TELEFONIA",
  "SOPORTE",
  "SISTEMAS",
  "GDE",
];

import './DetalleTicket.css'

function DetalleTicket () {
  const { id } = useParams()
  const { ticket, loading, error } = detalleTicket(Number(id))

  if (loading) {
    return <div>Cargando...</div>
  }
  if (error) {
    return <div>Error: {error}</div>
  }
  if (!ticket) {
    return <div>No se encontraron datos del Ticket.....</div>
  }
  console.log(ticket);
  console.log(optionListSelect[ticket.area_asignada_id - 1]);

  return (
    <>
      <Tablero title={`Ticket ${ticket[0].identificador}`} classTitle="title-detalleTicket" page={optionListSelect[ticket[0].area_asignada_id - 1]} state={ticket[0].estado} showPrioridad>
        <GetTicketDetalle id={id} ticket={ticket[0]} />
      </Tablero>
    </>
  )
}

export default DetalleTicket
