import { useEffect, useState } from 'react'
import { apis } from '@constantes/constApis'

const TicketDetalleService = (ID) => {
  const [ticket, setTicket] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const url = apis.API_TICKETS_DETALLE

  // fetch(url)
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error('La red no responde.')
  //     }
  //     return response.json()
  //   })
  //   .then((data) => {
  //     setTicket(data)
  //     setLoading(false)
  //     setError(null)
  //   })
  //   .catch((error) => {
  //     setTicket(null)
  //     setLoading(false)
  //     setError(error.message)
  //   })

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const ticketEncontrado = data.find(ticket => ticket.id === parseInt(ID))
        if (ticketEncontrado) {
          setTicket(ticketEncontrado)
          setLoading(false)
          setError(null)
        } else {
          setError('Ticket no encontrado')
          setLoading(false)
        }
      })
      .catch((error) => {
        setTicket(null)
        setLoading(false)
        setError(error.message)
      })
  }, [])

  return { ticket, loading, error }
}

export default TicketDetalleService
