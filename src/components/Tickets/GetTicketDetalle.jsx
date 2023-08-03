import React, { useState } from 'react'
import UserDataService from '../../servicios/TicketDetalleService'
import Button from '../partials/Button/Button'
import Select from 'react-select'

const tecnicos = [
  { value: 'juan', label: 'Juan' },
  { value: 'pedro', label: 'Pedro' },
  { value: 'maria', label: 'Maria' },
  { value: 'luis', label: 'Luis' },
  { value: 'jose', label: 'Jose' },
  { value: 'laura', label: 'Laura' }
]

const GetTicketDetalle = ({ id }) => {
  const { user, loading, error } = UserDataService(id)
  const [showSelect, setShowSelect] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)

  const handleSelectTecnico = () => {
    setShowSelect(!showSelect)
  }

  const handleSelectChange = (selected) => {
    setSelectedOption(selected)
  }

  if (loading) {
    return <div>Cargando...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!user) {
    return <div>No se encontraron datos del usuario.</div>
  }

  return (
    <div>
      <h2>{user.firstName}</h2>
      <p>Email: {user.email}</p>
      <p>Posicion: {user.company.department}</p>
      <Button classBoton="btn btn-badge btn-open" texto="Editar" />
      <p>Tecnico Asignado</p>
      {showSelect
        ? (
        <>
          <Select
            name="Tareas"
            options={tecnicos}
            onChange={handleSelectChange}
            value={selectedOption}
          />
          <Button
            classBoton="mx-1 btn btn-success"
            texto="Seleccionar Tecnico"
            onClick={handleSelectTecnico}
          />
        </>
          )
        : (
        <>
          <Button
            id="asignado"
            classBoton="mx-1 btn btn-success"
            texto={selectedOption ? selectedOption.label : user.firstName}
          />
          <Button
            id="modificar"
            classBoton="mx-1 btn btn-danger"
            texto="Cambiar Tecnico"
            onClick={handleSelectTecnico}
          />
        </>
          )}
    </div>
  )
}

export default GetTicketDetalle
