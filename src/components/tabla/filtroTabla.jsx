// ! TODO: REFACTORIZAR
function filtroTabla (datos, seleccionados, prioridad) {
  const data = datos?.users?.filter((user) => {
    const cumpleFiltroSeleccionados = seleccionados.length === 0 || seleccionados.includes(user.company.department.toLowerCase())
    const cumpleFiltroPrioridad = prioridad.length === 0 || prioridad.includes(user.eyeColor.toLowerCase())
    return cumpleFiltroSeleccionados && cumpleFiltroPrioridad
  })
  return data
}

export default filtroTabla
