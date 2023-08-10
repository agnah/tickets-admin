import React, { useContext } from 'react'
import Button from '../partials/Button/Button'
import { Link } from 'react-router-dom'
import { FiltrosContext } from '../tabla/contextTabla'
import { estadoTicket } from '@constantes/constTickets'

const ButtonsState = ({ valores, user }) => {
  const { PENDIENTE, ASIGNADO, EN_CURSO } = estadoTicket
  const { pendientes, asignados, curso, totales } = valores
  const { handleSeleccionadosChange, handlePrioridadChange, handleFiltroUserChange } = useContext(FiltrosContext)

  const cambiarSeleccionado = (e) => {
    const value = e.target.value
    value === '' ? handleSeleccionadosChange([]) : handleSeleccionadosChange([value])
    handlePrioridadChange('')
    value === PENDIENTE ? handleFiltroUserChange('') : handleFiltroUserChange(user.nombre)
  }
  return (
    <div>
      <Link
        to="/tickets">
        <Button
          type=""
          classBoton="btn btn-badge btn-open"
          classIcon=""
          texto="Pendientes"
          classBadge="badge"
          cantidad={pendientes}
          value={PENDIENTE}
          onClick={cambiarSeleccionado}
        />
      </Link>
      <Link
        to="/tickets">
        <Button
          type=""
          classBoton="btn btn-badge btn-progress"
          classIcon=""
          texto="Asignados"
          classBadge="badge"
          cantidad={asignados}
          value={ASIGNADO}
          onClick={cambiarSeleccionado}
        />
      </Link>
      <Link
        to="/tickets">
        <Button
          type=""
          classBoton="btn btn-badge btn-pending"
          classIcon=""
          texto="En Curso"
          classBadge="badge"
          cantidad={curso}
          value={EN_CURSO}
          onClick={cambiarSeleccionado}
        />
      </Link>
      <Link
        to="/tickets">
        <Button
          type=""
          classBoton="btn btn-badge btn-asigned"
          classIcon=""
          texto="Tickets Totales"
          classBadge="badge"
          cantidad={totales}
          value=""
          onClick={cambiarSeleccionado}
        />
      </Link>
    </div>
  )
}

export default ButtonsState
