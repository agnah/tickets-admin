const SelectWithOption = (props) => {
  const {
    label,
    name,
    placeholder,
    register,
    options,
    errors,
    optionList,
    classCol,
    ...attributes
  } = props

  const classes = errors[name]?.message
    ? `${classCol} has-error`
    : `${classCol}`

  return (
    <div className={classes}>
      <label htmlFor={name}>{label}</label>
      <div className="form-group item-form">
        <select
          name={name}
          {...attributes}
          {...register(name, options)}
          className={
            props?.classInput
              ? `${props.classInput} form-control`
              : 'form-control'
          }
          onChange={attributes?.onChangeInput}
        >
          <option value="">{placeholder}</option>
          {optionList.map((option, index) => (
            <>
              {attributes?.selectedOption !== null &&
              attributes?.selectedOption === option
                ? (
                <option key={index} value={option} selected="selected">
                  {option}
                </option>
                  )
                : (
                <option key={index} value={option}>
                  {option}
                </option>
                  )}
            </>
          ))}
        </select>

        {errors[name] && (
          <p className="help-block error" role="alert">
            {errors[name]?.message}
          </p>
        )}
      </div>
    </div>
  )
}

export default SelectWithOption
