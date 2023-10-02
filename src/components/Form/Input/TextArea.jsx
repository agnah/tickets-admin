function TextArea (props) {
  const { label, name, register, options, errors, classCol, ...attributes } = props

  const isError = errors[name]?.message

  const placeholderText = isError ? errors[name]?.message : attributes?.placeholder

  const classes = isError
    ? `${classCol} has-error`
    : `${classCol}`

  return (
    <div className={classes}>
      <label htmlFor={name}>{label}</label>
      <textarea
        name={name}
        {...attributes}
        {...register(name, options)}
        className={`${isError ? 'help-block error error-style detalle-input text-area my-2' : 'detalle-input text-area mb-2 mt-1'}`}
        cols='1'
        onChange={attributes?.onChangeInput}
        value={attributes?.value}
        style={{ height: '38px' }}
        placeholder={placeholderText}
      />
      {/* {errors[name] && (
        <p className="help-block error" role="alert">
          {errors[name]?.message}
        </p>
      )} */}
    </div>
  )
}

export default TextArea
