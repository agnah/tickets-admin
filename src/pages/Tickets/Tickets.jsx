import React from 'react'
import Tablero from '@components/Tablero/Tablero'
// import Tabla from '@components/tabla/tabla'
import TablaMock from '@components/tabla/tablaMock'

const Tickets = () => {
  return (
    <Tablero title="Lista de Tickets" page="Inicio / Tickets">
      {/* <Tabla /> */}
      <TablaMock />
    </Tablero>
  )
}

export default Tickets
