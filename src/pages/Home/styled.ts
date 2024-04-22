import styled from 'styled-components'

export const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;

  > form {
    height: 100%;
    min-width: 648px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`

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
export const ButtonProto = styled.button`
  border-radius: 8px;
  cursor: pointer;

  font-weight: 700;
  font-size: 1rem;

  width: 100%;
  padding: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    filter: brightness(0.9);
  }
`

export const ButtonSubmit = styled(ButtonProto)`
  background-color: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme.white};

  &:disabled {
    filter: opacity(0.5);
    cursor: not-allowed;
  }
`

export const StopButton = styled(ButtonProto)`
  background-color: ${(props) => props.theme['red-500']};
  color: ${(props) => props.theme.white};
`
