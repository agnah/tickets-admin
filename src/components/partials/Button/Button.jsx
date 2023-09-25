import './Button.css'

function Button ({ type, classBoton, classIcon, texto, classBadge, cantidad, svgIcon, ...props }) {
  return (
    <button type={type} className={classBoton} {...props}>
      <i className={classIcon}></i>
      {svgIcon && <i className={classIcon}>{svgIcon}</i>}
      {texto}
      <span className={classBadge}>{cantidad}</span>
    </button>
  )
}

export default Button
