import DataTable from 'react-data-table-component'
import useApiTest from '@servicios/useApiTest'
import SkeletonTabla from './skeletonTabla'
import { useCallback, useMemo, useContext, useState, useEffect } from 'react'
import filtroTabla from './filtroTabla'
import CheckEstado from './checkEstado'
import { FiltrosContext } from './contextTabla'
import useAuth from '@servicios/UseAuth'
import ButtonEdit from '../partials/Button/ButtonEdit'
import { useNavigate, Link } from 'react-router-dom'
import { apis } from '@constantes/constApis'
import { estadoTicket } from '@constantes/constTickets'
import { perfil, rolUsuario } from '@constantes/constUsers'
import Badge from '../partials/Button/Badge'
import './tabla.css'
import fechaLocal from '../../utils/fechas'
import InputForm from '@components/Form/Input/InputForm'
import Button from '../partials/Button/Button'
import { useForm } from 'react-hook-form'

function Tabla () {
  const [busqueda, setBusqueda] = useState('')
  const [filtroAvanzadoVisible, setFiltroAvanzadoVisible] = useState(false)
  const [filtroAvanzadoActivo, setFiltroAvanzadoActivo] = useState(false)
  const [url, setUrl] = useState(apis.API_TICKETS)
  const { PENDIENTE } = estadoTicket
  const { user } = useAuth()
  const { ADMINISTRATIVO, SUPERADMIN } = perfil
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()
  const {
    isLoading,
    // isValidating,
    isError,
    isSuccess,
    data: datos,
    // trigger,
    error
  } = useApiTest(url)

  const {
    // handlePrioridadChange,
    seleccionados,
    handleSeleccionadosChange,
    filtroUser,
    handleFiltroUserChange,
    filtroSector,
    handleFiltroSectorChange
  } = useContext(FiltrosContext)

  const validateFecha = (desde, hasta) => {
    if (!desde || !hasta) {
      return true
    }
    const desdeDate = new Date(desde)
    const hastaDate = new Date(hasta)
    if (desdeDate > hastaDate) {
      return "La fecha 'hasta' no puede ser anterior a la fecha 'desde'."
    }
    return true
  }
  const desde = watch('fechaInicio')
  const hasta = watch('fechaHasta')

  const onSubmit = (formData) => {
    console.log('formdata', formData)
    if (filtroAvanzadoActivo) {
      // Aquí deberías construir la URL del filtro avanzado en función de los datos del formulario
      const filtroAvanzado = 'http://localhost:8000/api/tickets/?field=estado&value=pendiente'
      setUrl(filtroAvanzado)
    } else {
      setUrl(apis.API_TICKETS)
    }
  }

  useEffect(() => {
    handleSubmit(onSubmit)()
  }, [filtroAvanzadoActivo])

  const handleFiltrarAvanzado = async () => {
    setFiltroAvanzadoActivo(true)
  }

  const handleEliminarFiltrarAvanzado = async () => {
    setFiltroAvanzadoActivo(false)
    setFiltroAvanzadoVisible(false)
  }
  // Botones tabla
  const handleEdit = useCallback((id) => {
    navigate(`/tickets/${id}`)
  }, [])

  // columnas tabla
  const columns = useMemo(() => [
    {
      name: 'Nro.',
      selector: (row) => row.identificador,
      sortable: true
    },
    {
      name: 'Fecha',
      selector: 'hora',
      format: (row) => {
        const { hora, fecha } = fechaLocal(row.fecha_creacion)
        return (
          <>
            {fecha}
            <br />
            {hora}
          </>
        )
      },
      sortable: true
    },
    {
      name: 'Sede',
      selector: (row) => row.sede_solicitante,
      sortable: true
    },
    {
      name: 'Area Solicitante',
      selector: (row) => row.area_solicitante,
      sortable: true
    },
    {
      name: 'Piso',
      selector: (row) => row.piso_solicitante,
      sortable: true
    },
    {
      name: 'Técnico asignado',
      selector: (row) => row.tecnico?.nombre,
      sortable: true
    },
    {
      name: 'Sector',
      selector: (row) => row.area.nombre,
      sortable: true
    },
    {
      name: 'Estado',
      selector: (row) => (
        <Badge ticketEstado={row.estado} text={row.estado} />
      ),
      sortable: true
    },
    {
      name: 'Accion',
      cell: (row) => (
        <>
          <ButtonEdit onClick={() => handleEdit(row.id)} />
        </>
      )
    }
  ], [])

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
      when: row => row.prioridad === estadoTicket.ALTA,
      style: {
        backgroundColor: '#EC7E7B',
        color: 'white'
      }
    }
  ]

  if (isError) {
    return <p>Algo fallo: {error.message}</p>
  }
  if (isLoading) {
    return <SkeletonTabla />
  }
  if (isSuccess) {
    const datosPerfil = (user.perfil === ADMINISTRATIVO || user.perfil === SUPERADMIN) ? datos : datos.filter(ticket => ticket?.area?.nombre === user.sector)
    console.log('datos perfil', datosPerfil)
    const nombresUnicosArray = [...new Set(datosPerfil.map(ticket => ticket?.tecnico?.nombre).filter(nombre => nombre))]
    const areasUnicosArray = [...new Set(datosPerfil.map(ticket => ticket?.area?.nombre).filter(nombre => nombre))]
    const data = filtroTabla(datosPerfil, seleccionados, filtroUser, filtroSector)

    const filteredData = data.filter(item =>
      Object.values(item).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(busqueda.toLowerCase())
      )
    )
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
            <Button
              type="button"
              onClick={() => setFiltroAvanzadoVisible(!filtroAvanzadoVisible)}
              texto="Filtro Avanzado"
              classBoton="btn btn-tickets" />
          </div>
          <div className="right-elements">
            {/* {user.perfil !== TECNICO
              ? ( */}
            <div>
              {!seleccionados.includes(PENDIENTE) || seleccionados.length > 1
                ? (
                  <select
                    name='filtroUser'
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
                  )
                : (
                  <select disabled>
                    <option value=''>Todos</option>
                  </select>
                  )}
              <img src="public/img/caret-down-solid.svg" className="fa-solid fa-caret-down"></img>
            </div>
            {/* )
              : null} */}
            {user.perfil === ADMINISTRATIVO || user.rolUsuario === rolUsuario.DIOS
              ? (
                <div>
                  {!seleccionados.includes(PENDIENTE) || seleccionados.length > 1
                    ? (
                      <div>
                        <select
                          name='filtroSector'
                          value={filtroSector}
                          onChange={(e) => handleFiltroSectorChange(e.target.value)}
                        >
                          <option value=''>Sector</option>
                          {areasUnicosArray.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <img src='public/img/caret-down-solid.svg' className='fa-solid fa-caret-down' alt='Caret Down' />
                      </div>
                      )
                    : (
                      <select disabled>
                        <option value=''>Todos</option>
                      </select>
                      )}
                </div>
                )
              : null}
            {/* {user.perfil !== DIRECTOR && ( */}
            <Link to='/tickets/create' className='btn-crear-ticket'>
              <img src="public/img/plus-solid.svg" className="fa-solid fa-plus"></img>
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
            <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
              <InputForm
                label="ID ticket"
                type="text"
                name="idTicket"
                placeholder="Ingrese id de ticket"
                register={register}
                errors={errors}
                classCol="col-md-4 col-lg-4 form-group item-form"
                options={{
                  // required: 'Campo obligatorio'
                }}
              />
              <label for="rangoFechas">Rango de fechas:</label>
              <InputForm
                label="Fecha desde"
                type="date"
                name="fechaInicio"
                // placeholder="Desde"
                register={register}
                errors={errors}
                classCol="col-md-4 col-lg-4 form-group item-form"
                options={{
                  validate: (value) => validateFecha(value, hasta)
                }}
              />
              <InputForm
                label="Hasta"
                type="date"
                name="fechaHasta"
                // placeholder="hasta"
                register={register}
                errors={errors}
                classCol="col-md-4 col-lg-4 form-group item-form"
                options={{
                  validate: (value) => validateFecha(desde, value)
                }}
              />
              {errors.fechaHasta && <p>{errors.fechaHasta.message}</p>}

              <InputForm
                label="Area solicitante"
                type="text"
                name="areaSolicitante"
                placeholder="Ingrese area solicitante"
                register={register}
                errors={errors}
                classCol="col-md-4 col-lg-4 form-group item-form"
                options={{
                  // required: 'Campo obligatorio'
                }}
              />
              <InputForm
                label="E-mail"
                type="email"
                name="email"
                placeholder="Ingrese e-mail"
                register={register}
                errors={errors}
                classCol="col-md-4 col-lg-4 form-group item-form"
                options={{
                  // required: 'Campo obligatorio'
                }}
              />
              <InputForm
                label="Solicitante"
                type="text"
                name="solicitante"
                placeholder="Ingrese solicitante"
                register={register}
                errors={errors}
                classCol="col-md-4 col-lg-4 form-group item-form"
                options={{
                  // required: 'Campo obligatorio'
                }}
              />
              <InputForm
                label="Motivo"
                type="text"
                name="motivo"
                placeholder="Ingrese motivo"
                register={register}
                errors={errors}
                classCol="col-md-4 col-lg-4 form-group item-form"
                options={{
                  // required: 'Campo obligatorio'
                }}
              />
              <Button type="submit" onClick={handleFiltrarAvanzado} texto="Aplicar Filtro" classBoton="btn btn-tickets" />
              <Button type="button" onClick={handleEliminarFiltrarAvanzado} texto="Eliminar Filtro" classBoton="btn btn-tickets" />
            </form>
          </div>
        )}
        <DataTable
          columns={columns}
          data={filteredData}
          highlightOnHover
          conditionalRowStyles={conditionalRowStyles}
          pagination
          paginationComponentOptions={{ rowsPerPageText: 'Filas por página' }}
          responsive
          striped
          //   ! Variables para expandir.
          //   expandableRows
          //   expandableRowsComponent={ExpandedComponent}
          noDataComponent="No exiten registros para esos parametros en este último mes"
        />
      </>
    )
  }
}

export default Tabla
