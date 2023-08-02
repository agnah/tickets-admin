import React, { useContext } from 'react'
import { FiltrosContext } from '../tabla/contextTabla'

function CheckEstado ({ onChange, seleccionados }) {
  const { handleFiltroUserChange } = useContext(FiltrosContext)

  // const handleMarketingChange = (e) => {
  //   const value = e.target.value

  //   if (e.target.checked) {
  //     onChange(prevSeleccionados => [...prevSeleccionados, value])
  //   } else {
  //     const nuevosSeleccionados = seleccionados.filter(filtro => filtro !== value)
  //     if (nuevosSeleccionados.includes('marketing') && nuevosSeleccionados.length === 1) {
  //       handleFiltroUserChange('')
  //       console.log('paso')
  //     }
  //     onChange(nuevosSeleccionados)
  //   }
  // }

  const handleMarketingChange = (e) => {
    const value = e.target.value

    if (e.target.checked) {
      onChange(prevSeleccionados => {
        const nuevosSeleccionados = [...prevSeleccionados, value]
        if (nuevosSeleccionados.length === 1 && nuevosSeleccionados[0] === 'marketing') {
          handleFiltroUserChange('')
        }
        return nuevosSeleccionados
      })
    } else {
      const nuevosSeleccionados = seleccionados.filter(filtro => filtro !== value)
      if (nuevosSeleccionados.length === 1 && nuevosSeleccionados[0] === 'marketing') {
        handleFiltroUserChange('')
      }
      onChange(nuevosSeleccionados)
    }
  }

  const onChangeValue = (e) => {
    const value = e.target.value

    if (e.target.checked) {
      if (value === '') {
        onChange('')
      } else {
        onChange(prevSeleccionados => [...prevSeleccionados, value])
      }
    } else {
      if (Array.isArray(seleccionados)) {
        const nuevosSeleccionados = seleccionados.filter(filtro => filtro !== value)
        if (nuevosSeleccionados.includes('marketing') && nuevosSeleccionados.length === 1) {
          handleFiltroUserChange('')
        }
        onChange(nuevosSeleccionados)
      }
    }
  }

  return (
    <div>
      <label>
        <input type="checkbox" name="estado" value='' onChange={onChangeValue} checked={seleccionados.length === 0} />
        Todos
      </label>
      <label>
        <input type="checkbox" name="estado" value="marketing"
          onChange={handleMarketingChange}
          checked={seleccionados.includes('marketing')} />
        Nuevo marketing
      </label>
      <label>
        <input type="checkbox" name="estado" value="services" onChange={onChangeValue} checked={seleccionados.includes('services')} />
        Asignado services
      </label>
      <label>
        <input type="checkbox" name="estado" value="support" onChange={onChangeValue} checked={seleccionados.includes('support')} />
        En Curso support
      </label>
      <label>
        <input type="checkbox" name="estado" value="accounting" onChange={onChangeValue} checked={seleccionados.includes('accounting')} />
        Finalizado accounting
      </label>
      <label>
        <input type="checkbox" name="estado" value="sales" onChange={onChangeValue} checked={seleccionados.includes('sales')} />
        Anulado sales
      </label>
    </div>
  )
}

export default CheckEstado
