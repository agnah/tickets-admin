import { useState } from 'react'
import './DatalistChangeInput.css'

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
    <div className={classes}>
      <div className="label-container">
        <label htmlFor={name}>{label}</label>
        <label
          htmlFor="otro"
          className="check-label"
        >
          <input className="check-input" type="checkbox" name="Otro" id="" onChange={handleChangeInput} />{' '}
          Otro
        </label>
      </div>
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
              className="detalle-input"
              onChange={onChangeSolicitante}
            />
            <datalist id={idList} >
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
            className="detalle-input"
            formNoValidate
            onChange={attributes?.onChangeInput}
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
