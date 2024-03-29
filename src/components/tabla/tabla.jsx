import DataTable from 'react-data-table-component'
import useApiTest from '../../servicios/useApiTest'
import SkeletonTabla from './skeletonTabla'
import { useCallback, useMemo, useContext } from 'react'
import Button from '../partials/Button/Button'
import filtroTabla from './filtroTabla'
import CheckPrioridad from './checkPrioridad'
import CheckEstado from './checkEstado'
import { FiltrosContext } from './contextTabla'
import { useAuth } from '../partials/Nav/useAuth'


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
  //   console.log('render tabla')
  const {
    prioridad,
    handlePrioridadChange,
    seleccionados,
    handleSeleccionadosChange
  } = useContext(FiltrosContext)

  // Botones tabla
  const handleEdit = useCallback((id) => {
    alert(`Editar ${id}`)
  }, [])
  const handlePrint = useCallback((id) => {
    alert(`Imprimir ${id}`)
  }, [])
  const handleCancel = useCallback((id) => {
    alert(`Cancelar ${id}`)
  }, [])
  const handleRechazo = useCallback((id) => {
    alert(`Rechazar  ${id}`)
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
          <i className="fa fa-edit" onClick={() => handleEdit(row.id)}></i>
          <i className="fa fa-print" onClick={() => handlePrint(row.id)}></i>
          <i className="fa fa-trash" onClick={() => handleCancel(row.id)}></i>
          {user.role.includes('admin') && (
          <i className="fa-solid fa-rectangle-xmark" onClick={() => handleRechazo(row.id)}></i>
          )}
        </>
      )
    }
  ])

  // filtros
  const data = filtroTabla(datos, seleccionados, prioridad)
  console.log(`selecionados: ${seleccionados} prioridad: ${prioridad}`)

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
