import React from 'react'
import Tablero from '../../components/Tablero/Tablero'
import Tabla from '../../components/tabla/tabla'

const Tickets = () => {
  return (
    <Tablero title="Lista de Tickets" page="Inicio / Tickets">
        <Tabla />
    </Tablero>
  )
}

export default Tickets
