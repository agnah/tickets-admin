import Tablero from '../../components/Tablero/Tablero'
import ButtonsState from '../../components/Tickets/ButtonsState'
import TicketsTable from '../../components/Tickets/TicketsTable'

const Home = () => {
  return (
    <section className="main-container">
      <Tablero title="Tablero de Tickets">
        <ButtonsState />
      </Tablero>
      <div class="row">
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
    </section>
  )
}

export default Home
