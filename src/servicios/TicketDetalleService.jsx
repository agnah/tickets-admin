import { useState } from 'react'
import { apis } from '@constantes/constApis'

const TicketDetalleService = (ID) => {
  const [ticket, setTicket] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // const url = `${API_USUARIO}/${id}`
  // const url = apis.API_USUARIO.replace('{id}', id)

  const url = apis.API_USUARIO

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('La red no responde.')
      }
      return response.json()
    })
    .then((data) => {
      const usuarioEncontrado = data.find(user => user.id === ID)
      setTicket(usuarioEncontrado)
      setLoading(false)
      setError(null)
    })
    .catch((error) => {
      setTicket(null)
      setLoading(false)
      setError(error.message)
    })

  return { ticket, loading, error }
}

export default TicketDetalleService
