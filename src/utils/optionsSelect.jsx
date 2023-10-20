import { areas } from '../constantes/constAreas'

export const OptionsSelect = ({ user }) => {
  const rolSelect = user.rolUsuario === 'ADMIN' ? ['admin', 'editor', 'Lector'] : ['editor', 'Lector']
  const { COMPUTOS, TELEFONIA, SOPORTES, SISTEMAS, GDE } = areas
  const optionListSede = ['9 de Julio', 'Av. de Mayo', 'Moreno']

  const sectorOptions = {
    [COMPUTOS]: {
      optionListArea: ['computos'],
      optionListPerfil: ['tecnico'],
      optionListRol: rolSelect
    },
    [TELEFONIA]: {
      optionListArea: ['telefonia'],
      optionListPerfil: ['tecnico'],
      optionListRol: rolSelect
    },
    [SOPORTES]: {
      optionListArea: ['soportes'],
      optionListPerfil: ['tecnico'],
      optionListRol: rolSelect
    },
    [SISTEMAS]: {
      optionListArea: ['sistemas'],
      optionListPerfil: ['tecnico'],
      optionListRol: rolSelect
    },
    [GDE]: {
      optionListArea: ['gde'],
      optionListPerfil: ['administrativo'],
      optionListRol: rolSelect
    },
    default: {
      optionListArea: ['soportes', 'telefonia', 'computos', 'sistemas', 'gde'],
      optionListPerfil: ['administrativo', 'tecnico', 'administrador', 'superadmin'],
      optionListRol: ['admin', 'editor', 'Lector']
    }
  }
  console.log(user.sector, COMPUTOS)
  const { optionListArea, optionListPerfil, optionListRol } = sectorOptions[user.sector] || sectorOptions.default
  // Return an array of options
  console.log('salida', optionListArea, optionListPerfil, optionListRol, optionListSede, user.sector)

  return [optionListArea, optionListPerfil, optionListRol, optionListSede]
}
