import React, { useState, useEffect } from 'react'
import Tablero from '@components/Tablero/Tablero'
import TablaDinam from '@components/Tablero/TablaDinam'
import { Link } from 'react-router-dom'
import { rolUsuario } from '@constantes/constUsers'
import useAuth from '@servicios/UseAuth'
import FetchGeneral from '@servicios/fetchgeneral'
import { apis } from '@constantes/constApis'
import './usuarios.css'

const columnas = { nombre: 'Nombre', apellido: 'Apellido', email: 'Email', telefono: 'Teléfono', interno: 'Interno', perfil: 'Perfil' }
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
        console.error('Error al obtener los datos:', error)
      })
  }, [])

  return (
    <Tablero title="Usuarios" classTitle="text-center">
      {user.rolUsuario !== LECTOR && (
        <Link to='/usuarios/create' className='btn-crear-ticket'>
          <img src="public/img/plus-solid.svg" className="fa-solid fa-plus"></img>
          Nuevo Usuario
        </Link>
      )}
      {loading
        ? (
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Cargando...</span>
          </div>
          )
        : (
          <TablaDinam data={datos} acciones={user.rolUsuario !== LECTOR && acciones} tipo="usuarios" columnas={columnas} classTable="table-hover" />
          )}
    </Tablero>
  )
}

export default Usuarios
