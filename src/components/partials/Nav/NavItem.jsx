import { NavLink } from 'react-router-dom'

const NavItem = ({ to, icon, texto }) => {
  return (
        <NavLink to={to}>
            <i className={icon}></i>
            {texto}
        </NavLink>
  )
}

export default NavItem
