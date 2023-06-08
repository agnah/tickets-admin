function TextArea (props) {
  const { label, name, register, options, errors, ...attributes } = props

  const classes = errors[name]?.message
    ? 'col-md-10 form-group item-form has-error'
    : 'col-md-10 form-group item-form'

  return (
    <div className={classes}>
      <label htmlFor={name}>{label}</label>
      <textarea
        name={name}
        {...attributes}
        {...register(name, options)}
        className="form-control"
      />
      {errors[name] && (
        <p className="help-block error" role="alert">
          {errors[name]?.message}
        </p>
      )}
    </div>
  )
}

export default TextArea
