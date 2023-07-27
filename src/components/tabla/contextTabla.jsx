import { createContext, useState, useCallback } from 'react'

export const FiltrosContext = createContext()

export function FiltrosProvider ({ children }) {
  const [prioridad, setPrioridad] = useState([])
  const [seleccionados, setSeleccionados] = useState(['marketing', 'services', 'support'])
  const [filtroUser, setFiltroUser] = useState('')

  const handlePrioridadChange = useCallback((value) => {
    setPrioridad(value)
  }, [])

  const handleSeleccionadosChange = useCallback((values) => {
    setSeleccionados(values)
  }, [])

  const handleFiltroUserChange = useCallback((values) => {
    setFiltroUser(values.target.value)
  }, [])

  return (
    <FiltrosContext.Provider
      value={{ prioridad, handlePrioridadChange, seleccionados, handleSeleccionadosChange, filtroUser, handleFiltroUserChange }}
    >
      {children}
    </FiltrosContext.Provider>
  )
}
