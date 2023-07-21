import './Tablero.css'

const Tablero = ({ children, title, classTitle = '' }) => {
  classTitle += ' m-0'
  return (
    <article className="tablero">
      <h3 className={classTitle}>{title}</h3>
      <hr />
      {children}
    </article>
  )
}

export default Tablero
