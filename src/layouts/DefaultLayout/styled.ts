import styled from 'styled-components'

export const DefaultLayoutContainer = styled.div`
  height: 100vh;

  display: grid;
  place-content: center;

  .content {
    height: 80vh;
    width: 70vw;
    max-width: 1120px;
    padding: 2.5rem;

    display: flex;
    flex-direction: column;
    gap: 2rem;

    background-color: ${(props) => props.theme['gray-800']};
    border-radius: 8px;
  }
`
