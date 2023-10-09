import Badge from '../partials/Button/Badge'
import { useState } from 'react'
import './Tablero.css'

const Tablero = ({ children, title, classTitle = '', page = '', showPrioridad = false, updatePrioridad, ticketEstado, mensajeCantidadTickets, ...props }) => {
  classTitle += ' m-0'
  const [prioridad, setPrioridad] = useState(false)

  const handlePrioridadChange = () => {
    setPrioridad(!prioridad)
    updatePrioridad(!prioridad)
  }
  return (
    <article className="tablero mx-0">
      <div className={classTitle}>
        <div className='d-flex'>
          <h5 className={classTitle}>{title}</h5>
          { props?.state && <Badge classes="state-button" text={props.state} ticketEstado={props.state}/> }
          { props?.prioridad && 'Prioridad Alta' }
          {showPrioridad && (
            <div className="form-prioridad">
              <input
                className="check-prioridad"
                type="checkbox"
                id="flexCheckDefault"
                name="prioridad"
                checked={prioridad}
                onChange={handlePrioridadChange}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Prioridad
              </label>
            </div>
          )}
        </div>
        {mensajeCantidadTickets && <span className="d-flex align-items-center span-cant-tickets">{mensajeCantidadTickets}</span>}
        {page && <span className='span-path'><strong>Estás aquí:</strong> {page}</span>}
      </div>
      <hr />
      {children}
    </article>
  )
}

export default Tablero
