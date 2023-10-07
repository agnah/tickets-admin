const RadioButton = (props) => {
  const { label, name, classCol, register, options, errors, optionList, ...attributes } =
    props

  const classes = errors[name]?.message
    ? 'form-group item-form has-error'
    : 'form-group item-form'

  return (
    <div className={classCol}>
      <label htmlFor="">{label}</label>
      <div className={classes}>
        {optionList.map((option) => (
          <label htmlFor={name} className="form-check-label" key={option.value}>
            <input
              type="radio"
              name={name}
              {...attributes}
              {...register(name, options)}
              defaultValue={option.value}
              aria-required="true"
              className="check-prioridad"
              onChange={attributes.onChange}
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
