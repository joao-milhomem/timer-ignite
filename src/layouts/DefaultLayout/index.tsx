import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'
import { DefaultLayoutContainer } from './styled'

export function DefaultLayout() {
  return (
    <DefaultLayoutContainer>
      <div className="content">
        <Header />
        <Outlet />
      </div>
    </DefaultLayoutContainer>
  )
}
