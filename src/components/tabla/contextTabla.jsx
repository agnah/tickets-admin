import { createContext, useState, useCallback } from 'react'
import { estadoTicket } from '@constantes/constTickets'

export const FiltrosContext = createContext()

export function FiltrosProvider ({ children }) {
  const { PENDIENTE, EN_CURSO } = estadoTicket
  const [prioridad, setPrioridad] = useState([])
  const [seleccionados, setSeleccionados] = useState([PENDIENTE, EN_CURSO])
  const [filtroUser, setFiltroUser] = useState('')
  const [filtroSector, setFiltroSector] = useState('')
  const handlePrioridadChange = useCallback((value) => {
    setPrioridad(value)
  }, [])

  const handleSeleccionadosChange = useCallback((values) => {
    setSeleccionados(values)
  }, [])

  const handleFiltroUserChange = (values) => {
    setFiltroUser(values)
    console.log('llego a handle user', values)
  }

  const handleFiltroSectorChange = (value) => {
    setFiltroSector(value)
    console.log('llego a handle sector', value)
  }

  return (
    <FiltrosContext.Provider
      value={{
        prioridad,
        handlePrioridadChange,
        seleccionados,
        handleSeleccionadosChange,
        filtroUser,
        handleFiltroUserChange,
        filtroSector,
        handleFiltroSectorChange
      }}
    >
      {children}
    </FiltrosContext.Provider>
  )
}
