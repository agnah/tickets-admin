import { useEffect, useState } from 'react'
// import { apis } from '@constantes/constApis'

const TicketDetalleService = (id_ticket) => {
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
          'x-token': 'abc-123'
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
