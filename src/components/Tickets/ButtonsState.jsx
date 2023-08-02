import React, { useContext } from 'react'
import Button from '../partials/Button/Button'
import { Link } from 'react-router-dom'
import { FiltrosContext } from '../tabla/contextTabla'

const ButtonsState = ({ valores, user }) => {
  const { nuevos, asignados, curso, totales } = valores
  const { handleSeleccionadosChange, handlePrioridadChange, handleFiltroUserChange } = useContext(FiltrosContext)
  const cambiarSeleccionado = (e) => {
    const value = e.target.value
    handleSeleccionadosChange([value])
    handlePrioridadChange('')
    value === 'marketing' ? handleFiltroUserChange('') : handleFiltroUserChange(user.user)
  }
  return (
    <div>
      <Link
        to="/tickets">
        <Button
          type=""
          classBoton="btn btn-badge btn-open"
          classIcon=""
          texto="Tickets Nuevos"
          classBadge="badge"
          cantidad={nuevos}
          value="marketing"
          onClick={cambiarSeleccionado}
        />
      </Link>
      <Link
        to="/tickets">
        <Button
          type=""
          classBoton="btn btn-badge btn-progress"
          classIcon=""
          texto="Tickets Asignados"
          classBadge="badge"
          cantidad={asignados}
          value='services'
          onClick={cambiarSeleccionado}
        />
      </Link>
      <Link
        to="/tickets">
        <Button
          type=""
          classBoton="btn btn-badge btn-pending"
          classIcon=""
          texto="Tickets en Curso"
          classBadge="badge"
          cantidad={curso}
          value="support"
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
