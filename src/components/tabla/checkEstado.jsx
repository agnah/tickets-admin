import React, { useContext } from 'react'
import { FiltrosContext } from '../tabla/contextTabla'
import { estadoTicket } from '@constantes/constTickets'

function CheckEstado ({ onChange, seleccionados }) {
  const { handleFiltroUserChange } = useContext(FiltrosContext)
  const { PENDIENTE, EN_CURSO, ANULADO, FINALIZADO } = estadoTicket
  const handleMarketingChange = (e) => {
    const value = e.target.value

    if (e.target.checked) {
      onChange(prevSeleccionados => {
        const nuevosSeleccionados = [...prevSeleccionados, value]
        if (nuevosSeleccionados.length === 1 && nuevosSeleccionados[0] === PENDIENTE) {
          handleFiltroUserChange('')
        }
        return nuevosSeleccionados
      })
    } else {
      const nuevosSeleccionados = seleccionados.filter(filtro => filtro !== value)
      if (nuevosSeleccionados.length === 1 && nuevosSeleccionados[0] === PENDIENTE) {
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
        if (nuevosSeleccionados.includes(PENDIENTE) && nuevosSeleccionados.length === 1) {
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
        <input type="checkbox" name="estado" value={PENDIENTE}
          onChange={handleMarketingChange}
          checked={seleccionados.includes(PENDIENTE)} />
        Pendiente
      </label>
      {/* <label>
        <input type="checkbox" name="estado" value={ASIGNADO} onChange={onChangeValue} checked={seleccionados.includes(ASIGNADO)} />
        Asignado
      </label> */}
      <label>
        <input type="checkbox" name="estado" value={EN_CURSO} onChange={onChangeValue} checked={seleccionados.includes(EN_CURSO)} />
        En Curso
      </label>
      <label>
        <input type="checkbox" name="estado" value={FINALIZADO} onChange={onChangeValue} checked={seleccionados.includes(FINALIZADO)} />
        Finalizado
      </label>
      <label>
        <input type="checkbox" name="estado" value={ANULADO} onChange={onChangeValue} checked={seleccionados.includes(ANULADO)} />
        Anulado
      </label>
    </div>
  )
}

export default CheckEstado
