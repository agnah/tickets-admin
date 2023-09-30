import Button from '@components/partials/Button/Button'
import { useNavigate } from 'react-router-dom'
import useAuth from '@servicios/UseAuth'
import { perfil } from '@constantes/constUsers'
import './Inicio.css'
import Tablero from '../../components/Tablero/Tablero'

function Inicio () {
  const navigate = useNavigate()
  const { handleSeccion, user, seccionTicket } = useAuth()
  const { ADMINISTRATIVO, ADMINISTRADOR } = perfil
  const redirectTickets = () => {
    handleSeccion()
    navigate('/tickets')
  }
  const redirectTramites = () => {
    handleSeccion()
    navigate('/tramites')
  }

  return (
    <>
  <h1 className='h1-inicio'>Bienvenidos al <span className={seccionTicket ? 'spanTramites' : 'spanTickets'}>CAI</span></h1>
  {/* {!user.perfil.includes(TECNICO) && (
    <>
      <Button type="button" texto="Tickets" classBoton="btn btn-success" onClick={redirectTickets} />
      <Button type="button" texto="Tramites" classBoton="btn btn-info" onClick={redirectTramites} />
    </>
  )} */}
  <div className='d-flex justify-content-center align-items-center mb-5 mt-4'>
    <div className='d-flex flex-column justify-content-center align-items-center'>
      {user.perfil.includes(ADMINISTRADOR)
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
      {user.perfil.includes(ADMINISTRATIVO)
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
