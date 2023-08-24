import DataTable from 'react-data-table-component'
import useApiTest from '@servicios/useApiTest'
import SkeletonTabla from './skeletonTabla'
import { useCallback, useMemo, useContext } from 'react'
import Button from '../partials/Button/Button'
import filtroTabla from './filtroTabla'
import CheckPrioridad from './checkPrioridad'
import CheckEstado from './checkEstado'
import { FiltrosContext } from './contextTabla'
import useAuth from '@servicios/UseAuth'
import ButtonVer from '../partials/Button/ButtonVer'
import ButtonEdit from '../partials/Button/ButtonEdit'
import { useNavigate, Link } from 'react-router-dom'
import './tabla.css'

const optionListUser = ['alison', 'toy', 'terry', 'twila', 'amos', 'ewell']
// const InfoExtra = (data) => {
//   const info = data.data
//   return (
//     <small>
//       id: {info.id} - compania: {info.company.name} - direccion:{' '}
//       {info.address.address} - ciudad: {info.address.city}
//     </small>
//   )
// }

// const ExpandedComponent = ({ data }) => <InfoExtra data={data} />

function Tabla () {
  const { user } = useAuth()
  const navigate = useNavigate()
  const path = 'users'
  const {
    isLoading,
    isValidating,
    isError,
    isSuccess,
    data: datos,
    error,
    // mutate,
    trigger
  } = useApiTest(path)

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
  const handleVer = useCallback((id) => {
    navigate(`/tickets/${id}`)
  }, [])

  // columnas tabla
  const columns = useMemo(() => [
    {
      name: 'Nro.',
      selector: (row) => row.firstName,
      sortable: true
    },
    {
      name: 'Fecha',
      selector: (row) => row.lastName,
      sortable: true
    },
    {
      name: 'Area',
      selector: (row) => row.email,
      sortable: true
    },
    {
      name: 'Solicitante',
      selector: (row) => row.eyeColor,
      sortable: true
    },
    {
      name: 'Departamento Asignado',
      selector: (row) => row.company.department,
      sortable: true
    },
    {
      name: 'Tecnico',
      cell: () => <>ver</>
    },
    {
      name: 'Acciones',
      // selector: row => row.id,
      cell: (row) => (
        <>
          <ButtonVer onClick={() => handleVer(row.id)} />
          <ButtonEdit onClick={() => handleEdit(row.id)} />
        </>
      )
    }
  ], [user.role])

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
      <div className="container-table">
        <Button
          classIcon="fa fa-refresh"
          texto={isValidating ? 'Validando' : ''}
          type="button"
          onClick={() => trigger()}
        />
        <br />
        <Link to='/tickets/create' className='btn btn-success'>Crear Ticket</Link>
        <br />
        {!seleccionados.includes('marketing') || seleccionados.length > 1
          ? (
            <select
              name='filtroUser'
              value={filtroUser}
              onChange={(e) => handleFiltroUserChange(e.target.value)}
            >
              <option value="">Colaborador</option>
              {optionListUser.map((option, index) => (
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
      </div>
    )
  }
}

export default Tabla
