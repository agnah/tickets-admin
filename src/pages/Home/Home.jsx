import React from 'react'
import Tablero from '@components/Tablero/Tablero'
import ButtonsState from '@components/Tickets/ButtonsState'
import TablaDinam from '@components/Tablero/TablaDinam'
import { perfil } from '@constantes/constUsers'
import useAuth from '@servicios/UseAuth'
import { apis } from '@constantes/constApis'
import useApiMock from '@servicios/useApiMock'
import { estadoTicket } from '@constantes/constTickets'

const columnas = { id: 'Id', fecha: 'Fecha', pre_tarea: 'Pre Tarea' }
const acciones = true

const setTitulosTabla = (user) => {
  const { RESPONSABLE, COORDINADOR, DIRECTOR, COLABORADOR } = perfil
  const sectorTitulos = {
    [RESPONSABLE]: { titulo1: 'Tickets con mas de 3 dias del Area', titulo2: 'Cantidad de Ticket en curso del Area' },
    [COORDINADOR]: { titulo1: 'Tickets con mas de 3 dias del Area', titulo2: 'Cantidad de Ticket en curso del Area' },
    [DIRECTOR]: { titulo1: 'Estadisticas por Area', titulo2: 'Proximos a vencer' },
    [COLABORADOR]: { titulo1: 'Mis Tickets con mas de 3 dias', titulo2: 'Mis Tickets en curso' }
  }
  return sectorTitulos[user.sector] || { titulo1: 'Ticket pendientes', titulo2: 'Tickets en curso' }
}

const Home = () => {
  const { user } = useAuth()
  const { titulo1, titulo2 } = setTitulosTabla(user)
  const { PENDIENTE, EN_CURSO } = estadoTicket
  const url = apis.API_TICKETS
  const {
    isLoading,
    isError,
    isSuccess,
    error,
    data
  } = useApiMock(url)

  const valoresEstados = (dato) => {
    const initialState = {
      encurso: 0,
      pendientes: 0,
      totales: dato.length
    }

    const result = dato.reduce((acc, ticket) => {
      if (ticket.estado === EN_CURSO) {
        acc.encurso++
      } else if (ticket.estado === PENDIENTE) {
        acc.pendientes++
      }
      return acc
    }, initialState)

    return result
  }

  if (isError) {
    return <p>Algo falló: {error.message}</p>
  }
  if (isLoading) {
    return <p>Cargando...</p>
  }
  if (isSuccess) {
    const limitedData = data.slice(0, 10)
    return (
      <>
        <Tablero title={'Tablero de Tickets'} page="Inicio">
          <ButtonsState valores={valoresEstados(data)} user={user} />
        </Tablero>
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <Tablero title={titulo1}>
              <TablaDinam data={limitedData} columnas={columnas} tipo="tickets" acciones={acciones} />
            </Tablero>
          </div>
          <div className="col-sm-12 col-md-6">
            <Tablero title={titulo2}>
              <TablaDinam data={limitedData} columnas={columnas} tipo="tickets" acciones={acciones} />
            </Tablero>
          </div>
        </div>
      </>
    )
  }

  return null
}

export default Home
