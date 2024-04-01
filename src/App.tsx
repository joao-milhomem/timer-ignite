import { BrowserRouter } from 'react-router-dom'
import { Router } from './routes'

import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './themes/defaultTheme'
import GlobalStyle from './styles/global'

export function App() {
  return (
    <BrowserRouter>
      <Router />
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
      </ThemeProvider>
    </BrowserRouter>
  )
}
