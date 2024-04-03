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

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  font-weight: 700;
  font-size: 1.125rem;

  input {
    padding-block: 0.25rem;

    font-size: 1.125rem;
    font-weight: 700;
    text-align: center;
    border-top: 2px solid transparent;
    color: ${(props) => props.theme.white};
    border-bottom: 2px solid ${(props) => props.theme['gray-400']};
    flex: 1;
  }

  input[type='number'] {
    max-width: 2.5rem;
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

export const ButtonSubmit = styled.button`
  background-color: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme.white};
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
