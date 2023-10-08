import React, { useState } from 'react'
import Select from 'react-select'
import Button from '../partials/Button/Button'
import './SelectTarea.css'

// const tareasOptions = [
//   { value: 'Tarea1', id: 1, label: 'Impresora' },
//   { value: 'Tarea2', id: 2, label: 'Notebook' },
//   { value: 'Tarea3', id: 3, label: 'Monitor' },
//   { value: 'Tarea4', id: 4, label: 'SSD' },
//   { value: 'Tarea5', id: 5, label: 'Otras' },
//   { value: 'Tarea6', id: 6, label: 'Scanner' }
// ]

function SelectTarea ({tareas}) {
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
            <button className={`btn-tarea ${tareaSelecionado && tareaSelecionado.id === option.id ? "btn-tarea-focus" : ""}`} key={option.id} onClick={() => openModal(option)}>
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
      {/* <h2>{tareaSelecionado ? tareaSelecionado.label : ''}</h2> */}
      {tareaFinalizada
        ? (
        <>
          <label>Detalle de finalización:</label>
          <textarea className="detalle-fin-tarea" name="detalleFinTarea" />
          <div className="d-flex justify-content-end mt-2">
            <Button
              onClick={closeModal}
              classBoton="mx-1 btn-modal cancel-tarea"
              texto="Cancelar"
            />
            <Button
              onClick={handleTaskCompletion}
              classBoton="mx-1 btn-modal finish-tarea"
              texto="Finalizar"
            />
          </div>
        </>
          )
        : (
        <>
          <div className="d-flex justify-content-center">
            <Button
                onClick={handleFinishTask}
                classBoton="mx-1 btn-modal finish-tarea"
                texto="Finalizar Tarea"
              />
              <Button
                onClick={closeModal}
                classBoton="mx-1 btn-modal cancel-tarea"
                texto="Cancelar"
              />
              <Button
                onClick={handleEliminarTarea}
                classBoton="mx-1 btn-modal delete-terea"
                texto="Eliminar"
              />
          </div>
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
          <div className="mt-3">
            <Select
                isMulti
                name="Tareas"
                options={tareas}
                onChange={handleSelectChange}
                value={selectedOptions}
              />
          </div>
          <div className="d-flex justify-content-end mt-2">
            <Button
              onClick={handleSaveSelection}
              classBoton="mx-1 btn-modal finish-tarea"
              texto="Guardar Tareas"
            />
          </div>
        </>
        )
        }
      {showModal && <div>{renderModalContent()}</div>}
    </section>
  )
}

export default SelectTarea
