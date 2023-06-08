const Button = ({ title, classes }) => {
  return (
    <button type="submit" className={classes}>
      {title}
    </button>
  )
}

export default Button
