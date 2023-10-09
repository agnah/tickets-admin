import { useContext } from 'react'
import { FiltrosContext } from './contextTabla'

const {
  filtroUser,
  filtroSector
} = useContext(FiltrosContext)

function filtroTabla(
  datos,
  seleccionados,
  prioridad
) {
  console.log('user', filtroUser, 'datos.')
  console.log('sector', filtroSector)
  // filtroSector = 'soporte'
  // filtroUser = 'Usuario lector computos'

  const data = datos?.filter((ticket) => {
    const cumpleFiltroSeleccionados =
      !seleccionados?.length ||
      seleccionados.includes(ticket.estado.toLowerCase())
    const cumpleFiltroPrioridad =
      !prioridad?.length || prioridad.includes(ticket.prioridad.toLowerCase())
    const cumpleFiltroUser =
      !filtroUser?.length ||
      filtroUser
        .replace(/\s/g, '')
        .toLowerCase()
        .includes(ticket?.tecnico?.nombre.replace(/\s/g, '').toLowerCase())
    let cumpleFiltroSector = false
    if (ticket?.area?.nombre) {
      cumpleFiltroSector =
        !filtroSector?.length ||
        filtroSector
          .replace(/\s/g, '')
          .toLowerCase()
          .includes(ticket.area.nombre.replace(/\s/g, '').toLowerCase())
    }
    return (
      cumpleFiltroSeleccionados &&
      cumpleFiltroPrioridad &&
      cumpleFiltroUser &&
      cumpleFiltroSector
    )
  })
  return data
}
export default filtroTabla
