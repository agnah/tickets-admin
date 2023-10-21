import Button from '@components/partials/Button/Button'
import { useNavigate } from 'react-router-dom'
import useAuth from '@servicios/UseAuth'
import { perfil } from '@constantes/constUsers'
import './Inicio.css'
import Tablero from '../../components/Tablero/Tablero'
import { estadoTicket } from '../../constantes/constTickets'
import { useContext, useEffect } from 'react'
import { FiltrosContext } from '../../components/tabla/contextTabla'

function Inicio () {
  const navigate = useNavigate()
  const { handleSeccion, user, seccionTicket } = useAuth()
  const { ADMINISTRATIVO, ADMINISTRADOR, TECNICO } = perfil
  const { PENDIENTE, EN_CURSO } = estadoTicket
  const { handleFiltroSectorChange, handleFiltroUserChange, handleSeleccionadosChange } = useContext(FiltrosContext)

  useEffect(() => {
    // Llama a las funciones de manejo de contexto aquí
    if (user.perfil === TECNICO) {
      handleFiltroSectorChange(user.sector)
      handleFiltroUserChange(user.nombre)
      console.log('ini sector', user.sector, 'ini nombre', user.nombre)
    } else {
      handleFiltroSectorChange('')
    }
    handleSeleccionadosChange([PENDIENTE, EN_CURSO])
  }, [])

  const redirectTickets = () => {
    handleSeccion()
    navigate('/tickets')
  }
  const redirectTramites = () => {
    handleSeccion()
    navigate('/tramites')
  }

  console.log('render inicio')
  return (
    <>
      <h1 className='h1-inicio'>Bienvenidos al <span className={seccionTicket ? 'spanTramites' : 'spanTickets'}>CAI</span></h1>
      {/* {!user.perfil === TECNICO && (
    <>
      <Button type="button" texto="Tickets" classBoton="btn btn-success" onClick={redirectTickets} />
      <Button type="button" texto="Tramites" classBoton="btn btn-info" onClick={redirectTramites} />
    </>
  )} */}
      <div className='d-flex justify-content-center align-items-center mb-5 mt-4'>
        <div className='d-flex flex-column justify-content-center align-items-center'>
          {user.perfil === ADMINISTRADOR
            ? (
                seccionTicket
                  ? (
                  <Button type="button" texto="Tramites" classBoton="btn btn-tramites" onClick={redirectTramites} />
                    )
                  : (
                  <Button type="button" texto="Tickets" classBoton="btn btn-tickets" onClick={redirectTickets} />
                    )
              )
            : null}
          {user.perfil === ADMINISTRATIVO
            ? (
                !seccionTicket
                  ? (
                  <Button type="button" texto="Tickets" classBoton="btn btn-tickets" onClick={redirectTickets} />
                    )
                  : (
                  <Button type="button" texto="Tramites" classBoton="btn btn-tramites" onClick={redirectTramites} />
                    )
              )
            : null}
        </div>
      </div>
      <Tablero title="Alguna estadística">
        <div className='d-flex justify-content-center align-items-center estadisticas'>
          <div className='d-flex flex-column justify-content-center align-items-center'>
            <h3 className='h3-estadistica'>Estadística</h3>
            <p className='p-estadistica'>Alguna estadística</p>
          </div>
        </div>
      </Tablero>
    </>

  )
}

export default Inicio
