const Input = (props) => {
  const { label, name, register, options, classCol, errors, value, display, ...attributes } = props

  const isError = errors[name]?.message

  const classes = isError
    ? `${classCol} has-error error-border`
    : `${classCol}`

  const placeholderText = isError ? errors[name]?.message : attributes?.placeholder

  return (
    <div className={`input-conatiner ${classes}`}>
      <div className="label-container">
        <label className='label-form' htmlFor={name}>{label}</label>
      </div>
      <input
        name={name}
        {...attributes}
        {...register(name, options)}
        className={`${isError ? 'w-100 help-block error error-style detalle-input' : 'w-100 detalle-input'}`}
        value={value}
        formNoValidate
        disabled={display}
        onChange={attributes?.onChangeInput}
        placeholder={placeholderText}
      />
      {/* {errors[name]?.message && (
        <p className="help-block error text-error" role="alert">
          {errors[name]?.message}
        </p>
      )} */}
    </div>
  )
}

export default Input
