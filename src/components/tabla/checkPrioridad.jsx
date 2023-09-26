import { estadoTicket } from '@constantes/constTickets'
import './check.css'

function checkPrioridad({ prioridad, onChange }) {
  const { ALTA, BAJA } = estadoTicket
  const onChangeValue = (event) => {
    const newValue = event.target.value
    onChange(newValue)
  }
  return (
    <div className="container-checks" id='left-checks'>
      <label className="title-label">Prioridad:</label>
      <label>
        <input type="radio" name="prioridad" value="" onChange={onChangeValue} checked={prioridad.length === 0} />
        Todas</label>
      <label>
        <input type="radio" name="prioridad" value={ALTA} onChange={onChangeValue} checked={prioridad === ALTA} />
        Alta</label>
      <label>
        <input type="radio" name="prioridad" value={BAJA} onChange={onChangeValue} checked={prioridad === BAJA} />
        Baja</label>
    </div>
  )
}
export default checkPrioridad
