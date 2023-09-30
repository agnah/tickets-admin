import React from 'react'
import './Badge.css'

const Badge = ({ classes, text, ticketEstado }) => {
  let fillColor = '#000000'
  // Asigna un color según el estado del ticket
  switch (ticketEstado) {
    case 'pendiente':
      fillColor = '#F7941E'
      break
    case 'asignado':
      fillColor = '#F7941E'
      break
    case 'en_curso':
      fillColor = '#50B8B1'
      break
    case 'anulado':
      fillColor = '#EE3D8F'
      break
    case 'finalizado':
      fillColor = '#AAAAAA'
      break
    case 'derivado':
      fillColor = '#9283BE'
      break
    default:
      fillColor = '#000000'
      break
  }
  return (
    <div className={`badge-container ${classes}`}>
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="93" height="32">
        <g id="Grupo_399" data-name="Grupo 399" transform="translate(-385.525 -218)">
          <g transform="matrix(1, 0, 0, 1, 385.53, 218)" filter="url(#tag-solid_1_)">
            <path id="tag-solid_1_2" data-name="tag-solid (1)" d="M53.834,0H14.348a1.2,1.2,0,0,0-.52.12c-.5.252-1.64.831-2.553,1.313C10.085,2.067,7.925,3.216,6.469,4,.127,7.384.4,7.22.127,7.92,0,8.259,0,8.39,0,15.314c0,4.835.023,7.121.081,7.263.162.47.647.853,2.033,1.586.716.383,1.975,1.05,2.807,1.488s1.848.984,2.276,1.225,1.19.634,1.7.908c2.183,1.192,3.882,2.133,4.609,2.516a1.516,1.516,0,0,0,.728.175H89.6a3.147,3.147,0,0,0,3.235-3.063V3.063A3.147,3.147,0,0,0,89.6,0H53.846ZM10.3,17.819A2.837,2.837,0,0,1,7.89,15.445a2.533,2.533,0,0,1,.1-1.017A2.929,2.929,0,0,1,11.483,12.6a2.885,2.885,0,0,1,1.409.853,2.63,2.63,0,0,1-.658,3.971,2.84,2.84,0,0,1-1.929.394Z" fill={fillColor}/>
          </g>
          <text id="En_Curso" data-name="En Curso" transform="translate(414.122 231.212)" fill="#fff" font-size="12" font-family="Encode Sans Condensed Thin" font-weight="600" alignment-baseline="middle" text-anchor="middle" x="26%" y="21%"><tspan>{text}</tspan></text>
        </g>
      </svg>
    </div>
  )
}

export default Badge
