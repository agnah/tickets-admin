import DataTable from 'react-data-table-component'
import useApiMock from '@servicios/useApiMock'
import SkeletonTabla from './skeletonTabla'
import { useCallback, useMemo, useContext, useState } from 'react'
import filtroTabla from './filtroTabla'
// import CheckPrioridad from './checkPrioridad'
import CheckEstado from './checkEstado'
import { FiltrosContext } from './contextTabla'
import useAuth from '@servicios/UseAuth'
import ButtonEdit from '../partials/Button/ButtonEdit'
import { useNavigate, Link } from 'react-router-dom'
import { apis } from '@constantes/constApis'
import { estadoTicket } from '@constantes/constTickets'
import { areas } from '@constantes/constAreas'
import { perfil } from '@constantes/constUsers'
import Badge from '../partials/Button/Badge'
import './tabla.css'

const colaborador = ['Franco Armani', 'Milton Casco', 'González Pirez', 'Paulo Díaz', 'Enzo Díaz', 'Enzo Pérez', 'Rodrigo Aliendro', 'Nicolás De La Cruz', 'Tito']
const sectores = ['Soporte', 'Telefonía', 'Computos', 'Sistemas', 'GDE']

function Tabla () {
  const [busqueda, setBusqueda] = useState('')
  const { PENDIENTE } = estadoTicket
  const { user } = useAuth()
  const navigate = useNavigate()
  const url = apis.API_TICKETS
  const {
    isLoading,
    isError,
    isSuccess,
    data: datos,
    error
  } = useApiMock(url)

  const {
    prioridad,
    // handlePrioridadChange,
    seleccionados,
    handleSeleccionadosChange,
    filtroUser,
    handleFiltroUserChange,
    filtroSector,
    handleFiltroSectorChange
  } = useContext(FiltrosContext)

  // Botones tabla
  const handleEdit = useCallback((id) => {
    navigate(`/tickets/${id}`)
  }, [])

  // columnas tabla
  const columnsTotales = useMemo(() => [
    {
      name: 'Nro.',
      selector: (row) => row.ticket,
      sortable: true
    },
    {
      name: 'Fecha',
      selector: (row) => row.fecha,
      sortable: true
    },
    {
      name: 'Hora',
      selector: (row) => row.fecha,
      sortable: true
    },
    {
      name: 'Sede',
      selector: (row) => row.sede,
      sortable: true
    },
    {
      name: 'Area',
      selector: (row) => row.area,
      sortable: true
    },
    {
      name: 'Piso',
      selector: (row) => row.piso,
      sortable: true
    },
    {
      name: 'Colaborador',
      selector: (row) => row.colaborador,
      sortable: true
    },
    {
      name: 'Pre-tarea',
      selector: (row) => row.pre_tarea,
      sortable: true
    },
    {
      name: 'Área asignada',
      selector: (row) => row.area_asignada,
      sortable: true
    },
    // {
    //   name: 'Estado',
    //   selector: (row) => row.estado,
    //   sortable: true
    // },
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

  const filteredColumns = (filtro) => {
    const { MESA_DE_ENTRADA, SOPORTE, CID, COMPUTOS, TELEFONIA, GDE, CSTIMI, ADMIN } = areas
    const filterColumns = {
      [MESA_DE_ENTRADA]: ['Nro.', 'Fecha', 'Hora', 'Area', 'Piso', 'Área asignada', 'Colaborador', 'Estado', 'Accion'],
      [SOPORTE]: ['Nro.', 'Fecha', 'Hora', 'Area', 'Piso', 'Pre-tarea', 'Colaborador', 'Estado', 'Accion'],
      [CID]: ['Nro.', 'Fecha', 'Hora', 'Area', 'Piso', 'Pre-tarea', 'Colaborador', 'Estado', 'Accion'],
      [COMPUTOS]: ['Nro.', 'Fecha', 'Hora', 'Area', 'Piso', 'Pre-tarea', 'Colaborador', 'Estado', 'Accion'],
      [TELEFONIA]: ['Nro.', 'Fecha', 'Hora', 'Area', 'Piso', 'Pre-tarea', 'Colaborador', 'Estado', 'Accion'],
      [GDE]: ['Nro.', 'Fecha', 'Hora', 'Area', 'Piso', 'Pre-tarea', 'Colaborador', 'Estado', 'Accion'],
      [CSTIMI]: ['Nro.', 'Fecha', 'Hora', 'Area', 'Piso', 'Pre-tarea', 'Colaborador', 'Estado', 'Accion'],
      [ADMIN]: ['Nro.', 'Fecha', 'Hora', 'Area', 'Piso', 'Pre-tarea', 'Colaborador', 'Estado', 'Accion']
    }
    const columnsPorArea = filterColumns[filtro] || filterColumns[MESA_DE_ENTRADA]
    return columnsTotales.filter(column =>
      columnsPorArea.includes(column.name)
    )
  }

  const columns = useMemo(() => filteredColumns(user.sector), [])

  // filtros
  // const preData = datos.filter(elem => elem.area === user.sector)

  // const data = filtroTabla(preData, seleccionados, prioridad, filtroUser)

  const data = filtroTabla(datos, seleccionados, prioridad, filtroUser, filtroSector)

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
    const filteredData = data.filter(item =>
      Object.values(item).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(busqueda.toLowerCase())
      )
    )
    return (
      <>
        <div className="container-h">
          <div className="div-search">
            <div className="div-icon-search">
              <img src="../../../public/img/magnifying-glass-solid.svg" alt="search"/>
            </div>
            <input
              type="search"
              placeholder="Buscar..."
              inputmode="search"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="input-search"
            />
          </div>
          <div className="right-elements">
            <div>
              {!seleccionados.includes(PENDIENTE) || seleccionados.length > 1
                ? (
                  <select
                    name='filtroUser'
                    value={filtroUser}
                    onChange={(e) => handleFiltroUserChange(e.target.value)}
                  >
                    <option value="">Colaboradores</option>
                    {colaborador.map((option, index) => (
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
            <div>
              {!seleccionados.includes(PENDIENTE) || seleccionados.length > 1
                ? (
                  <div>
                    <select
                    name='filtroSector'
                    value={filtroSector}
                    onChange={(e) => handleFiltroSectorChange(e.target.value)}
                  >
                    <option value="">Sector</option>
                    {sectores.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                    <img src="public/img/caret-down-solid.svg" className="fa-solid fa-caret-down"></img>
                  </div>
                  )
                : (
                  <select disabled>
                    <option value=''>Todos</option>
                  </select>
                  )}
            </div>
            {!user.perfil.includes(perfil.DIRECTOR) && (
              <Link to='/tickets/create' className='btn-crear-ticket'>
                <img src="public/img/plus-solid.svg" className="fa-solid fa-plus"></img>
                Nuevo Ticket
              </Link>
            )}
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
