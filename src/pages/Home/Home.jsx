import Tablero from '../../components/Tablero/Tablero'
import ButtonsState from '../../components/Tickets/ButtonsState'
import TicketsTable from '../../components/Tickets/TicketsTable'

const Home = () => {
  return (
    <>
      <Tablero title="Tablero de Tickets" page="Inicio">
        <ButtonsState />
      </Tablero>
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <Tablero title="Lista de Tickets">
            <TicketsTable />
          </Tablero>
        </div>
        <div className="col-sm-12 col-md-6">
          <Tablero title="Lista de Tickets">
            <TicketsTable />
          </Tablero>
        </div>
      </div>
    </>
  )
}

export default Home
