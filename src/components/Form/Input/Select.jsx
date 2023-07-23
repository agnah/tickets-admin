const Select = (props) => {
  const {
    label,
    name,
    placeholder,
    register,
    options,
    errors,
    optionList,
    classCol,
    display,
    ...attributes
  } = props

  const classes = errors[name]?.message
    ? `${classCol} has-error`
    : `${classCol}`

  const handleChange = (e) => {
    (e.target.value !== '') ? attributes.displayFields(false) : attributes.displayFields(true)
  }

  return (
    <div className={classes}>
      <div className="form-group item-form">
        <label htmlFor={name}>{label}</label>
        {
          attributes?.displayFields
            ? <select
          name={name}
          {...attributes}
          {...register(name, options)}
          className="form-control"
          onChange={handleChange}
        >
          <option value="">{placeholder}</option>
          {optionList.map((option, index) => (
            <option key={index} value={option.toLowerCase()}>
              {option}
            </option>
          ))}
        </select>
            : <select
          name={name}
          {...attributes}
          {...register(name, options)}
          className="form-control"
          disabled={display}
        >
          <option value="">{placeholder}</option>
          {optionList.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        }
        {errors[name] && (
          <p className="help-block error" role="alert">
            {errors[name]?.message}
          </p>
        )}
      </div>
    </div>
  )
}

export default Select
