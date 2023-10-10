import { useContext } from 'react'
import { FiltrosContext } from './contextTabla'

function filtroTabla (
  datos,
  seleccionados,
  prioridad
) {
  // filtroSector = 'soporte'
  // filtroUser = 'Usuario lector computos'
  const {
    filtroUser,
    filtroSector
  } = useContext(FiltrosContext)

  console.log('user', filtroUser, 'datos.')
  console.log('sector', filtroSector)

  const data = datos?.filter((ticket) => {
    const modi = filtroUser.replace(/\s/g, '')
      .toLowerCase()
    console.log(datos)
    const tike = datos.tecnico?.nombre?.replace(/\s/g, '').toLowerCase()
    console.log('modi', modi)
    console.log('tike', tike)
    const cumpleFiltroSeleccionados =
      !seleccionados?.length ||
      seleccionados.includes(ticket.estado.toLowerCase())
    const cumpleFiltroPrioridad =
      !prioridad?.length || prioridad.includes(ticket.prioridad.toLowerCase())
    const cumpleFiltroUser =
      !filtroUser?.length ||
      filtroUser.replace(/\s/g, '')
        .toLowerCase()
        .includes(ticket.tecnico?.nombre?.replace(/\s/g, '').toLowerCase())
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
