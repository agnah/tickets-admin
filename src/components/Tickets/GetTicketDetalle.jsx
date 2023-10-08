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

const tecnicos = [
  // "Franco Armani",
  // "Juan",
  // "Pedro",
  // "Maria",
  // "Luis",
  // "Jose",
  // "Laura",
];

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

const GetTicketDetalle = ({ ticket }) => {
  // console.log(ticket);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const user = JSON.parse(sessionStorage.getItem("user"));

  const [ticketInfo, setTicketInfo] = useState({
    id: ticket.id,
    solicitante: ticket.nombre_solicitante,
    email: ticket.email_solicitante,
    fecha: ticket.fecha,
    telefono: ticket.telefono_solicitante,
    area: ticket.area_solicitante,
    sede: ticket?.sede || "nueve_de_julio",
    piso: ticket.piso_solicitante,
    referencia: ticket.referencia,
    // pre_tarea: ticket.pre_tarea,
    motivo: ticket.descripcion,
    colaborador: ticket.tecnico_asignado_id,
    area_asignada: ticket.area_asignada_id,
  });

  const [edit, setEdit] = useState(false);
  const [solicitanteEmail, setSolicitanteEmail] = useState(ticketInfo.email);
  const [historialMensajes, setHistorialMensajes] = useState(historial);
  const [tecnicos, setTecnicos] = useState([]);

  useEffect(() => {
    getTecnicos();
  }, []);

  const getTecnicos = async () => {
    let response = await fetch(`http://localhost:8000/api/usuario/list/`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    let tecnicos_por_area = await response.json();
    tecnicos_por_area = tecnicos_por_area.filter(
      (tecnico) => ticket.area_asignada_id === tecnico.area_id
    );
    setTecnicos(tecnicos_por_area);
  };

  const updateTicket = async (updateTicket)=> {
    let data = {
      nombre_solicitante: updateTicket.solicitante,
      telefono_solicitante: updateTicket.telefono,
      area_solicitante: updateTicket.area,
      sede_solicitante: "nueve_de_julio",
      piso_solicitante: updateTicket.piso,
      referencia: updateTicket.referencia,
      tecnico_asignado_id: Number(updateTicket.colaborador),
      estado: "pendiente",
      descripcion: updateTicket.motivo,
      // archivos: ticketInfo.solicitante
    }

    let response = await fetch(`http://localhost:8000/api/tickets/actualizaciones/${ticket.id}`,{
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "x-usuario": user.id,
      },
    })
    let result = await response.json()
    console.log(result);
  }

  const derivarTicket = async (id_area)=> {
    let response = await fetch(`http://localhost:8000/api/tickets/derivaciones/${ticket.id}/?area_id=${id_area}`,{
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "x-usuario": user.id,
      },
    })
    let result = await response.json()
    console.log(result);
  }


  const handleSelectChange = (e) => {
    let ticket_update_info;
    if (e.target.name === "tecnico_asignado") {
      setTicketInfo({ ...ticketInfo, colaborador: e.target.value });
      ticket_update_info = { ...ticketInfo, colaborador: e.target.value }
      let tecnico = tecnicos.find(tecnico => (tecnico.id = e.target.value))
      setHistorialMensajes([
        ...historialMensajes,
        {
          area: user.sector[0],
          info: `Se asigno al técnico ${tecnico.nombre}`,
          date: `Hace unos minutos...`,
        },
      ]);
      updateTicket(ticket_update_info)
    }
    if (e.target.name === "derivar") {
      if (e.target.value != "") {
        setTicketInfo({ ...ticketInfo, area_asignada: optionListSelect.indexOf(e.target.value) + 1 });
        setHistorialMensajes([
          ...historialMensajes,
          {
            area: user.sector[0],
            info: `El usuario ${user?.nombre} derivo el ticket a ${e.target.value}`,
            date: `Hace unos minutos...`,
          },
        ]);
        derivarTicket(optionListSelect.indexOf(e.target.value) + 1)
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
      solicitante: ticket.nombre_solicitante,
      fecha: ticket.fecha,
      telefono: ticket.telefono_solicitante,
      area: ticket.area_solicitante,
      sede: ticket?.sede || "nueve_de_julio",
      piso: ticket.piso_solicitante,
      referencia: ticket.referencia,
      // pre_tarea: ticket.pre_tarea,
      motivo: ticket.descripcion,
      colaborador: ticket.tecnico_asignado_id,
      area_asignada: ticket.area_asignada_id,
    });
    // setSolicitanteEmail(ticket.email);
  };

  const onSubmit = (data) => {
    setTicketInfo({ ...ticketInfo, ...data });
    setEdit(!edit);
  };

  const onChangeSolicitante = (e) => {
    onChangeInput(e);
    const solicitante = e.target.value;
    const solicitanteSeleccionado = solicitantes.find(
      (s) => s.nombre === solicitante
    );
    if (solicitanteSeleccionado) {
      setSolicitanteEmail(solicitanteSeleccionado.email);
    }
  };

  const onChangeInput = (e) => {
    const { value, name } = e.target;
    setTicketInfo({ ...ticketInfo, [name]: value });
  };

  const onChangeInputEmail = (e) => {
    onChangeInput(e);
    setSolicitanteEmail(e.target.value);
  };

  const handleAnular = (e) => {
    // TODO: LOGICA DE ANULAR TICKET
  };

  const handleFinalizar = (e) => {
    // TODO: LOGICA DE FINALIZAR TICKET
  };

  return (
    <section className="row">
      <article className="col-md-7 position-relative container-left-detalle">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          autoComplete="off"
          className="d-flex flex-column"
        >
          <div className="row">
            <div className="col-md-6">
              <p className="d-flex align-items-center item-form">
                <strong className="strong-title">Solicitante:</strong>{" "}
                {edit ? (
                  <DatalistChangeInput
                    idList="datalistSolicitante"
                    label=""
                    name="solicitante"
                    placeholder=""
                    optionList={datalistSolicitante}
                    register={register}
                    errors={errors}
                    classCol="d-flex flex-row-reverse"
                    options={{
                      required: "Campo obligatorio",
                    }}
                    onChangeSolicitante={onChangeSolicitante}
                    onChangeInput={onChangeInput}
                    value={ticketInfo.solicitante}
                  />
                ) : (
                  ticketInfo.solicitante
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
                {ticketInfo.email}
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
                    name="telefono"
                    placeholder=""
                    register={register}
                    errors={errors}
                    classCol="d-flex ms-2 form-group item-form"
                    options={{
                      required: "Campo obligatorio",
                    }}
                    onChangeInput={onChangeInput}
                    value={ticketInfo.telefono}
                  />
                ) : (
                  ticketInfo.telefono
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
                      name="area"
                      placeholder="Selecciona un área"
                      optionList={optionListSelect}
                      register={register}
                      errors={errors}
                      classCol="d-flex ms-2"
                      options={{
                        required: "Campo obligatorio",
                      }}
                      onChangeInput={onChangeInput}
                    />
                  ) : (
                    ticketInfo.area
                  )}
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <p className="d-flex align-items-center item-form">
                <strong className="strong-title">Sede:</strong>{" "}
                {edit ? (
                  <SelectInput
                    label=""
                    name="sede"
                    placeholder="Selecciona una sede"
                    optionList={optionListSelect}
                    register={register}
                    errors={errors}
                    classCol="d-flex ms-2"
                    options={{
                      required: "Campo obligatorio",
                    }}
                    onChangeInput={onChangeInput}
                  />
                ) : (
                  ticketInfo.sede
                )}
              </p>
            </div>
            <div className="col-md-6">
              <p className="d-flex align-items-center item-form">
                <strong className="strong-title">Piso:</strong>{" "}
                {edit ? (
                  <SelectInput
                    label=""
                    name="piso"
                    placeholder=""
                    optionList={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                    register={register}
                    errors={errors}
                    classCol="d-flex ms-2"
                    options={{
                      required: "Campo obligatorio",
                    }}
                    onChangeInput={onChangeInput}
                  />
                ) : (
                  ticketInfo.piso
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
            {/* <div className="col-12 my-1">
              <p className="d-flex align-items-center item-form">
                <strong className="strong-title">Pre Tarea:</strong>{" "}
                {ticketInfo.pre_tarea}
              </p>
            </div> */}
            <div className="col-12">
              <p className="d-flex align-items-center item-form">
                <strong className="strong-title">Motivo:</strong>{" "}
                {edit ? (
                  <TextArea
                    label=""
                    name="motivo"
                    rows="1"
                    register={register}
                    errors={errors}
                    classCol="w-100 d-flex form-group"
                    options={{
                      required: "Campo obligatorio",
                    }}
                    onChangeInput={onChangeInput}
                    value={ticketInfo.motivo}
                  />
                ) : (
                  ticketInfo.motivo
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
            {/* <div>
              <SelectTecnico
                label="Asignar Técnico:"
                name="tecnico"
                placeholder="Selecciona un técnico"
                optionList={tecnicos}
                register={register}
                errors={errors}
                classCol="d-flex align-items-center ms-2 select-tecnico"
                options={{
                  required: "Campo obligatorio"
                }}
                // selectedOption={selectedOption}
                selectedOption={null}
                onChangeInput={handleSelectChange}
              />
            </div> */}
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
                            tecnico.id == ticketInfo?.colaborador ? true : false
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
              {/* <SelectTecnico
                label=""
                name="area"
                placeholder="Derivar"
                optionList={optionListSelect}
                register={register}
                errors={errors}
                classCol="col-md-12 col-lg-12 d-flex ms-2 select-derivar"
                options={{
                  required: "Campo obligatorio",
                }}
                // selectedOption={selectedOptionArea}
                selectedOption={null}
                onChangeInput={handleSelectChange}
              /> */}
              <label className="ms-2">Acciones:</label>
              <div className="col-md-12 col-lg-12 d-flex m-2 select-derivar">
                <div className="form-group item-form">
                  <select
                    name="derivar"
                    id="derivar"
                    className="form-control"
                    onChange={handleSelectChange}
                  >
                    <option value="">Derivar</option>
                    {optionListSelect.map((area) => (
                      <option
                        value={area}
                        selected={
                          area == ticketInfo?.area_asignada ? true : false
                        }
                      >
                        {area}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <button
                  id="btn-cancelar"
                  onClick={handleAnular}
                  className="m-2 "
                >
                  Anular
                </button>
              </div>
              <div>
                <button
                  id="btn-aceptar"
                  onClick={handleFinalizar}
                  className="m-2 "
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
        <section>
          <article>
            <div>
              <SelectTarea />
            </div>
          </article>
        </section>
      </article>
    </section>
  );
};

export default GetTicketDetalle;
