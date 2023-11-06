import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import Button from "../partials/Button/Button";
import "./SelectTarea.css";

function SelectTarea({
  tareas,
  ticketTareas,
  ticketId,
  user,
  setHistorialMensajes,
  historialMensajes,
  setTicketTareas
}) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [savedTareas, setSavedTareas] = useState([]);
  const [tareaSelecionado, setTareaSeleccionado] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [tareaFinalizada, setTareaFinalizada] = useState(false);
  const [showSelect, setShowSelect] = useState(false);
  const textarea = useRef()

  useEffect(() => {
    console.log('TICKETS TAREA => ',ticketTareas);
    setSavedTareas(ticketTareas);
  }, [ticketTareas]);

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  const handleSaveSelection = () => {
    if (selectedOptions.length > 0) {
      let response
      selectedOptions.forEach(async (option) => {
        response = await saveTarea(option);
        option.id_relacion = response.id
        option.estado = response.estado
      });
      setSavedTareas([...savedTareas, ...selectedOptions]);
      setSelectedOptions([]);
      setShowSelect(false); // Ocultar el select al guardar
      setTicketTareas([...savedTareas, ...selectedOptions])
    }
  };

  const saveTarea = async (option) => {
    setHistorialMensajes([
      {
        sector: user.sector.toUpperCase(),
        mensaje: `Se agrego la tarea ${option.value} al ticket`,
        fecha_creacion: "Hace unos minutos...",
      },
      ...historialMensajes,
    ]);
    const response = await fetch(
      `http://localhost:8000/api/tickets/${ticketId}/tareas/?tarea=${option.value}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-usuario": user.id,
        },
      }
    );
    const result = await response.json();
    return result;
  };

  const openModal = (task) => {
    if (task.estado !== 'FINALIZADA') {
      setTareaSeleccionado(task);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setTareaSeleccionado(null);
    setShowModal(false);
    setTareaFinalizada(false);
  };

  const handleFinishTask = () => {
    setTareaFinalizada(true);
  };

  const handleTaskCompletion = async () => {
    let response = await finalizarTarea(tareaSelecionado);    
    if ('id' in response) {
      setHistorialMensajes([
        {
          sector: user.sector.toUpperCase(),
          mensaje: `El usuario ${user.nombre} finalizo la tarea ${tareaSelecionado.value} <br>
                Detalle de la tarea: ${textarea.current.value}`,
          fecha_creacion: "Hace unos minutos...",
        },
        ...historialMensajes,
      ]);
      let savedTareasCopy = savedTareas.map(tarea => (tarea.id == tareaSelecionado.id ? {...tarea, estado: 'FINALIZADA'} : tarea))
      setSavedTareas(savedTareasCopy);
      setTicketTareas(savedTareasCopy)
    }
    closeModal();
  };

  const finalizarTarea = async (tarea) => {
    let response = await fetch(
      `http://localhost:8000/api/tickets/${ticketId}/tareas/${tarea.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-usuario": user.id,
        },
      }
    );
    const result = await response.json();
    return result
  };

  const handleEliminarTarea = async () => {
    if (tareaSelecionado) {
      let result = await eliminarTarea(tareaSelecionado)
      let data = await result.json()
      console.log(data);
      if(result.status == '200') {
        setHistorialMensajes([
          {
            sector: user.sector.toUpperCase(),
            mensaje: `El usuario ${user.nombre} elimino la tarea ${tareaSelecionado.value}`,
            fecha_creacion: "Hace unos minutos...",
          },
          ...historialMensajes,
        ]);
        const updatedTareas = savedTareas.filter(
          (task) => task.id !== tareaSelecionado.id
        );
        setSavedTareas(updatedTareas);
        setTicketTareas(updatedTareas)
      }
      closeModal();
    }
  };

  const eliminarTarea = async (tarea) => {
    let response = await fetch(
      `http://localhost:8000/api/tickets/${ticketId}/tareas/${tarea.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-usuario": user.id,
        },
      }
    );
    return response;
  };

  const renderSavedTareas = () => (
    <article className="container-tareas">
      <p className="strong-title my-2">Tareas a realizar:</p>
      <div className="d-flex align-items-center">
        <div
          className="border border-1 flex-grow-1 list-tareas"
          style={{ minHeight: "35px" }}
        >
          {savedTareas.map((option) => (
            <button
              className={`btn-tarea ${
                tareaSelecionado && tareaSelecionado.id === option.id
                  ? "btn-tarea-focus"
                  : ""
              } ${option.estado == "FINALIZADA" ? "btn-tarea-finalizada" : ""}`}
              key={option.id}
              onClick={() => openModal(option)}
            >
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
        )}
      </div>
    </article>
  );

  const renderModalContent = () => (
    <div className="modal-content">
      {tareaFinalizada ? (
        <>
          <label>Detalle de finalización:</label>
          <textarea className="detalle-fin-tarea" name="detalleFinTarea" ref={textarea}/>
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
      ) : (
        <>
          <div className="d-flex justify-content-end">
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
  );

  return (
    <section>
      {renderSavedTareas()}

      {showSelect && (
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
      )}
      {showModal && <div>{renderModalContent()}</div>}
    </section>
  );
}

export default SelectTarea;
