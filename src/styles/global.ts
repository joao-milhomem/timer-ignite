import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`

  :root{
    font-size: 16px;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${(props) => props.theme['gray-900']};
    color:  ${(props) => props.theme['gray-100']};
    font-size:1rem;
    font-family: "Roboto", sans-serif;
  }
  
  a {
    text-decoration: none;
  }

  button , input, select , textarea {
    font-family: "Roboto", sans-serif;
    background: transparent;
    border: none;
  }
`
