function filtroTabla (
  datos,
  seleccionados,
  prioridad,
  filtroUser,
  filtroSector
) {
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
        .includes(ticket.colaborador.replace(/\s/g, '').toLowerCase())
    let cumpleFiltroSector = false
    if (ticket?.area) {
      cumpleFiltroSector =
        !filtroSector?.length ||
        filtroSector
          .replace(/\s/g, '')
          .toLowerCase()
          .includes(ticket.area.replace(/\s/g, '').toLowerCase())
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
