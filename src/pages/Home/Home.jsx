import Tablero from '@components/Tablero/Tablero'
import ButtonsState from '@components/Tickets/ButtonsState'
import TablaDinam from '@components/Tablero/TablaDinam'
// import { areas } from '@constantes/constAreas'
import { perfil } from '@constantes/constUsers'
import useAuth from '@servicios/UseAuth'

const data = [
  { id: 1, fecha: '2023-07-27', preTarea: 'Tarea 1' },
  { id: 2, fecha: '2023-07-28', preTarea: 'Tarea 2' },
  { id: 3, fecha: '2023-07-29', preTarea: 'Tarea 3' }
]
const valoresEstados = {
  pendientes: 4,
  asignados: 10,
  curso: 2,
  totales: 33
}

const columnas = { id: 'Id', fecha: 'Fecha', preTarea: 'Pre Tarea' }
const acciones = true

const setTitulosTabla = (user) => {
  // const { MESA_DE_ENTRADA, SOPORTE, CID, COMPUTOS, TELEFONIA, GDE } = areas
  const { RESPONSABLE, COORDINADOR, ADMINISTRADOR, COLABORADOR } = perfil
  const sectorTitulos = {
    [RESPONSABLE]: { titulo1: 'Estadisticas', titulo2: 'proximos a vencer' },
    [COORDINADOR]: { titulo1: 'Esatadisticas', titulo2: 'proximos a vencer' },
    [ADMINISTRADOR]: { titulo1: 'Estadisticas', titulo2: 'proximos a vencer' },
    [COLABORADOR]: { titulo1: 'Mis últimos tickets asignados', titulo2: 'Mis últimos tickets en curso' }
  }
  return sectorTitulos[user.sector] || { titulo1: 'Pendientes', titulo2: 'En Curso' }
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
            <TablaDinam data={data} columnas={columnas} tipo="tickets" acciones={acciones} />
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
