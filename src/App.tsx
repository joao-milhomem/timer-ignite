import { BrowserRouter } from 'react-router-dom'
import { Router } from './routes'

import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './themes/defaultTheme'
import GlobalStyle from './styles/global'
import { CycleContextProvider } from './contexts/CycleContextProvider'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <BrowserRouter>
        <CycleContextProvider>
          <Router />
        </CycleContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}
