import React, { useState, useEffect } from 'react'
import Tablero from '@components/Tablero/Tablero'
import TablaDinam from '@components/Tablero/TablaDinam'
import { Link } from 'react-router-dom'
import { rolUsuario, perfil } from '@constantes/constUsers'
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
  const { SUPERADMIN } = perfil
  const [loading, setLoading] = useState(true)
  const [datos, setDatos] = useState([])

  const areaMapping = {
    1: 'computos',
    2: 'telefonia',
    3: 'soporte',
    4: 'sistemas',
    5: 'gde'
  }

  useEffect(() => {
    FetchGeneral(url)
      .then((datos) => {
        const datosPerfil = (user.perfil === SUPERADMIN)
          ? datos
          : datos.filter(usuarios => areaMapping[usuarios?.area_id
          ] === user.sector)
        setDatos(datosPerfil)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error)
      })
  }, [])

  return (
    <Tablero title="Usuarios" classTitle="text-center" page="/">
      {user.rolUsuario !== LECTOR && (
        <div className="d-flex justify-content-start">
          <Link to='/usuarios/create' className='btn-crear-ticket btn-crear-usuario'>
            <img src="public/img/plus-solid.svg" className="fa-solid fa-plus"></img>
            Nuevo Usuario
          </Link>
        </div>
      )}
      {loading
        ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          )
        : (
          <TablaDinam data={datos} acciones={user.rolUsuario !== LECTOR && acciones} tipo="usuarios" columnas={columnas} classTable="table-hover" />
          )}
    </Tablero>
  )
}

export default Usuarios
