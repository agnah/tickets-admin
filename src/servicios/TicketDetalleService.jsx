import { useEffect, useState } from 'react'
import useAuth from '@servicios/UseAuth'
// import { apis } from '@constantes/constApis'

const TicketDetalleService = (id_ticket) => {
  const { user } = useAuth()
  console.log(user);
  const [ticket, setTicket] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // const url = apis.API_TICKETS_DETALLE

  const getTicketDetail = async (id_ticket) => {
    const response = await fetch(
      `http://localhost:8000/api/tickets/?field=id&value=${Number(id_ticket)}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-token': user.token
        }
      }
    )
    const result = await response.json()
    setLoading(false)
    setError(null)
    setTicket(result[0])
  }

  useEffect(() => {
    getTicketDetail(id_ticket)
  }, [])

  return { ticket, loading, error, setTicket }
}

export default TicketDetalleService
