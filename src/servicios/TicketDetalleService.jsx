import { useState, useEffect } from 'react'

const TicketDetalleService = (id) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`https://dummyjson.com/user/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('La red no responde.')
        }
        return response.json()
      })
      .then((data) => {
        setUser(data)
        setLoading(false)
        setError(null)
      })
      .catch((error) => {
        setUser(null)
        setLoading(false)
        setError(error.message)
      })
  }, [id])

  return { user, loading, error }
}

export default TicketDetalleService
