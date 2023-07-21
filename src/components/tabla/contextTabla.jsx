import { createContext, useState, useCallback } from 'react'

export const FiltrosContext = createContext()

export function FiltrosProvider ({ children }) {
  const [prioridad, setPrioridad] = useState([])
  const [seleccionados, setSeleccionados] = useState([])

  const handlePrioridadChange = useCallback((value) => {
    setPrioridad(value)
  }, [])

  const handleSeleccionadosChange = useCallback((values) => {
    setSeleccionados(values)
  }, [])

  return (
    <FiltrosContext.Provider
      value={{ prioridad, handlePrioridadChange, seleccionados, handleSeleccionadosChange }}
    >
      {children}
    </FiltrosContext.Provider>
  )
}
