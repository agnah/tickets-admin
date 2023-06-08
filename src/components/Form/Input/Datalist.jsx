const Datalist = (props) => {
  const {
    idList,
    label,
    name,
    placeholder,
    register,
    options,
    errors,
    optionList,
    ...attributes
  } = props

  const classes = errors[name]?.message
    ? 'col-md-10 form-group item-form has-error'
    : 'col-md-10 form-group item-form'

  return (
    <div className={classes}>
      <div className="form-group item-form">
        <label htmlFor={name}>{label}</label>
        <input
          name={name}
          {...attributes}
          {...register(name, options)}
          list={idList}
          placeholder={placeholder}
          className="form-control"
        />
        <datalist id={idList}>
          {optionList.map((option, index) => (
            <option key={index} value={option}></option>
          ))}
        </datalist>
        {errors[name] && (
          <p className="help-block error" role="alert">
            {errors[name]?.message}
          </p>
        )}
      </div>
    </div>
  )
}

export default Datalist
