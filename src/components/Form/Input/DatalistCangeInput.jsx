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

  const isError = errors[name]?.message

  const classes = isError
    ? `${classCol} has-error error-border`
    : `${classCol}`

  const placeholderText = isError ? errors[name]?.message : attributes?.placeholder

  const handleChangeInput = () => {
    setChangeInput(!changeInput)
  }

  return (
    <div className={`d-flex flex-column input-container ${classes}`}>
      <div className="label-container">
        <label className="label-form" htmlFor={name}>{label}</label>
        <label
          htmlFor="otro"
          className="check-label"
        >
          <input className="check-input" type="checkbox" name="Otro" id="" onChange={handleChangeInput} />{' '}
          Otro
        </label>
      </div>
      <div className="w-100 form-group item-form">
        {changeInput
          ? (
          <>
            <input
              name={name}
              {...attributes}
              {...register(name, options)}
              list={idList}
              placeholder={placeholderText}
              className={`${isError ? 'help-block error error-style detalle-input w-100' : 'detalle-input w-100'}`}
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
      </div>
      {/* {errors[name] && (
        <p className="help-block error text-error" role="alert">
          {errors[name]?.message}
        </p>
      )} */}
    </div>
  )
}

export default DatalistChangeInput
