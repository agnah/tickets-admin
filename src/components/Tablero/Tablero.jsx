import './Tablero.css'

const Tablero = ({ children, title, classTitle = '', page = '' }) => {
  classTitle += ' m-0'
  return (
    <article className="tablero mx-0">
      <div className='d-flex justify-content-between'>
        <h3 className={classTitle}>{title}</h3>
        {page && <span>Estás aquí: {page}</span>}
      </div>
      <hr />
      {children}
    </article>
  )
}

export default Tablero
