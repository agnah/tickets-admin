import Button from '@components/partials/Button/Button'
import { useNavigate } from 'react-router-dom'
import useAuth from '@servicios/UseAuth'
import { perfil } from '@constantes/constUsers'

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
  <h1>Bienvenidos al CAI</h1>
  {/* {!user.perfil.includes(TECNICO) && (
    <>
      <Button type="button" texto="Tickets" classBoton="btn btn-success" onClick={redirectTickets} />
      <Button type="button" texto="Tramites" classBoton="btn btn-info" onClick={redirectTramites} />
    </>
  )} */}
  {user.perfil.includes(ADMINISTRADOR)
    ? (
        seccionTicket
          ? (
      <Button type="button" texto="Tramites" classBoton="btn btn-info" onClick={redirectTramites} />
            )
          : (
      <Button type="button" texto="Tickets" classBoton="btn btn-success" onClick={redirectTickets} />
            )
      )
    : null}
  {user.perfil.includes(ADMINISTRATIVO)
    ? (
        !seccionTicket
          ? (
      <Button type="button" texto="Tickets" classBoton="btn btn-success" onClick={redirectTickets} />
            )
          : (
      <Button type="button" texto="Tramites" classBoton="btn btn-info" onClick={redirectTramites} />
            )
      )
    : null}
  <h2>alguna estadistica</h2>
</>

  )
}

export default Inicio
