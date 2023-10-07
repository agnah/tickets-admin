import React, { useState } from 'react'
import Select from 'react-select'
import Button from '../partials/Button/Button'
import './SelectTarea.css'

const tareasOptions = [
  { value: 'Tarea1', id: 1, label: 'Impresora' },
  { value: 'Tarea2', id: 2, label: 'Notebook' },
  { value: 'Tarea3', id: 3, label: 'Monitor' },
  { value: 'Tarea4', id: 4, label: 'SSD' },
  { value: 'Tarea5', id: 5, label: 'Otras' },
  { value: 'Tarea6', id: 6, label: 'Scanner' }
]

function SelectTarea () {
  const [selectedOptions, setSelectedOptions] = useState([])
  const [savedTareas, setSavedTareas] = useState([])
  const [tareaSelecionado, setTareaSeleccionado] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [tareaFinalizada, setTareaFinalizada] = useState(false)
  const [showSelect, setShowSelect] = useState(false)

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected)
  }

  const handleSaveSelection = () => {
    if (selectedOptions.length > 0) {
      setSavedTareas([...savedTareas, ...selectedOptions])
      setSelectedOptions([])
      setShowSelect(false) // Ocultar el select al guardar
    }
  }

  const openModal = (task) => {
    setTareaSeleccionado(task)
    setShowModal(true)
  }

  const closeModal = () => {
    setTareaSeleccionado(null)
    setShowModal(false)
    setTareaFinalizada(false)
  }

  const handleFinishTask = () => {
    setTareaFinalizada(true)
  }

  const handleTaskCompletion = () => {
    closeModal()
  }

  const handleEliminarTarea = () => {
    if (tareaSelecionado) {
      const updatedTareas = savedTareas.filter(
        (task) => task.id !== tareaSelecionado.id
      )
      setSavedTareas(updatedTareas)
      closeModal()
    }
  }

  const renderSavedTareas = () => (
    <article className="container-tareas">
      <p className="strong-title my-2">Tareas a realizar:</p>
      <div className='d-flex align-items-center'>
        <div className="border border-1 flex-grow-1 list-tareas" style={{ minHeight: '35px' }}>
          {savedTareas.map((option) => (
            <button className="btn-tarea" key={option.id} onClick={() => openModal(option)}>
              {option.label}
            </button>
          ))}
        </div>
        {!showSelect && (
          <Button
            onClick={() => setShowSelect(true)}
            classBoton="btn flex-shrink-1 btn-tareas"
            texto="+"
          />
        )
          }
      </div>
    </article>
  )

  const renderModalContent = () => (
    <div className="modal-content">
      <h2>{tareaSelecionado ? tareaSelecionado.label : ''}</h2>
      {tareaFinalizada
        ? (
        <>
          <label>Detalle de finalización:</label>
          <textarea name="detalleFinTarea" />
          <Button
            onClick={closeModal}
            classBoton="mx-1 btn btn-success"
            texto="Cancelar"
          />
          <Button
            onClick={handleTaskCompletion}
            classBoton="mx-1 btn btn-success"
            texto="Finalizar"
          />
        </>
          )
        : (
        <>
          <Button
            onClick={handleFinishTask}
            classBoton="mx-1 btn btn-success"
            texto="Finalizar Tarea"
          />
          <Button
            onClick={closeModal}
            classBoton="mx-1 btn btn-success"
            texto="Cancelar"
          />
          <Button
            onClick={handleEliminarTarea}
            classBoton="mx-1 btn btn-success"
            texto="Eliminar"
          />
        </>
          )}
    </div>
  )

  return (
    <section>

        {renderSavedTareas()}

      {showSelect &&
        (
        <>
          <Select
            isMulti
            name="Tareas"
            options={tareasOptions}
            onChange={handleSelectChange}
            value={selectedOptions}
          />
          <Button
            onClick={handleSaveSelection}
            classBoton="mx-1 btn btn-success"
            texto="Guardar Tareas"
          />
        </>
        )
        }
      {showModal && <div>{renderModalContent()}</div>}
    </section>
  )
}

export default SelectTarea
