import Tablero from '../../components/Tablero/Tablero'
import TablaDinam from '../../components/Tablero/TablaDinam'
// import Button from '../../components/partials/Button/Button'

const data = [
  { id: '1', nombre: 'Juan', apellido: 'Perez', interno: '123456', perfil: 'Tecnico', estado: 'Activo' },
  { id: '2', nombre: 'Pedro', apellido: 'Gomez', interno: '123456', perfil: 'Tecnico', estado: 'Activo' },
  { id: '3', nombre: 'Maria', apellido: 'Lopez', interno: '123456', perfil: 'Tecnico', estado: 'Desafectado' },
  { id: '4', nombre: 'Jose', apellido: 'Gonzalez', interno: '123456', perfil: 'Tecnico', estado: 'Activo' },
  { id: '5', nombre: 'Ana', apellido: 'Martinez', interno: '123456', perfil: 'Tecnico', estado: 'Activo' },
  { id: '6', nombre: 'Juan', apellido: 'Perez', interno: '123456', perfil: 'Tecnico', estado: 'Licencia' }
]
const columnas = { id: 'Id', nombre: 'Nombre', apellido: 'Apellido', interno: 'Interno', perfil: 'Perfil', estado: 'Estado' }
const acciones = true

function Usuarios () {
  return (
    <Tablero title="Usuarios" classTitle="text-center">
      <TablaDinam data={data} acciones={acciones} columnas={columnas} classTable="table-hover" />
    </Tablero>
  )
}

export default Usuarios
