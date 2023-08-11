function filtroTabla (datos, seleccionados, prioridad, filtroUser) {
  const data = datos?.filter((ticket) => {
    const cumpleFiltroSeleccionados = !seleccionados?.length || seleccionados.includes(ticket.estado.toLowerCase())
    const cumpleFiltroPrioridad = !prioridad?.length || prioridad.includes(ticket.prioridad.toLowerCase())
    const cumpleFiltroUser = !filtroUser?.length || filtroUser.replace(/\s/g, '').toLowerCase().includes(ticket.colaborador.replace(/\s/g, '').toLowerCase())
    return cumpleFiltroSeleccionados && cumpleFiltroPrioridad && cumpleFiltroUser
  })
  return data
}
export default filtroTabla
