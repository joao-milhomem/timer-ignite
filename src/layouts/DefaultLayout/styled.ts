import styled from 'styled-components'

export const DefaultLayoutContainer = styled.div`
  height: 100vh;
  display: grid;
  place-content: center;

  .content {
    width: 80vw;
    max-width: 1120px;
    padding: 2.5rem;

    display: grid;
    gap: 3rem;

    background-color: ${(props) => props.theme['gray-800']};
    border-radius: 8px;
  }
`
