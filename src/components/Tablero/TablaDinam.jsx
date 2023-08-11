import { useCallback } from 'react'
import '../Tickets/TicketsTable.css'
import ButtonEdit from '../partials/Button/ButtonEdit'
import { useNavigate } from 'react-router-dom'

const TablaDinam = ({ data, acciones, columnas, tipo }) => {
  const columnasLowercase = Object.keys(columnas)
  const navigate = useNavigate()

  const handleEdit = useCallback((id) => {
    navigate(`/${tipo}/${id}`)
  }, [])

  return (
    <div>
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            {columnasLowercase.map((column, index) => (
              <th scope="col" key={index}>
                {columnas[column]}
              </th>
            ))}
            {acciones && <th scope="col">Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr scope="row" key={rowIndex}>
              {columnasLowercase.map((columnName, colIndex) => (
                <td key={colIndex}>{item[columnName]}</td>
              ))}
              {acciones && (
                <td>
                  <ButtonEdit onClick={() => handleEdit(item.id)} />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TablaDinam
