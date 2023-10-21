import { useParams } from 'react-router-dom'
import Tablero from '../../components/Tablero/Tablero'
import GetTicketDetalle from '../../components/Tickets/GetTicketDetalle'
import detalleTicket from '../../servicios/TicketDetalleService'
import './DetalleTicket.css'

const optionListSelect = [
  'COMPUTOS',
  'TELEFONIA',
  'SOPORTE',
  'SISTEMAS',
  'GDE'
]

function DetalleTicket () {
  const { id } = useParams()
  const { ticket, loading, error, setTicket } = detalleTicket(Number(id))

  if (loading) {
    return <div>Cargando...</div>
  }
  if (error) {
    return <div>Error: {error}</div>
  }
  if (!ticket) {
    return <div>No se encontraron datos del Ticket.....</div>
  }

  return (
    <>
      <Tablero title={`Ticket ${ticket.identificador}`} classTitle="title-detalleTicket" page={optionListSelect[ticket.area_asignada_id - 1]} state={ticket.estado} >
        <GetTicketDetalle id={id} ticket={ticket} setTicket={setTicket} />
      </Tablero>
    </>
  )
}

export default DetalleTicket
