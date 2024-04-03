import { NavLink } from 'react-router-dom'
import { HeaderContainer } from './styled'
import { ClockCounterClockwise, Timer } from '@phosphor-icons/react'
import { Logo } from '../../assets/Logo'

export function Header() {
  return (
    <HeaderContainer>
      <Logo />

      <nav>
        <NavLink to="/" title="timer">
          <Timer size="2rem" />
        </NavLink>

        <NavLink to="/history" title="history">
          <ClockCounterClockwise size="2rem" />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
