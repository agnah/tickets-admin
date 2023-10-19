function formatToTwoDigits (value) {
  return value.toString().padStart(2, '0')
}

function formatDateToCustomFormat (dateString) {
  const date = new Date(dateString)

  const dia = formatToTwoDigits(date.getDate())
  const mes = formatToTwoDigits(date.getMonth() + 1)
  const año = date.getFullYear().toString().slice(-2)
  const hora = formatToTwoDigits(date.getHours())
  const minuto = formatToTwoDigits(date.getMinutes())

  return {
    fecha: `${dia}-${mes}-${año}`,
    hora: `${hora}:${minuto}`
  }
}

function FechaLocal (dateString) {
  const { fecha, hora } = formatDateToCustomFormat(dateString)

  return {
    fecha,
    hora
  }
}

export default FechaLocal
