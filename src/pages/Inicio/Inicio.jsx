import Button from '@components/partials/Button/Button'
import { useNavigate } from 'react-router-dom'

function Inicio () {
  const navigate = useNavigate()
  const redirectTickets = () => {
    navigate('/tickets')
  }
  const redirectTramites = () => {
    navigate('/tramites')
  }

  return (
    <>
      <h1>Bienvenidos al CAI</h1>
      <Button type="button" texto="Tickets" classBoton="btn btn-success" onClick={redirectTickets} />
      <Button type="button" texto="Tramites" classBoton="btn btn-info" onClick={redirectTramites} />
      <h2>alguna estadistica</h2>
    </>
  )
}

export default Inicio
