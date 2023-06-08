import Button from '../partials/Button/Button'

const ButtonsState = () => {
  return (
    <div>
      <Button
        type=""
        classBoton="btn btn-badge btn-open"
        classIcon=""
        texto="Tickets Abiertos"
        classBadge="badge"
        cantidad="15"
      />
      <Button
        type=""
        classBoton="btn btn-badge btn-progress"
        classIcon=""
        texto="Tickets en Progreso"
        classBadge="badge"
        cantidad="6"
      />
      <Button
        type=""
        classBoton="btn btn-badge btn-pending"
        classIcon=""
        texto="Tickets Pendientes"
        classBadge="badge"
        cantidad="4"
      />
      <Button
        type=""
        classBoton="btn btn-badge btn-asigned"
        classIcon=""
        texto="Tickets Asignados"
        classBadge="badge"
        cantidad="11"
      />
    </div>
  )
}

export default ButtonsState
