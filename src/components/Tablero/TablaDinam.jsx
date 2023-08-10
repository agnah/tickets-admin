import React from 'react'
import '../Tickets/TicketsTable.css'
import ButtonEdit from '../partials/Button/ButtonEdit'
import './TablaDinam.css'

const TablaDinam = ({ data, acciones, columnas }) => {
  const columnasLowercase = Object.keys(columnas)

  const algunaAccion = (id) => {
    alert(`id: ${id}`)
  }

  return (
    <div>
      <table className="table table-borderless ">
        <thead className="table-thead">
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
                  <ButtonEdit onClick={() => algunaAccion(item.id)} />
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
