const CheckBox = (props) => {
  const { label, name, register, options, errors, optionList, ...attributes } =
    props

  const classes = errors[name]?.message
    ? 'form-group item-form has-error'
    : 'form-group item-form'

  return (
    <div className="col-md-10 form-group item-form">
      <div className={classes}>
        {optionList.map((option) => (
          <div className="checkbox">
            <label htmlFor={option.name}>
              <input
                id={option.name}
                name={option.name}
                type="checkbox"
                {...attributes}
                {...register(name, options)}
              />
              {option.label}
            </label>
          </div>
        ))}
        {errors[name] && (
          <p className="help-block error" role="alert">
            {errors[name]?.message}
          </p>
        )}
      </div>
    </div>
  )
}

export default CheckBox
