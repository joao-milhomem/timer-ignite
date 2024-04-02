import styled from 'styled-components'

export const DefaultLayoutContainer = styled.div`
  background-color: ${(props) => props.theme['gray-800']};
  border-radius: 8px;

  max-width: 74rem;
  margin-inline: auto;

  height: calc(100vh - 10rem);
  margin-block: 5rem;

  padding: 3.5rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
