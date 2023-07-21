const Input = (props) => {
  const { label, name, register, options, errors, value, ...attributes } = props

  const classes = errors[name]?.message
    ? 'col-md-10 w-100 form-group item-form has-error'
    : 'col-md-10 w-100 form-group item-form'

  return (
    <div className={classes}>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        {...attributes}
        {...register(name, options)}
        className="form-control"
        value={value}
        formNoValidate
      />
      {errors[name]?.message && (
        <p className="help-block error" role="alert">
          {errors[name]?.message}
        </p>
      )}
    </div>
  )
}

export default Input
