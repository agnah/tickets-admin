import DataTable from 'react-data-table-component'
import useApiMock from '@servicios/useApiMock'
import SkeletonTabla from './skeletonTabla'
import { useCallback, useMemo, useContext } from 'react'
import Button from '../partials/Button/Button'
import filtroTabla from './filtroTabla'
import CheckPrioridad from './checkPrioridad'
import CheckEstado from './checkEstado'
import { FiltrosContext } from './contextTabla'
import useAuth from '@servicios/UseAuth'
import ButtonEdit from '../partials/Button/ButtonEdit'
import { useNavigate, Link } from 'react-router-dom'
import { apis } from '@constantes/constApis'
import { estadoTicket } from '@constantes/constTickets'
import { areas } from '@constantes/constAreas'

const colaborador = ['Franco Armani', 'Milton Casco', 'González Pirez', 'Paulo Díaz', 'Enzo Díaz', 'Enzo Pérez', 'Rodrigo Aliendro', 'Nicolás De La Cruz']

function Tabla () {
  const { PENDIENTE } = estadoTicket
  const { user } = useAuth()
  const navigate = useNavigate()
  const url = apis.API_TICKETS
  const {
    isLoading,
    isValidating,
    isError,
    isSuccess,
    data: datos,
    error,
    // mutate,
    trigger
  } = useApiMock(url)

  const {
    prioridad,
    handlePrioridadChange,
    seleccionados,
    handleSeleccionadosChange,
    filtroUser,
    handleFiltroUserChange
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
    {
      name: 'Estado',
      selector: (row) => row.estado,
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
    console.log('llego', filtro)
    const { MESA_DE_ENTRADA, SOPORTE, CID, COMPUTOS, TELEFONIA, GDE, CSTIMI, ADMIN } = areas
    const filterColumns = {
      [MESA_DE_ENTRADA]: ['Nro.', 'Fecha', 'Hora', 'Area', 'Piso', 'Área asignada', 'Colaborador', 'Estado', 'Accion'],
      [SOPORTE]: ['Nro.', 'Fecha', 'Hora', 'Area', 'Piso', 'Pre-tarea', 'Colaborador', 'Estado', 'Accion'],
      [CID]: ['Nro.', 'Fecha', 'Hora', 'Area', 'Piso', 'Pre-tarea', 'Colaborador', 'Estado', 'Accion'],
      [COMPUTOS]: ['Nro.', 'Fecha', 'Hora', 'Area', 'Piso', 'Pre-tarea', 'Colaborador', 'Estado', 'Accion'],
      [TELEFONIA]: ['Nro.', 'Fecha', 'Hora', 'Area', 'Piso', 'Pre-tarea', 'Colaborador', 'Estado', 'Accion'],
      [GDE]: ['Area', 'Piso', 'Colaborador', 'Estado'],
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
  const data = filtroTabla(datos, seleccionados, prioridad, filtroUser)

  if (isError) {
    return <p>Algo fallo: {error.message}</p>
  }
  if (isLoading) {
    return <SkeletonTabla />
  }
  if (isSuccess) {
    return (
      <>
        <Button
          classIcon="fa fa-refresh"
          texto={isValidating ? 'Validando' : ''}
          type="button"
          onClick={() => trigger()}
        />
        <br />
        <Link to='/tickets/create' className='btn btn-success'>Crear Ticket</Link>
        <br />
        {!seleccionados.includes(PENDIENTE) || seleccionados.length > 1
          ? (
            <select
              name='filtroUser'
              value={filtroUser}
              onChange={(e) => handleFiltroUserChange(e.target.value)}
            >
              <option value="">Colaborador</option>
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

        <CheckPrioridad
          prioridad={prioridad}
          onChange={handlePrioridadChange}
        />
        <CheckEstado
          seleccionados={seleccionados}
          onChange={handleSeleccionadosChange}
        />
        <DataTable
          columns={columns}
          data={data}
          highlightOnHover
          pagination
          responsive
          striped
          //   ! Variables para expandir.
          //   expandableRows
          //   expandableRowsComponent={ExpandedComponent}
          noDataComponent="No exiten registros para esos parametros"
        />
      </>
    )
  }
}

export default Tabla
