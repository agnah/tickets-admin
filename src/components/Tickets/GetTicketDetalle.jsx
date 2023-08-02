import React from 'react'
import UserDataService from '../../servicios/TicketDetalleService'

const GetTicketDetalle = ({ id }) => {
  const { user, loading, error } = UserDataService(id)

  if (loading) {
    return <div>Cargando...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!user) {
    return <div>No se encontraron datos del usuario.</div>
  }

  return (
    <div>
      <h2>{user.firstName}</h2>
      <p>Email: {user.email}</p>
      <p>Posicion: {user.company.department}</p>
    </div>
  )
}

export default GetTicketDetalle
