import React, { useEffect, useState } from "react";
// import Button from '../partials/Button/Button'
// import Select from 'react-select'
// import ButtonEdit from '../partials/Button/ButtonEdit'
import { useForm } from "react-hook-form";
import solicitantes from "../../../public/assets/solicitantes.json";
import DatalistChangeInput from "../../components/Form/Input/DatalistCangeInput";
import InputForm from "../../components/Form/Input/InputForm";
import SelectInput from "../../components/Form/Input/Select";
import SelectTecnico from "../Form/Input/SelectWithOption";
import TextArea from "../../components/Form/Input/TextArea";
import SelectTarea from "@components/Tickets/SelectTarea";
import "./GetDetalleTicket.css";
import { useNavigate } from "react-router-dom";
import Badge from "../partials/Button/Badge";

const optionListSelect = [
  "COMPUTOS",
  "TELEFONIA",
  "SOPORTE",
  "SISTEMAS",
  "GDE",
];
const optionListAreaSolicitante = [
  "ADMINISTRACION",
  "RRHH",
  "CONTABILIDAD",
  "LEGALES",
];

function formatearFecha(fecha) {
  const meses = [
    "Ene.",
    "Feb.",
    "Mar.",
    "Abr.",
    "May.",
    "Jun.",
    "Jul.",
    "Ago.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dic.",
  ];

  const dia = fecha.getDate();
  const mes = meses[fecha.getMonth()];
  const año = fecha.getFullYear();
  const hora = fecha.getHours();
  const minutos = fecha.getMinutes();

  const diaFormateado = dia < 10 ? `0${dia}` : dia;
  const horaFormateada = hora < 10 ? `0${hora}` : hora;
  const minutosFormateados = minutos < 10 ? `0${minutos}` : minutos;

  return `${diaFormateado} ${mes} ${año}, ${horaFormateada}:${minutosFormateados} hs`;
}

const REGEX_EMAIL = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

const GetTicketDetalle = ({ ticket, setTicket }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();
  const [ticketInfo, setTicketInfo] = useState({
    id: ticket.id,
    identificador: ticket.identificador,
    nombre_solicitante: ticket.nombre_solicitante,
    email_solicitante: ticket.email_solicitante,
    fecha_creacion: ticket.fecha_creacion,
    telefono_solicitante: ticket.telefono_solicitante,
    area_solicitante: ticket.area_solicitante,
    sede: ticket?.sede || "nueve_de_julio",
    piso_solicitante: ticket.piso_solicitante,
    referencia: ticket.referencia,
    prioridad: ticket.prioridad,
    descripcion: ticket.descripcion,
    tecnico_asignado_id: ticket.tecnico_asignado_id,
    area_asignada_id: ticket.area_asignada_id,
    estado: ticket.estado,
    nro_gde: ticket.nro_gde,
  });
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [ticketTareas, setTicketTareas] = useState([]);
  const [edit, setEdit] = useState(false);
  const [historialMensajes, setHistorialMensajes] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);
  const [tareas, setTareas] = useState([]);
  // const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    getTecnicos(ticketInfo.area_asignada_id);
    getTareasPorArea(ticketInfo.area_asignada_id);
    getHistorial(ticketInfo.id);
  }, []);

  useEffect(() => {
    let tareas_restantes = ticketTareas.filter(
      (tarea) => tarea.estado !== "FINALIZADA"
    );
    // console.log("TAREAS RESTANTES =>", tareas_restantes.length);
    // if (tareas_restantes.length > 0) {
    //   setShowButtons(false);
    // } else {
    //   setShowButtons(true);
    // }
  }, [ticketTareas]);

  let disable = {
    opacity: "0.7",
    cursor: "not-allowed",
    pointerEvents: "none",
  };

  const getTecnicos = async (id_area) => {
    setTecnicos([]);
    let response = await fetch(`http://localhost:8000/api/usuario/${id_area}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    let tecnicos_por_area = await response.json();
    setTecnicos(tecnicos_por_area);
    console.log(tecnicos_por_area);
  };

  const getTareasPorArea = async (id_area) => {
    let response = await fetch(
      `http://localhost:8000/api/area/tareas/${id_area}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let tareas_por_area = await response.json();
    tareas_por_area = tareas_por_area.map((tarea) => ({
      value: tarea.tarea,
      id: tarea.id,
      label: tarea.tarea,
    }));
    if (ticket.tareas.length > 0) {
      let ticketTareasId = ticket.tareas
        // .filter((tarea) => tarea.estado == "ACTIVA")
        .map((tarea) => tarea.tarea_id);
      let tareasTicketsArr = [];
      tareas_por_area.forEach((tarea_por_area) => {
        if (ticketTareasId.includes(tarea_por_area.id)) {
          let tarea_estado = ticket.tareas.filter(
            (tarea) => tarea.tarea_id == tarea_por_area.id
          );
          tareasTicketsArr.push({
            ...tarea_por_area,
            estado: tarea_estado[0].estado,
            id_relacion: tarea_estado[0].id,
          });
        }
      });
      setTicketTareas(tareasTicketsArr);
    }
    setTareas(tareas_por_area);
  };

  const getHistorial = async (id_ticket) => {
    let response = await fetch(
      `http://localhost:8000/api/tickets/${id_ticket}/historial`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let result = await response.json();
    result?.detail?.error
      ? setHistorialMensajes([])
      : setHistorialMensajes(result);
  };

  const updateTicket = async (updateTicket) => {
    let data = {
      nombre_solicitante: updateTicket.nombre_solicitante,
      telefono_solicitante: updateTicket.telefono_solicitante,
      area_solicitante: updateTicket.area_solicitante,
      sede_solicitante: "nueve_de_julio",
      piso_solicitante: updateTicket.piso_solicitante,
      referencia: updateTicket.referencia,
      prioridad: updateTicket.prioridad,
      tecnico_asignado_id: null,
      descripcion: updateTicket.descripcion,
      tecnico_asignado_id: updateTicket.tecnico_asignado_id,
      estado: updateTicket.estado,
      nro_gde: updateTicket.nro_gde,
    };

    let response = await fetch(
      `http://localhost:8000/api/tickets/actualizaciones/${ticket.id}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "x-usuario": user.id,
        },
      }
    );
    let result = await response.json();
    setTicket({ ...ticketInfo, ...data });
  };

  const derivarTicket = async (id_area) => {
    let response = await fetch(
      `http://localhost:8000/api/tickets/derivaciones/${ticket.id}/?area_id=${id_area}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-usuario": user.id,
        },
      }
    );
    let result = await response.json();
    setTicket(result);
    getTecnicos(id_area);
    getTareasPorArea(id_area);
    navigate("/tickets");
  };

  const handleSelectChange = (e) => {
    let ticket_update_info;
    if (e.target.name === "tecnico_asignado") {
      let nombre_tecnico = tecnicos.find(
        (tecnico) => tecnico.id == e.target.value
      ).nombre;

      setTicketInfo({
        ...ticketInfo,
        tecnico_asignado_id: e.target.value,
        estado: "en_curso",
      });
      ticket_update_info = {
        ...ticketInfo,
        tecnico_asignado_id: e.target.value,
        estado: "en_curso",
      };
      let tecnico = tecnicos.find((tecnico) => (tecnico.id = e.target.value));
      saveHistorial({
        ticket_id: ticketInfo.id,
        registro_anterior_id: null,
        area_anterior_id: optionListSelect.indexOf(user.sector.toUpperCase()) + 1,
        tecnico_anterior_id: ticketInfo.tecnico_asignado_id,
        notas: `Se asigno al técnico ${tecnico.nombre}`,
        creado_por_id: user.id,
      })
      updateTicket(ticket_update_info);
      getTecnicos(ticketInfo.area_asignada_id);
      setMessage(`Se asigno el tecnico ${nombre_tecnico} correctamente`);
      setShow(true);
    }
    if (e.target.name === "derivar") {
      // let respuesta = confirm("Esta seguro que desea derivar a otra area?");
      // if (respuesta) {
      if (e.target.value != "") {
        setTicketInfo({ ...ticketInfo, area_asignada: e.target.value });
        saveHistorial({
          ticket_id: ticketInfo.id,
          registro_anterior_id: null,
          area_anterior_id: optionListSelect.indexOf(user.sector.toUpperCase()) + 1,
          tecnico_anterior_id: ticketInfo.tecnico_asignado_id,
          notas: `El usuario ${user?.nombre} derivo el ticket a ${
            optionListSelect[e.target.value - 1]
          }`,
          creado_por_id: user.id,
        })
        // setHistorialMensajes([
        //   ...historialMensajes,
        //   {
        //     sector: user.sector[0],
        //     mensaje: `El usuario ${user?.nombre} derivo el ticket a ${
        //       optionListSelect[e.target.value - 1]
        //     }`,
        //     fecha_creacion: `Hace unos minutos...`,
        //   },
        // ]);
        derivarTicket(e.target.value);
      }
      // } else {
      //   e.target.value = "";
      // }
    }
  };

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    let data = {
      ticket_id: ticketInfo.id,
      registro_anterior_id: null,
      area_anterior_id: optionListSelect.indexOf(user.sector.toUpperCase()) + 1,
      tecnico_anterior_id: ticketInfo.tecnico_asignado_id,
      notas: e.target[0].value,
      creado_por_id: user.id,
    };
    saveHistorial(data);
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleCancelEdit = () => {
    setEdit(!edit);
    setTicketInfo({
      id: ticket.id,
      identificador: ticket.identificador,
      nombre_solicitante: ticket.nombre_solicitante,
      email_solicitante: ticket.email_solicitante,
      fecha_creacion: ticket.fecha_creacion,
      telefono_solicitante: ticket.telefono_solicitante,
      area_solicitante: ticket.area_solicitante,
      sede: ticket?.sede || "nueve_de_julio",
      piso_solicitante: ticket.piso_solicitante,
      referencia: ticket.referencia,
      prioridad: ticket.prioridad,
      // pre_tarea: ticket.pre_tarea,
      descripcion: ticket.descripcion,
      tecnico_asignado_id: ticket.tecnico_asignado_id,
      area_asignada_id: ticket.area_asignada_id,
      estado: ticket.estado,
      nro_gde: ticket.nro_gde,
    });
    // setSolicitanteEmail(ticket.email);
  };

  const onSubmit = (data) => {
    setTicketInfo({
      ...ticketInfo,
      prioridad: data.prioridad ? "alta" : "baja",
    });
    updateTicket({
      ...ticketInfo,
      prioridad: data.prioridad ? "alta" : "baja",
    });
    setEdit(!edit);
    saveHistorial({
      ticket_id: ticketInfo.id,
      registro_anterior_id: null,
      area_anterior_id: optionListSelect.indexOf(user.sector.toUpperCase()) + 1,
      tecnico_anterior_id: ticketInfo.tecnico_asignado_id,
      notas: `El usuario ${user?.nombre} modifico la información del solicitante`,
      creado_por_id: user.id,
    })
    // setHistorialMensajes([
    //   ...historialMensajes,
    //   {
    //     sector: user.sector.toUpperCase(),
    //     mensaje: `El usuario ${user?.nombre} modifico la información del solicitante`,
    //     fecha_creacion: `Hace unos minutos...`,
    //   },
    // ]);
    setMessage("Se actualizo la información del solicitante correctamente");
    setShow(true);
  };

  const onChangeInput = (e) => {
    let { value, name } = e.target;
    if (name == "area_solicitante")
      value = optionListAreaSolicitante[value - 1];
    setTicketInfo({ ...ticketInfo, [name]: value });
  };

  const handleRadioChange = (e) => {
    if (e.target.value == "baja") {
      setTicketInfo({ ...ticketInfo, prioridad: "alta" });
    } else {
      setTicketInfo({ ...ticketInfo, prioridad: "baja" });
    }
  };

  const handleAnular = async (e) => {
    let response = await fetch(
      `http://localhost:8000/api/tickets/${ticketInfo.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-usuario": user.id,
        },
      }
    );
    let result = await response.json();
    setTicket({ ...ticketInfo, ...result });
    navigate("/tickets");
  };

  const handleFinalizar = async (e) => {
    let response = await fetch(
      `http://localhost:8000/api/tickets/finalizar/${ticketInfo.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-usuario": user.id,
        },
      }
    );
    let result = await response.json();
    setTicket({ ...ticketInfo, ...result });
    navigate("/tickets");
  };

  const saveHistorial = async (data) => {
    let response = await fetch(
      `http://localhost:8000/api/tickets/${data.ticket_id}/historial`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    let result = await response.json();
    setHistorialMensajes(result)
  };

  return (
    <>
      {show && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          {message}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => {
              setMessage("");
              setShow(!show);
            }}
          ></button>
        </div>
      )}

      <section className="row">
        <article className="col-md-7 position-relative container-left-detalle">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            autoComplete="off"
            className="d-flex flex-column"
            style={
              ticketInfo.estado == "anulado" ||
              ticketInfo.estado == "finalizado"
                ? disable
                : {}
            }
          >
            <div className="row">
              <div className="col-md-6">
                <p className="d-flex align-items-center item-form">
                  <strong className="strong-title">Solicitante:</strong>{" "}
                  {edit ? (
                    <>
                      <InputForm
                        label=""
                        type="text"
                        name="nombre_solicitante"
                        placeholder=""
                        register={register}
                        errors={errors}
                        classCol="form-group item-form"
                        options={{
                          required: "Campo obligatorio",
                        }}
                        onChangeInput={onChangeInput}
                        value={ticketInfo.nombre_solicitante}
                      />
                    </>
                  ) : (
                    ticketInfo.nombre_solicitante
                  )}
                </p>
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <p
                  className={
                    edit
                      ? "w-100 d-flex align-items-center item-form"
                      : "w-100 d-flex align-items-center item-form email-view-style"
                  }
                >
                  <strong className="strong-title">Email:</strong>{" "}
                  {ticketInfo.email_solicitante}
                </p>
              </div>
              <div className="col-md-6">
                <p className="w-100 d-flex align-items-center item-form">
                  <strong className="strong-title">Teléfono:</strong>
                  {edit ? (
                    <InputForm
                      label=""
                      type="text"
                      name="telefono_solicitante"
                      placeholder=""
                      register={register}
                      errors={errors}
                      classCol="d-flex ms-2 form-group item-form"
                      options={{
                        required: "Campo obligatorio",
                      }}
                      onChangeInput={onChangeInput}
                      value={ticketInfo.telefono_solicitante}
                    />
                  ) : (
                    ticketInfo.telefono_solicitante
                  )}
                </p>
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <div>
                  <p className="d-flex align-items-center item-form">
                    <strong className="strong-title">Area:</strong>{" "}
                    {edit ? (
                      <SelectInput
                        label=""
                        name="area_solicitante"
                        placeholder="Selecciona un área"
                        optionList={optionListAreaSolicitante}
                        register={register}
                        errors={errors}
                        classCol="d-flex ms-2"
                        options={{
                          required: "Campo obligatorio",
                        }}
                        onChangeInput={onChangeInput}
                        selectedOption={ticketInfo.area_solicitante.toUpperCase()}
                      />
                    ) : (
                      ticketInfo.area_solicitante.toUpperCase()
                    )}
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <p className="d-flex align-items-center item-form">
                  <strong className="strong-title">Sede:</strong>{" "}
                  {ticketInfo.sede}
                </p>
              </div>
              <div className="col-md-6">
                <p className="d-flex align-items-center item-form">
                  <strong className="strong-title">Piso:</strong>{" "}
                  {edit ? (
                    <SelectInput
                      label=""
                      name="piso_solicitante"
                      placeholder=""
                      optionList={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                      register={register}
                      errors={errors}
                      classCol="d-flex ms-2"
                      options={{
                        required: "Campo obligatorio",
                      }}
                      selectedOption={Number(ticketInfo.piso_solicitante)}
                      onChangeInput={onChangeInput}
                    />
                  ) : (
                    ticketInfo.piso_solicitante
                  )}
                </p>
              </div>
              <div className="col-6">
                <p className="w-100 d-flex align-items-center item-form">
                  <strong className="strong-title">Referencia:</strong>{" "}
                  {edit ? (
                    <InputForm
                      label=""
                      type="text"
                      name="referencia"
                      placeholder=""
                      register={register}
                      errors={""}
                      classCol="d-flex ms-2 form-group item-form"
                      onChangeInput={onChangeInput}
                      value={ticketInfo.referencia}
                    />
                  ) : (
                    ticketInfo.referencia
                  )}
                </p>
              </div>
              <div className="col-md-6">
                <p className="d-flex align-items-center item-form">
                  <strong className="strong-title">N° GDE:</strong>{" "}
                  {edit ? (
                    <>
                      <InputForm
                        label=""
                        type="text"
                        name="nro_gde"
                        placeholder=""
                        register={register}
                        errors={errors}
                        classCol="form-group item-form"
                        options={{
                          required: "Campo obligatorio",
                        }}
                        onChangeInput={onChangeInput}
                        value={ticketInfo.nro_gde}
                      />
                    </>
                  ) : (
                    ticketInfo.nro_gde
                  )}
                </p>
              </div>
              <div className="col-12">
                <p className="w-100 d-flex align-items-center item-form">
                  <strong className="strong-title">Prioridad:</strong>{" "}
                  {edit ? (
                    <>
                      <input
                        className="check-prioridad-form"
                        type="checkbox"
                        id="flexCheckDefault"
                        name="prioridad_ticket"
                        {...register("prioridad")}
                        checked={
                          ticketInfo.prioridad == "baja" ? "" : "checked"
                        }
                        value={ticketInfo.prioridad}
                        onChange={handleRadioChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        Alta
                      </label>
                    </>
                  ) : (
                    <Badge
                      classes="state-button"
                      text={ticketInfo.prioridad}
                      ticketEstado={
                        ticketInfo.prioridad == "baja"
                          ? "finalizado"
                          : "prioridad_alta"
                      }
                    />
                  )}
                </p>
              </div>
              <div className="col-12">
                <p className="d-flex align-items-center item-form">
                  <strong className="strong-title align-self-start">
                    Motivo:
                  </strong>{" "}
                  {edit ? (
                    <TextArea
                      label=""
                      name="descripcion"
                      rows="1"
                      register={register}
                      errors={errors}
                      classCol="w-100 d-flex form-group"
                      options={{
                        required: "Campo obligatorio",
                      }}
                      onChangeInput={onChangeInput}
                      value={ticketInfo.descripcion}
                    />
                  ) : (
                    <div style={{ height: "50px", overflowY: "scroll" }}>
                      {ticketInfo.descripcion}
                    </div>
                  )}
                </p>
              </div>
              <div className="col-12"></div>
            </div>
            {edit ? (
              <div className="box-btn-detalles">
                <button id="btn-cancelar" onClick={handleCancelEdit}>
                  Cancelar
                </button>
                <button id="btn-aceptar" type="submit">
                  Guardar
                </button>
              </div>
            ) : (
              <img
                src="../public/img/pen-to-square-solid.svg"
                className="pen-edit"
                onClick={handleEdit}
              ></img>
            )}
          </form>
          <div className="historial">
            <p className="strong-title my-2">Historial</p>
            <div className="historial-box">
              <div
                style={{ height: "150px", overflowY: "scroll" }}
                className="p-3"
              >
                {historialMensajes.length > 0 &&
                  historialMensajes.map((mensaje) => (
                    <p className="row">
                      <span className="col-2 texto-area">
                        {mensaje.sector.toUpperCase()}:
                      </span>
                      <p
                        className="col-7"
                        dangerouslySetInnerHTML={{ __html: mensaje.mensaje }}
                      ></p>
                      <span className="col-3 date-historial d-flex justify-content-end">
                        {mensaje.fecha_creacion}
                      </span>
                    </p>
                  ))}
              </div>
              <div className="w-100 p-2 input-box">
                <form
                  onSubmit={handleSubmitMessage}
                  className="d-flex gap-2"
                  style={
                    ticketInfo.estado == "anulado" ||
                    ticketInfo.estado == "finalizado"
                      ? disable
                      : {}
                  }
                >
                  <input
                    type="text"
                    name="info"
                    className="flex-grow-1"
                    placeholder="Ingresar un nuevo mensaje..."
                  />
                  <button type="submit">Enviar</button>
                </form>
              </div>
            </div>
          </div>
        </article>
        <article
          className="col-md-5"
          style={
            ticketInfo.estado == "anulado" || ticketInfo.estado == "finalizado"
              ? disable
              : {}
          }
        >
          <section className="row px-2">
            <article className="col-lg-12 tecnico-asignado">
              <div className="d-flex align-items-center ms-2 select-tecnico">
                <label htmlFor="tecnico_asignado">Asignar Técnico:</label>
                <div className="form-group item-form">
                  <select
                    name="tecnico_asignado"
                    id="tecnico_asignado"
                    className="form-control"
                    onChange={handleSelectChange}
                  >
                    <option value="">Selecciona un técnico</option>
                    {tecnicos.length > 0 && (
                      <>
                        {tecnicos.map((tecnico) => (
                          <option
                            key={tecnico?.id}
                            value={tecnico?.id}
                            selected={
                              tecnico.id == ticketInfo?.tecnico_asignado_id
                                ? true
                                : false
                            }
                          >
                            {tecnico.nombre}
                          </option>
                        ))}
                      </>
                    )}
                  </select>
                </div>
              </div>
            </article>
            <article
              className="col-lg-12 tecnico-asignado"
              // style={showButtons ? {} : disable}
            >
              <div className="mb-2 d-flex align-items-center">
                <label className="ms-2 m-3">Acciones:</label>
                <div className="acciones-container d-flex">
                  <div
                    className="d-flex select-derivar justify-content-center"
                    // style={user.sector !== "gde" ? {} : disable}
                  >
                    <div
                      className="form-group d-flex align-items-center"
                      style={{ minWidth: "100px" }}
                    >
                      <select
                        name="derivar"
                        id="derivar"
                        className="form-control"
                        onChange={handleSelectChange}
                      >
                        <option value="">Derivar</option>
                        {optionListSelect.map((area, index) => (
                          <option value={index + 1}>{area}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="btn-accion">
                    <button
                      id="btn-cancelar"
                      onClick={handleAnular}
                      className=""
                      style={{ minWidth: "100px" }}
                    >
                      Anular
                    </button>
                  </div>
                  <div className="btn-accion">
                    <button
                      id="btn-aceptar"
                      onClick={handleFinalizar}
                      className=""
                      style={{ minWidth: "100px" }}
                    >
                      Finalizar
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </section>

          <section
            style={ticketInfo.tecnico_asignado_id === null ? disable : {}}
          >
            <article>
              <div>
                <SelectTarea
                  tareas={tareas}
                  ticketTareas={ticketTareas}
                  ticketId={ticket.id}
                  ticketInfo={ticketInfo}
                  user={user}
                  saveHistorial={saveHistorial}
                  // historialMensajes={historialMensajes}
                  setTicketTareas={setTicketTareas}
                  optionListSelect={optionListSelect}
                />
              </div>
            </article>
          </section>
        </article>
      </section>
    </>
  );
};

export default GetTicketDetalle;
