import React from 'react'
import Tablero from '@components/Tablero/Tablero'
// import Tabla from '@components/tabla/tabla'
import TablaMock from '@components/tabla/tablaMock'
import './Tickets.css'

const Tickets = () => {
  return (
    <Tablero title="Lista de Tickets" classTitle="title-ticket" page="Inicio / Tickets">
      {/* <Tabla /> */}
      <TablaMock />
    </Tablero>
  )
}

export default Tickets
