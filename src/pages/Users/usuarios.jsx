import React, { useState, useEffect } from 'react'
import Tablero from '@components/Tablero/Tablero'
import TablaDinam from '@components/Tablero/TablaDinam'
import { Link } from 'react-router-dom'
import { rolUsuario } from '@constantes/constUsers'
import useAuth from '@servicios/UseAuth'
import FetchGeneral from '@servicios/fetchgeneral'
import { apis } from '@constantes/constApis'

const columnas = { nombre: 'Nombre', apellido: 'Apellido', email: 'Email', telefono: 'Teléfono', interno: 'Interno', area_id: 'Perfil' }
const acciones = true
const url = apis.API_USUARIOS

function Usuarios () {
  const { user } = useAuth()
  const { LECTOR } = rolUsuario
  const [loading, setLoading] = useState(true)
  const [datos, setDatos] = useState([])

  useEffect(() => {
    FetchGeneral(url)
      .then((datos) => {
        setDatos(datos)
        setLoading(false)
      })
      .catch((error) => {
        // Maneja el error adecuadamente, por ejemplo, mostrando un mensaje de error
        console.error('Error al obtener los datos:', error)
      })
  }, [])

  return (
    <Tablero title="Usuarios" classTitle="text-center">
      {user.rolUsuario !== LECTOR && (
        <Link to='/usuarios/create' className='btn btn-success'>Nuevo Usuario</Link>
      )}
      {loading
        ? (
          <p>Cargando datos...</p>
          )
        : (
          <TablaDinam data={datos} acciones={user.rolUsuario !== LECTOR && acciones} tipo="usuarios" columnas={columnas} classTable="table-hover" />
          )}
    </Tablero>
  )
}

export default Usuarios
