// ! TODO: REFACTORIZAR
function filtroTabla (datos, seleccionados, prioridad, filtroUser) {
  const data = datos?.users?.filter((user) => {
    const cumpleFiltroSeleccionados = !seleccionados?.length || seleccionados.includes(user.company.department.toLowerCase())
    const cumpleFiltroPrioridad = !prioridad?.length || prioridad.includes(user.eyeColor.toLowerCase())
    const cumpleFiltroUser = !filtroUser?.length || filtroUser.toLowerCase().includes(user.firstName.toLowerCase())
    return cumpleFiltroSeleccionados && cumpleFiltroPrioridad && cumpleFiltroUser
  })
  return data
}
export default filtroTabla
