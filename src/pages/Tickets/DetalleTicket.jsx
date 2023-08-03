import { useParams } from 'react-router-dom'
import Tablero from '../../components/Tablero/Tablero'
import GetTicketDetalle from '../../components/Tickets/GetTicketDetalle'
import SelectTarea from '../../components/Tickets/SelectTarea'

function DetalleTicket () {
  const { id } = useParams()

  return (
    <>
      <Tablero title={`Ticket ${id}`} classTitle="text-center" >
        <GetTicketDetalle id={id}/>
      </Tablero>
      <Tablero title="Tareas" classTitle="text-center" >
        <SelectTarea/>
      </Tablero>
      <Tablero title="Historial de cambios" classTitle="text-center" >
        Detalle del ticket
      </Tablero>
    </>
  )
}

export default DetalleTicket
