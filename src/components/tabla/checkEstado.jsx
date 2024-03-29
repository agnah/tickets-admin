function CheckEstado ({ onChange, seleccionados }) {
  const onChangeValue = (event) => {
    const value = event.target.value
    onChange(seleccionados)

    if (event.target.checked) {
      if (value === '') {
        onChange([])
      } else {
        // onChange([...seleccionados, value])
        onChange(seleccionados.concat(value))
        
      }
    } else {
      onChange(seleccionados.filter((filtro) => filtro !== value))
    }
  }

  return (
    <div>
      <label>
        <input type="checkbox" name="estado" value="" onChange={onChangeValue} checked={seleccionados.length === 0} />
        Todos</label>
      <label>
        <input type="checkbox" name="estado" value="marketing" onChange={onChangeValue} checked={seleccionados.includes('marketing')} />
        Nuevo marketing</label>
      <label>
        <input type="checkbox" name="estado" value="services" onChange={onChangeValue} checked={seleccionados.includes('services')} />
        Asignado services</label>
      <label>
        <input type="checkbox" name="estado" value="support" onChange={onChangeValue} checked={seleccionados.includes('support')} />
        En Proceso support</label>
      <label>
        <input type="checkbox" name="estado" value="accounting" onChange={onChangeValue} checked={seleccionados.includes('accounting')} />
        Finalizado accounting </label>
      <label>
        <input type="checkbox" name="estado" value="sales" onChange={onChangeValue} checked={seleccionados.includes('sales')} />
        Anulado sales</label>
    </div>
  )
}

export default CheckEstado
