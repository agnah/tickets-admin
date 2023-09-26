
import Badge from '../partials/Button/Badge'
import './Tablero.css'

const Tablero = ({ children, title, classTitle = '', page = '', ...props }) => {
  classTitle += ' m-0'
  return (
    <article className="tablero mx-0">
      <div className='d-flex justify-content-between'>
        <div className='d-flex'>
          <h5 className={classTitle}>{title}</h5>
          { props?.state && <Badge classes="badge rounded-pill text-bg-success mx-3" text={props.state} /> }
          { props?.prioridad && 'Prioridad Alta' }
        </div>
        {page && <span className='span-path'><strong>Estás aquí:</strong> {page}</span>}
      </div>
      <hr />
      {children}
    </article>
  )
}

export default Tablero
