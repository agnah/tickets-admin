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

  const isError = errors[name]?.message

  const placeholderText = isError ? errors[name]?.message : placeholder

  const classes = isError
    ? `${classCol} has-error error-border`
    : `${classCol}`

  return (
    <div className={classes}>
      <label htmlFor={name} className="label-form">{label}</label>
      <div className="form-group item-form select-box">
        <select
          name={name}
          {...attributes}
          {...register(name, options)}
          className={`${props?.classInput ? `${props.classInput}  detalle-input w-100` : ' detalle-input w-100'} ${isError ? 'help-block error error-style' : ''}`}
          onChange={attributes?.onChangeInput}
          disabled={attributes?.isDisable}
        >
          <option value="">{placeholderText}</option>
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

        {/* {errors[name] && (
          <p className="help-block error" role="alert">
            {errors[name]?.message}
          </p>
        )} */}
      </div>
    </div>
  )
}

export default SelectWithOption
