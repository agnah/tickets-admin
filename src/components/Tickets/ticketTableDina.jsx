import Button from '../partials/Button/Button'
import './TicketsTable.css'

const TablaDinamica = ({ data }) => {
  const columnNames = data.length > 0 ? Object.keys(data[0]) : []

  return (
    <div>
      <table className="table table-striped">
        <thead className="table-dark ">
          <tr>
            {columnNames.map(columnName => (
              <th scope="col" key={columnName}>{columnName}</th>
            ))}
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr scope="row" key={item.id}>
              <td>{item.id}</td>
              <td>{item.fecha}</td>
              <td>{item.preTarea}</td>
              <td colSpan={columnNames.length}>
            <Button
              type=""
              classIcon="fa fa-edit"
              onClick={() => alert(item.id)}
            />
            </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TablaDinamica
