function checkPrioridad({ prioridad, onChange }) {
  const onChangeValue = (event) => {
    const newValue = event.target.value;
    onChange(newValue);
  }
  return (
    <div>
      <label>
        <input type="radio" name="prioridad" value="" onChange={onChangeValue} checked={prioridad.length === 0} />
        Todas</label>
      <label>
        <input type="radio" name="prioridad" value="green" onChange={onChangeValue} checked={prioridad === "green"} />
        Alta green</label>
      <label>
        <input type="radio" name="prioridad" value="blue" onChange={onChangeValue} checked={prioridad === "blue"} />
        Baja blue</label>
    </div>
  )
}
export default checkPrioridad

