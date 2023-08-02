import Tablero from '../../components/Tablero/Tablero'
import ButtonsState from '../../components/Tickets/ButtonsState'
// import TicketsTable from '../../components/Tickets/TicketsTable'
import TablaDinam from '../../components/Tablero/TablaDinam'
import { useAuth } from '../../components/partials/Nav/useAuth'

const data = [
  { id: 1, fecha: '2023-07-27', preTarea: 'Tarea 1' },
  { id: 2, fecha: '2023-07-28', preTarea: 'Tarea 2' },
  { id: 3, fecha: '2023-07-29', preTarea: 'Tarea 3' }
]
const valoresEstados = {
  nuevos: 4,
  asignados: 10,
  curso: 2,
  totales: 3
}

const columnas = { id: 'Id', fecha: 'Fecha', preTarea: 'Pre Tarea' }
const acciones = true

const setTitulosTabla = (user) => {
  if (user.role.includes('mesa_entrada')) {
    return { titulo1: 'Rechazados', titulo2: 'Nuevos' }
  }
  if (user.role.includes('area_tecnica')) {
    return { titulo1: 'Tecnico 1', titulo2: 'Nuevos' }
  }
  if (user.role.includes('admin')) {
    return { titulo1: 'Admin 1', titulo2: 'Nuevos' }
  }
  if (user.role.includes('cid')) {
    return { titulo1: 'Cid 1', titulo2: 'Nuevos' }
  }
  return { titulo1: 'Sin role', titulo2: 'Sin role' }
}

const Home = () => {
  const { user } = useAuth()
  const { titulo1, titulo2 } = setTitulosTabla(user)
  return (
    <>
      <Tablero title={'Tablero de Tickets'} page="Inicio">
        <ButtonsState valores={valoresEstados} user={user} />
      </Tablero>
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <Tablero title={`Tickets ${titulo1}`}>
            {/* <TicketsTable /> */}
            <TablaDinam data={data} columnas={columnas} acciones={acciones} />
          </Tablero>
        </div>
        <div className="col-sm-12 col-md-6">
          <Tablero title={`Tickets ${titulo2}`}>
            {/* <TicketsTable /> */}
            <TablaDinam data={data} columnas={columnas} acciones={acciones} />
          </Tablero>
        </div>
      </div>
    </>
  )
}

export default Home
