import React, { useState } from 'react'
import Select from 'react-select'

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

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected)
  }

  const handleSaveSelection = () => {
    if (selectedOptions.length > 0) {
      setSavedTareas([...savedTareas, ...selectedOptions])
      setSelectedOptions([])
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
      const updatedTareas = savedTareas.filter(task => task.id !== tareaSelecionado.id)
      setSavedTareas(updatedTareas)
      closeModal()
    }
  }

  return (
    <div>
      <div>
        <p>Tareas: {savedTareas.map(option => <button key={option.id} onClick={() => openModal(option)}>{option.label}</button>)}</p>
      </div>
      <Select
        isMulti
        name="Tareas"
        options={tareasOptions}
        onChange={handleSelectChange}
        value={selectedOptions}
      />
      <button onClick={handleSaveSelection}>Guardar Tareas</button>

      {showModal && (
        <div >
          <div className="modal-content">
            <h2>{tareaSelecionado ? tareaSelecionado.label : ''}</h2>
            {tareaFinalizada
              ? (
              <>
                <p>Tarea finalizada</p>
                <label>Motivo de finalización:</label>
                <textarea name='detalleFinTarea'
                 />
                <button onClick={handleTaskCompletion}>Finalizar</button>
              </>
                )
              : (
              <>
                <button onClick={handleFinishTask}>Finalizar Tarea</button>
                <button onClick={closeModal}>Cancelar</button>
                <button onClick={handleEliminarTarea}>Eliminar</button>
              </>
                )}
          </div>
        </div>
      )}
    </div>
  )
}

export default SelectTarea
