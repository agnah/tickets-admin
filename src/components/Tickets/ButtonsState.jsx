import React, { useContext } from 'react'
import Button from '../partials/Button/Button'
import { Link } from 'react-router-dom'
import { FiltrosContext } from '../tabla/contextTabla'

const ButtonsState = () => {
  const { handleSeleccionadosChange } = useContext(FiltrosContext);
  const cambiarSeleccionado = (e) => handleSeleccionadosChange(e.target.value)
  return (
    <div>
      <Link
        to="/tickets">
        <Button
          type=""
          classBoton="btn btn-badge btn-open"
          classIcon=""
          texto="Tickets Abiertos"
          classBadge="badge"
          cantidad="15"
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
          texto="Tickets en Progreso"
          classBadge="badge"
          cantidad="6"
          value="support"
          onClick={cambiarSeleccionado}
        />
      </Link>
      <Link
        to="/tickets">
        <Button
          type=""
          classBoton="btn btn-badge btn-pending"
          classIcon=""
          texto="Tickets Pendientes"
          classBadge="badge"
          cantidad="4"
          value="services"
          onClick={cambiarSeleccionado}
        />
      </Link>
      <Link
        to="/tickets">
        <Button
          type=""
          classBoton="btn btn-badge btn-asigned"
          classIcon=""
          texto="Tickets Asignados"
          classBadge="badge"
          cantidad="11"
          value="accounting"
          onClick={cambiarSeleccionado}
        />
      </Link>
    </div>
  )
}

export default ButtonsState
