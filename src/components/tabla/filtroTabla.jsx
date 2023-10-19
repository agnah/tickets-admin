function filtroTabla (
  datos,
  seleccionados,
  // prioridad,
  filtroUser,
  filtroSector
) {
  const filtroUserValido = typeof filtroUser === 'string' ? filtroUser.trim().toLowerCase() : ''

  const data = datos?.filter((ticket) => {
    const cumpleFiltroSeleccionados =
      !seleccionados?.length ||
      seleccionados.includes(ticket.estado.toLowerCase())
    // const cumpleFiltroPrioridad =
    //   !prioridad?.length || prioridad.includes(ticket.prioridad.toLowerCase())
    const cumpleFiltroUser =
    !filtroUserValido || (ticket.tecnico?.nombre?.trim().toLowerCase() === filtroUserValido)
    // let cumpleFiltroSector = false
    // if (ticket?.area?.nombre) {
    //   cumpleFiltroSector =
    //     !filtroSector?.length ||
    //     filtroSector
    //       .replace(/\s/g, '')
    //       .toLowerCase()
    //       .includes(ticket.area.nombre.replace(/\s/g, '').toLowerCase())
    // }
    const cumpleFiltroSector =
      !filtroSector?.length ||
      filtroSector.replace(/\s/g, '') ===
      ticket.area?.nombre?.trim().toLowerCase()
    return (
      cumpleFiltroSeleccionados &&
      // cumpleFiltroPrioridad &&
      cumpleFiltroUser &&
      cumpleFiltroSector
    )
  })
  return data
}
export default filtroTabla
