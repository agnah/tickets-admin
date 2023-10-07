export default async function FetchGeneral (api) {
  try {
    const res = await fetch(api,{
      headers: {
        "Content-Type": "application/json",
      }
    })
    if (!res.ok) {
      throw new Error(`Error de red: ${res.status} ${res.statusText}`)
    }
    return await res.json()
  } catch (error) {
    console.error('Error al obtener los datos:', error)
    return { error: 'No se pudo obtener la información' }
  }
}
