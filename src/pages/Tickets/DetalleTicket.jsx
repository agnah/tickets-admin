import { useParams } from 'react-router-dom'
import Tablero from '../../components/Tablero/Tablero'
import Button from '../../components/partials/Button/Button'
import GetTicketDetalle from '../../components/Tickets/GetTicketDetalle'

function DetalleTicket () {
  const { id } = useParams()

  return (
    <>
      <Tablero title={`Ticket ${id}`} classTitle="text-center" >
        <GetTicketDetalle id={id}/>
        <Button
          classBoton="btn btn-badge btn-open"
          texto="Editar"
        />
      </Tablero>
      <Tablero title="Tareas" classTitle="text-center" >
        Detalle del ticket
      </Tablero>
      <Tablero title="Historial de cambios" classTitle="text-center" >
        Detalle del ticket
      </Tablero>
    </>
  )
}

export default DetalleTicket