import Tablero from '../../components/Tablero/Tablero'
import ButtonsState from '../../components/Tickets/ButtonsState'
import TicketsTable from '../../components/Tickets/TicketsTable'
import Tabla from '../../components/tabla/tabla'


const Home = () => {
  return (
    <section className="main-container">
      <Tabla />
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
