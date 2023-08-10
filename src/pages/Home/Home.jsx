import Tablero from '../../components/Tablero/Tablero'
import ButtonsState from '../../components/Tickets/ButtonsState'
import TablaDinam from '../../components/Tablero/TablaDinam'
import { sector } from '../../constantes/constUsers'
import useAuth from '../../servicios/UseAuth'

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
  const sectorTitulos = {
    [sector.MESA_DE_ENTRADA]: { titulo1: 'mesa de entrada', titulo2: 'Nuevos' },
    [sector.SOPORTE]: { titulo1: 'Soporte', titulo2: 'Nuevos' },
    [sector.CID]: { titulo1: 'cid', titulo2: 'Nuevos' },
    [sector.COMPUTOS]: { titulo1: 'computos', titulo2: 'Nuevos' },
    [sector.TELEFONIA]: { titulo1: 'telefonia', titulo2: 'Nuevos' },
    [sector.GDE]: { titulo1: 'gde', titulo2: 'Nuevos' }
  }
  return sectorTitulos[user.sector] || { titulo1: 'admin', titulo2: 'admin' }
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
          <Tablero title={<span dangerouslySetInnerHTML={{ __html: `Tickets <span class="colored-title">${titulo2}</span>` }} />}>
            {/* <TicketsTable /> */}
            <TablaDinam data={data} columnas={columnas} acciones={acciones} />
          </Tablero>
        </div>
      </div>
    </>
  )
}

export default Home
