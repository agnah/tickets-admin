function TextArea (props) {
  const { label, name, register, options, errors, classCol, ...attributes } = props

  const classes = errors[name]?.message
    ? `${classCol} has-error`
    : `${classCol}`

  return (
    <div className={classes}>
      <label htmlFor={name}>{label}</label>
      <textarea
        name={name}
        {...attributes}
        {...register(name, options)}
        className="form-control"
        cols='1'
        onChange={attributes?.onChangeInput}
        value={attributes?.value}
        style={{ height: '38px' }}
      />
      {errors[name] && (
        <p className="help-block error" role="alert">
          {errors[name]?.message}
        </p>
      )}
    </div>
  )
}

export default TextArea
