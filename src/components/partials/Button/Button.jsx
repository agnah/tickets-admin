import './Button.css'

function Button ({ type, classBoton, classIcon, texto, classBadge, cantidad, ...props }) {
  return (
    <button type={type} className={classBoton} {...props}>
      <i className={classIcon}></i>
      {texto}
      <span className={classBadge}>{cantidad}</span>
    </button>
  )
}

export default Button
