const RadioButton = (props) => {
  const { label, name, register, options, errors, optionList, ...attributes } =
    props

  const classes = errors[name]?.message
    ? 'form-group item-form has-error'
    : 'form-group item-form'

  return (
    <div className='col-md-10 form-group item-form'>
      <label htmlFor="">{label}</label>
      <div className={classes}>
        {optionList.map((option) => (
          <label key={option.value} htmlFor={name} className="radio-inline">
            <input
              type="radio"
              name={name}
              {...attributes}
              {...register(name, options)}
              defaultValue={option.value}
              aria-required="true"
            />
            {option.label}
          </label>
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

export default RadioButton
