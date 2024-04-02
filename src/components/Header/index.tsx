import { NavLink } from 'react-router-dom'
import { HeaderContainer } from './styled'
import igniteLogo from '../../assets/logo.svg'

export function Header() {
  return (
    <HeaderContainer>
      <img src={igniteLogo} alt="" />

      <nav>
        <NavLink to="/">link1</NavLink>
        <NavLink to="/history">history</NavLink>
      </nav>
    </HeaderContainer>
  )
}
