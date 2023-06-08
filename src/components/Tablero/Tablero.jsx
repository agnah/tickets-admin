import './Tablero.css'

const Tablero = ({ children, title }) => {
  return (
    <article className="tablero">
      <h3 className="m-0">{title}</h3>
      <hr />
      {children}
    </article>
  )
}

export default Tablero
