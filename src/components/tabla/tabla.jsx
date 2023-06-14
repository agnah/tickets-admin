import DataTable from 'react-data-table-component';
import useApiTest from '../../servicios/useApiTest';
import SkeletonTabla from './skeletonTabla'

const columns = [
    {
        name: 'Nro.',
        selector: row => row.firstName,
        sortable: true,
    },
    {
        name: 'Fecha',
        selector: row => row.lastName,
        sortable: true,
    },
    {
        name: 'Area',
        selector: row => row.email,
        sortable: true,
    },
    {
        name: 'Solicitante',
        selector: row => row.company.department,
        sortable: true,
    },
    {
        name: 'Departamento Asignado',
        selector: row => row.company.department,
        sortable: true,
    },
    {
        name: 'Tecnico',
        cell: () => (<>
            ver
        </>),
    },
    {
        name: 'Acciones',
        // selector: row => row.id,
        cell: row => (<>
            <button>A</button>
            <button>{row.id}</button>
        </>),
    },
];

const InfoExtra = (data) => {
    const info = data.data
    return (
        <small>id: {info.id} - compania: {info.company.name} - direccion: {info.address.address} - ciudad: {info.address.city}</small>
    )
}

const ExpandedComponent = ({ data }) => (<InfoExtra data={data} />)

function Tabla() {
    const path = "users"
    const { isLoading, isValidating, isError, isSuccess, data, error } = useApiTest(path);
    console.log(isValidating)
    if (isError) {
        return <p>Algo falló: {error.message}</p>;
    }
    if (isLoading) {
        return <SkeletonTabla />
    }
    if (isSuccess)
        return (
            <>
            {isValidating ? <p>Tabla test - Re-cargando</p>:<p>Tabla test </p>}
                <DataTable
                    columns={columns}
                    data={data?.users}
                    highlightOnHover
                    pagination
                    responsive
                    striped
                    expandableRows
                    expandableRowsComponent={ExpandedComponent}

                />
            </>)
}

export default Tabla;