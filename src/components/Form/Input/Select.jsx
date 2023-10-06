import './Select.css'

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

  const isError = errors[name]?.message

  const placeholderText = isError ? errors[name]?.message : placeholder

  const classes = isError
    ? `${classCol} has-error`
    : `${classCol}`

  // const handleChange = (e) => {
  //   (e.target.value !== '') ? attributes.displayFields(false) : attributes.displayFields(true)
  // }

  return (
    <div className={`select-container d-flex flex-column ${classes}`}>
      <label htmlFor={name}>{label}</label>
      <div className="form-group item-form select-box">
        {/* <div className="select-icon">
          <i
            className="fa-solid fa-caret-down"
          ></i>
        </div> */}
        {
          attributes?.displayFields
            ? <select
          name={name}
          {...attributes}
          {...register(name, options)}
          className={`detalle-input ${isError ? 'help-block error error-style' : ''}`}
          onChange={attributes?.onChangeInput}
          placeholder={placeholderText}
        >
          <option value="">{placeholderText}</option>
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
          className={`${props?.classInput ? `${props.classInput} detalle-input` : 'detalle-input'} ${isError ? 'help-block error error-style' : ''}`}
          onChange={attributes?.onChangeInput}
          placeholder={placeholderText}
        >
          <option value="">{placeholderText}</option>
          {optionList.map((option, index) => (
            <option key={index} value={index+1}>
              {option}
            </option>
          ))}
        </select>
        }
      </div>
      {/* {errors[name] && (
          <p className="help-block error text-error" role="alert">
            {errors[name]?.message}
          </p>
      )} */}
    </div>
  )
}

export default Select
