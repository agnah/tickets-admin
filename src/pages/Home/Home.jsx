import Tablero from '../../components/Tablero/Tablero'
import ButtonsState from '../../components/Tickets/ButtonsState'
import TicketsTable from '../../components/Tickets/TicketsTable'

const Home = () => {
  return (
    <section className="main-container">
      <Tablero title="Tablero de Tickets">
        <ButtonsState />
      </Tablero>
      <Tablero title="Lista de Tickets">
        <TicketsTable />
      </Tablero>
    </section>
  )
}

export default Home
