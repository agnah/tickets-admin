import DataTable from "react-data-table-component";
import useApiTest from "@servicios/useApiTest";
import SkeletonTabla from "./skeletonTabla";
import { useCallback, useMemo, useContext, useState, useEffect } from "react";
import filtroTabla from "./filtroTabla";
import CheckEstado from "./checkEstado";
import { FiltrosContext } from "./contextTabla";
import useAuth from "@servicios/UseAuth";
import ButtonEdit from "../partials/Button/ButtonEdit";
import { useNavigate, Link } from "react-router-dom";
import { apis } from "@constantes/constApis";
import { estadoTicket } from "@constantes/constTickets";
import { perfil, rolUsuario } from "@constantes/constUsers";
import Badge from "../partials/Button/Badge";
import "./tabla.css";
import fechaLocal from "../../utils/fechas";
import InputForm from "@components/Form/Input/InputForm";
import Button from "../partials/Button/Button";
import { useForm } from "react-hook-form";

function Tabla() {
  const [busqueda, setBusqueda] = useState("");
  const [filtroAvanzadoVisible, setFiltroAvanzadoVisible] = useState(false);
  const [filtroAvanzadoActivo, setFiltroAvanzadoActivo] = useState(false);
  const [url, setUrl] = useState(apis.API_TICKETS);
  const { PENDIENTE, DERIVADO } = estadoTicket;
  const { user } = useAuth();
  const { ADMINISTRATIVO, SUPERADMIN } = perfil;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const {
    isLoading,
    // isValidating,
    isError,
    isSuccess,
    data: datos,
    // trigger,
    error,
  } = useApiTest(url);

  const {
    // handlePrioridadChange,
    seleccionados,
    handleSeleccionadosChange,
    filtroUser,
    handleFiltroUserChange,
    filtroSector,
    handleFiltroSectorChange,
  } = useContext(FiltrosContext);

  const validateFecha = (desde, hasta) => {
    if (!desde || !hasta) {
      return true;
    }
    const desdeDate = new Date(desde);
    const hastaDate = new Date(hasta);
    if (desdeDate > hastaDate) {
      return "La fecha 'hasta' no puede ser anterior a la fecha 'desde'.";
    }
    return true;
  };
  const desde = watch("fechaInicio") || "";
  const hasta = watch("fechaHasta") || "";

  const onSubmit = (formData) => {
    console.log("formdata", formData);
    if (filtroAvanzadoActivo) {
      const url = construirURL(formData);
      setUrl(url);
      console.log(url);
    } else {
      setUrl(apis.API_TICKETS);
    }
  };

  function construirURL(formData) {
    const baseUrl = apis.API_TICKETS_FILTRO_AVANZADO;
    const filtros = [];
    for (const key in formData) {
      if (formData[key] !== "") {
        // Si es un campo de fecha, agrega " 00:00:00" al final
        if (key === "start_date" || key === "end_date") {
          filtros.push(
            `${key}=${encodeURIComponent(formData[key] + " 00:00:00")}`
          );
        } else {
          filtros.push(`${key}=${encodeURIComponent(formData[key])}`);
        }
      }
    }

    return baseUrl + filtros.join("&");
  }

  useEffect(() => {
    handleSubmit(onSubmit)();
  }, [filtroAvanzadoActivo]);

  const handleFiltrarAvanzado = async () => {
    setFiltroAvanzadoActivo(true);
  };

  const handleEliminarFiltrarAvanzado = async () => {
    setFiltroAvanzadoActivo(false);
    setFiltroAvanzadoVisible(false);
  };
  // Botones tabla
  const handleEdit = useCallback((id) => {
    navigate(`/tickets/${id}`);
  }, []);

  // columnas tabla
  const columns = useMemo(
    () => [
      {
        name: "Nro.",
        selector: (row) => row.identificador,
        sortable: true,
      },
      {
        name: "Fecha",
        selector: "hora",
        format: (row) => {
          const { hora, fecha } = fechaLocal(row.fecha_creacion);
          return (
            <>
              {fecha}
              <br />
              {hora}
            </>
          );
        },
        sortable: true,
      },
      {
        name: "Sede",
        selector: (row) => row.sede_solicitante,
        sortable: true,
      },
      {
        name: "Area Solicitante",
        selector: (row) => row.area_solicitante,
        sortable: true,
      },
      {
        name: "Piso",
        selector: (row) => row.piso_solicitante,
        sortable: true,
      },
      {
        name: "Técnico asignado",
        selector: (row) => row.tecnico?.nombre,
        sortable: true,
      },
      {
        name: "Sector",
        selector: (row) => row.area.nombre,
        sortable: true,
      },
      {
        name: "Estado",
        selector: (row) => (
          <Badge ticketEstado={row.estado} text={row.estado} />
        ),
        sortable: true,
      },
      {
        name: "Accion",
        cell: (row) => (
          <>
            <ButtonEdit onClick={() => handleEdit(row.id)} />
          </>
        ),
      },
    ],
    []
  );

  // const filteredColumns = (filtro) => {
  //   const { MESA_DE_ENTRADA, SOPORTE, CID, COMPUTOS, TELEFONIA, GDE, CSTIMI, ADMIN } = areas
  //   const filterColumns = {
  //     [MESA_DE_ENTRADA]: ['Nro.', 'Fecha', 'Hora', 'Area', 'Piso', 'Área asignada', 'Técnico asignado', 'Estado', 'Accion'],
  //     [SOPORTE]: ['Nro.', 'Fecha', 'Hora', 'Area', 'Piso', 'Pre-tarea', 'Técnico asignado', 'Estado', 'Accion'],
  //     [CID]: ['Nro.', 'Fecha', 'Hora', 'Area', 'Piso', 'Pre-tarea', 'Técnico asignado', 'Estado', 'Accion'],
  //     [COMPUTOS]: ['Nro.', 'Fecha', 'Hora', 'Area', 'Piso', 'Pre-tarea', 'Técnico asignado', 'Estado', 'Accion'],
  //     [TELEFONIA]: ['Nro.', 'Fecha', 'Hora', 'Area', 'Piso', 'Pre-tarea', 'Técnico asignado', 'Estado', 'Accion'],
  //     [GDE]: ['Nro.', 'Fecha', 'Hora', 'Area', 'Piso', 'Pre-tarea', 'Técnico asignado', 'Estado', 'Accion'],
  //     [CSTIMI]: ['Nro.', 'Fecha', 'Hora', 'Area', 'Piso', 'Pre-tarea', 'Técnico asignado', 'Estado', 'Accion'],
  //     [ADMIN]: ['Nro.', 'Fecha', 'Hora', 'Area', 'Piso', 'Pre-tarea', 'Técnico asignado', 'Estado', 'Accion']
  //   }
  //   const columnsPorArea = filterColumns[filtro] || filterColumns[MESA_DE_ENTRADA]
  //   return columnsTotales.filter(column =>
  //     columnsPorArea.includes(column.name)
  //   )
  // }

  // const columns = useMemo(() => filteredColumns(user.sector), [])

  // filtros
  // const preData = datos.filter(elem => elem.area === user.sector)

  // const data = filtroTabla(preData, seleccionados, prioridad, filtroUser)

  const conditionalRowStyles = [
    {
      when: (row) => row.prioridad === estadoTicket.ALTA,
      style: {
        backgroundColor: "#EC7E7B",
        color: "white",
      },
    },
  ];

  if (isError) {
    return <p>Algo fallo: Por favor reloguear. {error.message}</p>;
  }
  if (isLoading) {
    return <SkeletonTabla />;
  }
  if (isSuccess) {
    const datosPerfil =
      user.perfil === ADMINISTRATIVO || user.perfil === SUPERADMIN
        ? datos
        : datos.filter((ticket) => ticket?.area?.nombre === user.sector);
    console.log("datos perfil", datosPerfil);
    const nombresUnicosArray = [
      ...new Set(
        datosPerfil
          .map((ticket) => ticket?.tecnico?.nombre)
          .filter((nombre) => nombre)
      ),
    ];
    const areasUnicosArray = [
      ...new Set(
        datosPerfil
          .map((ticket) => ticket?.area?.nombre)
          .filter((nombre) => nombre)
      ),
    ];
    const data = filtroTabla(
      datosPerfil,
      seleccionados,
      filtroUser,
      filtroSector
    );

    const filteredData = data.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(busqueda.toLowerCase())
      )
    );
    /* <Button
        classIcon="fa fa-refresh"
          texto={isValidating ? 'Validando' : ''}
          type="button"
          onClick={() => trigger()}
        /> */

    return (
      <>
        <div className="container-h">
          <div className="div-search">
            <div className="div-icon-search">
              <img src="/public/img/magnifying-glass-solid.svg" alt="search" />
            </div>
            <input
              type="search"
              placeholder="Buscar..."
              inputMode="search"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="input-search"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-sliders rotate-90"
              onClick={() => setFiltroAvanzadoVisible(!filtroAvanzadoVisible)}
            >
              <line x1="4" y1="21" x2="4" y2="14"></line>
              <line x1="4" y1="10" x2="4" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="3"></line>
              <line x1="20" y1="21" x2="20" y2="16"></line>
              <line x1="20" y1="12" x2="20" y2="3"></line>
              <line x1="1" y1="14" x2="7" y2="14"></line>
              <line x1="9" y1="8" x2="15" y2="8"></line>
              <line x1="17" y1="16" x2="23" y2="16"></line>
            </svg>
          </div>
          <div className="right-elements">
            {/* {user.perfil !== TECNICO
              ? ( */}
            <div>
              {(!seleccionados.includes(PENDIENTE) &&
                !seleccionados.includes(DERIVADO)) ||
              seleccionados.some(
                (opcion) => opcion !== PENDIENTE && opcion !== DERIVADO
              ) ? (
                <select
                  name="filtroUser"
                  value={filtroUser}
                  onChange={(e) => handleFiltroUserChange(e.target.value)}
                >
                  <option value="">Técnicos</option>
                  {nombresUnicosArray.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <select disabled>
                  <option value="">Todos</option>
                </select>
              )}
              <img
                src="public/img/caret-down-solid.svg"
                className="fa-solid fa-caret-down-tickets"
              ></img>
            </div>
            {/* )
              : null} */}
            {user.perfil === ADMINISTRATIVO ||
            user.rolUsuario === rolUsuario.DIOS ? (
              <div>
                {!seleccionados.includes(PENDIENTE) ||
                seleccionados.length > 1 ? (
                  <div>
                    <select
                      name="filtroSector"
                      value={filtroSector}
                      onChange={(e) => handleFiltroSectorChange(e.target.value)}
                    >
                      <option value="">Sector</option>
                      {areasUnicosArray.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <img
                      src="public/img/caret-down-solid.svg"
                      className="fa-solid fa-caret-down-tickets"
                      alt="Caret Down"
                    />
                  </div>
                ) : (
                  <select disabled>
                    <option value="">Todos</option>
                  </select>
                )}
              </div>
            ) : null}
            {/* {user.perfil !== DIRECTOR && ( */}
            <Link to="/tickets/create" className="btn-crear-ticket">
              <img
                src="public/img/plus-solid.svg"
                className="fa-solid fa-plus"
              ></img>
              Nuevo Ticket
            </Link>
            {/* )} */}
          </div>
        </div>
        <div className="container-checks">
          {/* <CheckPrioridad
            prioridad={prioridad}
            onChange={handlePrioridadChange}
          /> */}
          <CheckEstado
            seleccionados={seleccionados}
            onChange={handleSeleccionadosChange}
          />
        </div>

        {filtroAvanzadoVisible && (
          <div className="filtro-avanzado-form">
            <hr />
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              autoComplete="off"
              className="row"
            >
              <div className="col-md-4 col-lg-4 mt-2">
                <InputForm
                  type="text"
                  name="identificador"
                  label="Identificador:"
                  placeholder="Ingrese identificador de ticket"
                  register={register}
                  errors={errors}
                  classCol="col-md-8 col-lg-8 form-group item-form w-100 filtro-label"
                  options={
                    {
                      // required: 'Campo obligatorio'
                    }
                  }
                />
              </div>
              <div className="col-md-4 col-lg-4 mt-2">
                <InputForm
                  type="text"
                  name="nombre_solicitante"
                  label="Solicitante:"
                  placeholder="Ingrese solicitante"
                  register={register}
                  errors={errors}
                  classCol="col-md-8 col-lg-8 form-group item-form w-100 filtro-label"
                  options={
                    {
                      // required: 'Campo obligatorio'
                    }
                  }
                />
              </div>
              <div className="col-md-4 col-lg-4 mt-2">
                <InputForm
                  type="text"
                  name="area_solicitante"
                  label="Area solicitante:"
                  placeholder="Ingrese area solicitante"
                  register={register}
                  errors={errors}
                  classCol="col-md-8 col-lg-8 form-group item-form w-100 filtro-label"
                  options={
                    {
                      // required: 'Campo obligatorio'
                    }
                  }
                />
              </div>
              <div className="col-md-4 col-lg-4 mt-2">
                <InputForm
                  type="email"
                  name="email_solicitante"
                  label="E-mail:"
                  placeholder="Ingrese e-mail"
                  register={register}
                  errors={errors}
                  classCol="col-md-8 col-lg-8 form-group item-form filtro-label"
                  options={
                    {
                      // required: 'Campo obligatorio'
                    }
                  }
                />
              </div>
              <div className="col-md-4 col-lg-4 pt-3">
                <div className="d-flex align-items-center">
                  <label for="rangoFechas" className="filtro-label">
                    <i class="fa-regular fa-calendar fa-2xl"></i>
                  </label>
                  <div className="date-desde">
                    <InputForm
                      type="date"
                      name="start_date"
                      label="Desde:"
                      register={register}
                      errors={errors}
                      classCol="form-group item-form date-format-input filtro-label-rango"
                      options={{
                        validate: (value) => validateFecha(value, hasta),
                      }}
                    />
                  </div>
                  <label for="rangoFechas" className="filtro-label">
                    <i class="fa-regular fa-calendar fa-2xl"></i>
                  </label>
                  <div  className="date-hasta">
                    <InputForm
                      type="date"
                      name="end_date"
                      label="Hasta:"
                      // placeholder="hasta"
                      register={register}
                      errors={errors}
                      classCol="form-group item-form mx-0 date-format-input filtro-label-rango"
                      options={{
                        validate: (value) => validateFecha(desde, value),
                      }}
                    />
                    {errors.fechaHasta && <p>{errors.fechaHasta.message}</p>}
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-4 d-flex align-items-center mt-4">
                <Button
                  type="button"
                  onClick={handleEliminarFiltrarAvanzado}
                  texto="Eliminar Filtro"
                  classBoton="btn-cancelar"
                />
                <Button
                  type="submit"
                  onClick={handleFiltrarAvanzado}
                  texto="Aplicar Filtro"
                  classBoton="btn-aceptar"
                />
              </div>
            </form>
          </div>
        )}
        <DataTable
          columns={columns}
          data={filteredData}
          highlightOnHover
          conditionalRowStyles={conditionalRowStyles}
          pagination
          paginationComponentOptions={{ rowsPerPageText: "Filas por página" }}
          responsive
          striped
          //   ! Variables para expandir.
          //   expandableRows
          //   expandableRowsComponent={ExpandedComponent}
          noDataComponent="No exiten registros para esos parametros en este último mes"
        />
      </>
    );
  }
}

export default Tabla;
