import Button from '../partials/Button/Button'
import './TicketsTable.css'

const TicketsTable = () => {
  return (
    <table className="table table-striped">
      <thead className="table-dark ">
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Titulo</th>
          <th scope="col">Autor</th>
          <th scope="col">Fecha</th>
          <th scope="col">Estado</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">#00001</th>
          <td>Ayuda con sistema web</td>
          <td>Tomas Gutierrez</td>
          <td>09 jul 2023</td>
          <td className='text-center'>
            <Button
              type=""
              classBoton="btn-table btn-badge btn-progress w-75"
              classIcon=""
              texto="En Progreso"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">#00002</th>
          <td>Instalacion de componentes</td>
          <td>Agustina Aguirre</td>
          <td>09 jul 2023</td>
          <td className='text-center'>
            <Button
              type=""
              classBoton="btn-table btn-badge btn-asigned w-75"
              classIcon=""
              texto="Asignado"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">#00003</th>
          <td>Configurar PC</td>
          <td>Leo Messi</td>
          <td>09 jul 2023</td>
          <td className='text-center'>
            <Button
              type=""
              classBoton="btn-table btn-badge btn-pending w-75"
              classIcon=""
              texto="Pendiente"
            />
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default TicketsTable
