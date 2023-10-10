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

const datalistSolicitante = solicitantes.map((s) => s.nombre);
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
const sedes = ["NUEVE_DE_JULIO", "ANEXO1", "ANEXO2", "ANEXO3"];
const historial = [
  {
    area: "CSTIMI",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sit non voluptate consequuntur eum corrupti voluptates adipisci eos maiores ut?",
    date: "04 Ago. 2023, 17:30 hs",
  },
  {
    area: "GDE",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sit non voluptate consequuntur eum corrupti voluptates adipisci eos maiores ut?",
    date: "04 Ago. 2023, 17:30 hs",
  },
  {
    area: "CSTIMI",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sit non voluptate consequuntur eum corrupti voluptates adipisci eos maiores ut?",
    date: "04 Ago. 2023, 17:30 hs",
  },
  {
    area: "Computos",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sit non voluptate consequuntur eum corrupti voluptates adipisci eos maiores ut?",
    date: "04 Ago. 2023, 17:30 hs",
  },
  {
    area: "Computos",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sit non voluptate consequuntur eum corrupti voluptates adipisci eos maiores ut?",
    date: "04 Ago. 2023, 17:30 hs",
  },
  {
    area: "CSTIMI",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sit non voluptate consequuntur eum corrupti voluptates adipisci eos maiores ut?",
    date: "04 Ago. 2023, 17:30 hs",
  },
  {
    area: "GDE",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sit non voluptate consequuntur eum corrupti voluptates adipisci eos maiores ut?",
    date: "04 Ago. 2023, 17:30 hs",
  },
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
    // pre_tarea: ticket.pre_tarea,
    descripcion: ticket.descripcion,
    tecnico_asignado_id: ticket.tecnico_asignado_id,
    area_asignada_id: ticket.area_asignada_id,
    estado: ticket.estado,
  });

  const [ticketTareas, setTicketTareas] = useState([]);
  const [edit, setEdit] = useState(false);
  // const [solicitanteEmail, setSolicitanteEmail] = useState(ticketInfo.email);
  const [historialMensajes, setHistorialMensajes] = useState(historial);
  const [tecnicos, setTecnicos] = useState([]);
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    getTecnicos(ticketInfo.area_asignada_id);
    getTareasPorArea(ticketInfo.area_asignada_id);
  }, []);

  const getTecnicos = async (id_area) => {
    let response = await fetch(`http://localhost:8000/api/usuario/${id_area}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    let tecnicos_por_area = await response.json();
    setTecnicos(tecnicos_por_area);
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
        .filter((tarea) => tarea.estado == "ACTIVA")
        .map((tarea) => tarea.tarea_id);
      let tareasTicketsArr = [];
      tareas_por_area.forEach((tarea_por_area) => {
        if (ticketTareasId.includes(tarea_por_area.id))
          tareasTicketsArr.push(tarea_por_area);
      });
      setTicketTareas(tareasTicketsArr);
    }
    setTareas(tareas_por_area);
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
      estado: updateTicket.estado,
      descripcion: updateTicket.descripcion,
      tecnico_asignado_id: updateTicket.tecnico_asignado_id,
      // archivos: ticketInfo.solicitante
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
    navigate('/tickets')
  };

  const handleSelectChange = (e) => {
    let ticket_update_info;
    if (e.target.name === "tecnico_asignado") {
      let nombre_tecnico = tecnicos.find(
        (tecnico) => tecnico.id == e.target.value
      ).nombre;
      let respuesta = confirm(
        `Esta seguro que desea asignar al tecnico ${nombre_tecnico}?`
      );
      if (respuesta) {
        setTicketInfo({ ...ticketInfo, tecnico_asignado_id: e.target.value });
        ticket_update_info = {
          ...ticketInfo,
          tecnico_asignado_id: e.target.value,
        };
        let tecnico = tecnicos.find((tecnico) => (tecnico.id = e.target.value));
        setHistorialMensajes([
          ...historialMensajes,
          {
            area: user.sector[0],
            info: `Se asigno al técnico ${tecnico.nombre}`,
            date: `Hace unos minutos...`,
          },
        ]);
        updateTicket(ticket_update_info);
      } else {
        e.target.value = ticketInfo.tecnico_asignado_id || "";
      }
    }
    if (e.target.name === "derivar") {
      let respuesta = confirm("Esta seguro que desea derivar a otra area?");
      if (respuesta) {
        if (e.target.value != "") {
          setTicketInfo({ ...ticketInfo, area_asignada: e.target.value });
          setHistorialMensajes([
            ...historialMensajes,
            {
              area: user.sector[0],
              info: `El usuario ${user?.nombre} derivo el ticket a ${
                optionListSelect[e.target.value - 1]
              }`,
              date: `Hace unos minutos...`,
            },
          ]);
          derivarTicket(e.target.value);
        }
      } else {
        e.target.value = "";
      }
    }
  };

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    setHistorialMensajes([
      ...historialMensajes,
      {
        area: user.sector[0],
        info: e.target[0].value,
        date: `Hace unos minutos...`,
      },
    ]);
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
    });
    // setSolicitanteEmail(ticket.email);
  };

  const onSubmit = (data) => {
    let respuesta = confirm(
      `Esta seguro que desea actualizar los datos del ticket?`
    );
    if (respuesta) {
      setTicketInfo({
        ...ticketInfo,
        prioridad: data.prioridad ? "alta" : "baja",
      });
      updateTicket({
        ...ticketInfo,
        prioridad: data.prioridad ? "alta" : "baja",
      });
      setEdit(!edit);
      setHistorialMensajes([
        ...historialMensajes,
        {
          area: user.sector[0],
          info: `El usuario ${user?.nombre} modifico la información del solicitante`,
          date: `Hace unos minutos...`,
        },
      ]);
    }
  };

  const onChangeInput = (e) => {
    let { value, name } = e.target;
    if (name == "area_solicitante")
      value = optionListAreaSolicitante[value - 1];
    setTicketInfo({ ...ticketInfo, [name]: value });
  };

  const handleAnular = async (e) => {
    let respuesta = confirm("Esta seguro que desea anular el ticket?");
    if (respuesta) {
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
    }
  };

  const handleFinalizar = async (e) => {
    let respuesta = confirm("Esta seguro que desea finalizar el ticket?");
    if (respuesta) {
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
      navigate('/tickets')
    }
  };

  let disable = {
    opacity: "0.7",
    cursor: "not-allowed",
    pointerEvents: "none",
  };

  return (
    <section className="row" style={ticketInfo.estado == 'anulado' || ticketInfo.estado == 'finalizado'  ? disable : {}}>
      <article className="col-md-7 position-relative container-left-detalle">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          autoComplete="off"
          className="d-flex flex-column"
        >
          <div className="row" >
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
              <p className="w-100 d-flex align-items-center item-form">
                <strong className="strong-title">Email:</strong>{" "}
                {/* {edit
                  ? (
                  <InputForm
                    label=""
                    type="email"
                    name="email"
                    placeholder=""
                    register={register}
                    errors={errors}
                    classCol="w-100 d-flex ms-2 form-group item-form"
                    options={{
                      required: "Campo obligatorio",
                      pattern: {
                        value: REGEX_EMAIL,
                        message: "El e-mail tiene que ser valido",
                      },
                    }}
                    value={solicitanteEmail}
                    onChangeInput={onChangeInputEmail}
                  />
                ) : ( */}
                {ticketInfo.email_solicitante}
                {/* )} */}
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
                {/* {edit ? (
                  <SelectInput
                    label=""
                    name="sede"
                    placeholder="Selecciona una sede"
                    optionList={sedes}
                    register={register}
                    errors={errors}
                    classCol="d-flex ms-2"
                    options={{
                      required: "Campo obligatorio",
                    }}
                    onChangeInput={onChangeInput}
                  />
                ) : ( */}
                {ticketInfo.sede}
                {/* )} */}
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
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      Alta
                    </label>
                  </>
                ) : (
                    <Badge classes="state-button" text={ticketInfo.prioridad} ticketEstado={ticketInfo.prioridad == 'baja' ? 'finalizado' : 'prioridad_alta'}/>
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
                  <div style={{ height: "100px", overflowY: "scroll" }}>
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
              style={{ height: "200px", overflowY: "scroll" }}
              className="p-3"
            >
              {historialMensajes.map((mensaje) => (
                <p className="row">
                  <span className="col-1 texto-area">{mensaje.area}:</span>
                  <p className="col-8">{mensaje.info}</p>
                  <span className="col-3 date-historial d-flex justify-content-end">
                    {mensaje.date}
                  </span>
                </p>
              ))}
            </div>
            <div className="w-100 p-2 input-box">
              <form onSubmit={handleSubmitMessage} className="d-flex gap-2">
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
      <article className="col-md-5">
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
                      {" "}
                      {tecnicos.map((tecnico) => (
                        <option
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
          <article className="col-lg-12 tecnico-asignado">
            <div className="mb-2">
              <label className="ms-2">Acciones:</label>
              <div className="col-md-12 col-lg-12 d-flex m-2 select-derivar">
                <div
                  className="form-group item-form"
                  style={{ minWidth: "150px" }}
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
              <div>
                <button
                  id="btn-cancelar"
                  onClick={handleAnular}
                  className="m-2 "
                  style={{ minWidth: "150px" }}
                >
                  Anular
                </button>
              </div>
              <div>
                <button
                  id="btn-aceptar"
                  onClick={handleFinalizar}
                  className="m-2 "
                  style={{ minWidth: "150px" }}
                >
                  Finalizar
                </button>
              </div>
            </div>
            {/* <div>
              <p className="mb-1 ms-2 subtitle-derivar">
                Tiempo de espera: {""}
              </p>
              <p className="mb-0 ms-2 subtitle-derivar">Última acción: {""}</p>
            </div> */}
          </article>
        </section>

        <section style={ticketInfo.tecnico_asignado_id === null ? disable : {}}>
          <article>
            <div>
              <SelectTarea
                tareas={tareas}
                ticketTareas={ticketTareas}
                ticketId={ticket.id}
                user={user}
                setHistorialMensajes={setHistorialMensajes}
                historialMensajes={historialMensajes}
              />
            </div>
          </article>
        </section>
      </article>
    </section>
  );
};

export default GetTicketDetalle;
