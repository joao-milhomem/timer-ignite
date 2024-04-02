import styled from 'styled-components'

export const HomeContainer = styled.div`
  display: grid;
  place-content: center;

  > form {
    display: grid;
    gap: 2.5rem;
  }
`

export const InputContainer = styled.div`
  display: flex;
  align-items: center;

  font-weight: 700;
  font-size: 1.125rem;

  input {
    border-top: 2px solid transparent;
    border-bottom: 2px solid ${(props) => props.theme['gray-100']};
    color: ${(props) => props.theme['gray-100']};

    font-size: 1.125rem;
    font-weight: 700;

    padding: 0.75rem 0.5rem;
  }

  input[type='number'] {
    max-width: 4.5rem;
    text-align: center;
  }
`

export const TimerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > span {
    font-size: 6rem;
    font-weight: 700;
    font-family: 'Roboto Mono', monospace;

    background-color: ${(props) => props.theme['gray-700']};
    border-radius: 8px;
    padding: 2.5rem 1.5rem;
  }
`

export const Separator = styled.small`
  color: ${(props) => props.theme['green-500']};
  background-color: none;
  font-size: 10rem;
`

export const ButtonSubmit = styled.button`
  background-color: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme['gray-100']};
  border-radius: 8px;
  cursor: pointer;

  font-weight: 700;

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
