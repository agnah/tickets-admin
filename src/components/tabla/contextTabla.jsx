import { createContext, useState, useCallback } from 'react'
import { estadoTicket } from '@constantes/constTickets'

export const FiltrosContext = createContext()

export function FiltrosProvider ({ children }) {
  const { PENDIENTE, ASIGNADO, EN_CURSO } = estadoTicket
  const [prioridad, setPrioridad] = useState([])
  const [seleccionados, setSeleccionados] = useState([PENDIENTE, ASIGNADO, EN_CURSO])
  const [filtroUser, setFiltroUser] = useState('')

  const handlePrioridadChange = useCallback((value) => {
    setPrioridad(value)
  }, [])

  const handleSeleccionadosChange = useCallback((values) => {
    setSeleccionados(values)
  }, [])

  const handleFiltroUserChange = useCallback((values) => {
    console.log('llego', values)
    setFiltroUser(values)
  }, [])

  return (
    <FiltrosContext.Provider
      value={{ prioridad, handlePrioridadChange, seleccionados, handleSeleccionadosChange, filtroUser, handleFiltroUserChange }}
    >
      {children}
    </FiltrosContext.Provider>
  )
}
