import { useState } from 'react'

const DatalistChangeInput = (props) => {
  const [changeInput, setChangeInput] = useState(true)

  const {
    idList,
    label,
    name,
    placeholder,
    register,
    options,
    errors,
    optionList,
    classCol,
    onChangeSolicitante,
    ...attributes
  } = props

  const classes = errors[name]?.message
    ? `${classCol} has-error`
    : `${classCol}`

  const handleChangeInput = () => {
    setChangeInput(!changeInput)
  }

  return (
    <div className={classes} style={{ position: 'relative' }}>
      <label
        htmlFor="otro"
        style={{ position: 'absolute', right: '12px', top: '5px' }}
      >
        <input type="checkbox" name="Otro" id="" onChange={handleChangeInput} />{' '}
        Otro
      </label>
      <label htmlFor={name}>{label}</label>
      <div className="form-group item-form">
        {changeInput
          ? (
          <>
            <input
              name={name}
              {...attributes}
              {...register(name, options)}
              list={idList}
              placeholder={placeholder}
              className="form-control"
              onChange={onChangeSolicitante}
            />
            <datalist id={idList}>
              {optionList.map((option, index) => (
                <option key={index} value={option}></option>
              ))}
            </datalist>
          </>
            )
          : (
          <input
            name={name}
            {...attributes}
            {...register(name, options)}
            className="form-control"
            formNoValidate
          />
            )}
      {errors[name] && (
        <p className="help-block error" role="alert">
          {errors[name]?.message}
        </p>
      )}
      </div>
    </div>
  )
}

export default DatalistChangeInput
