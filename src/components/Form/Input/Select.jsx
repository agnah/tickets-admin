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
      <div className="label-container">
        <label className='label-form' htmlFor={name}>{label}</label>
      </div>
      <div className="w-100 form-group item-form select-box">
        {
          attributes?.displayFields
            ? <select
          name={name}
          {...attributes}
          {...register(name, options)}
          className={`detalle-input w-100 ${isError ? 'help-block error error-style w-100' : ''}`}
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
          className={`${props?.classInput ? `${props.classInput} detalle-input w-100` : 'detalle-input w-100'} ${isError ? 'help-block error error-style w-100' : ''}`}
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
        <div className="select-icon">
        <img src="../public/img/caret-down-solid.svg" className="fa-solid fa-caret-down"></img>
        </div>
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
