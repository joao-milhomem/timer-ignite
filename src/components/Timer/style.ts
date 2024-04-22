import { styled } from 'styled-components'

export const TimerContainer = styled.div`
  display: flex;
  justify-content: space-between;

  font-size: 10rem;
  font-weight: 700;
  font-family: 'Roboto Mono', monospace;

  > span {
    padding-inline: 1rem;

    background-color: ${(props) => props.theme['gray-700']};
    border-radius: 8px;
  }
`

export const Separator = styled.small`
  color: ${(props) => props.theme['green-500']};
  background-color: none;
`
