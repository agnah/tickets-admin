import { useParams } from 'react-router-dom'
import Tablero from '../../components/Tablero/Tablero'
import GetTicketDetalle from '../../components/Tickets/GetTicketDetalle'
// import SelectTarea from '@components/Tickets/SelectTarea'
import detalleTicket from '@servicios/TicketDetalleService'

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

  return (
    <>
      <Tablero title={`Ticket ${id}`} classTitle="text-center h3" page={ticket.area_asignada} state={ticket.estado}>
        <GetTicketDetalle id={id} ticket={ticket} />
      </Tablero>
      {/* <Tablero title="Tareas" classTitle="text-center" >
        <SelectTarea />
      </Tablero>
      <Tablero title="Historial de cambios" classTitle="text-center" >
        Detalle del ticket
      </Tablero> */}
    </>
  )
}

export default DetalleTicket
