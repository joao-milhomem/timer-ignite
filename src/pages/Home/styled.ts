import styled from 'styled-components'

export const HomeContainer = styled.div`
  display: grid;
  place-content: center;

  > form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  font-weight: 700;
  font-size: 1.125rem;

  > input {
    border-bottom: 2px solid ${(props) => props.theme['gray-100']};
    color: ${(props) => props.theme['gray-100']};

    font-size: 1.125rem;
    font-weight: 700;
  }

  > input[type='text'] {
    display: block;
    width: max-content;
  }

  > input[type='number'] {
    width: 40px;
  }
`

export const TimerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  > span {
    font-size: 6rem;
    font-weight: 700;
    font-family: 'Roboto Mono', monospace;
    background-color: ${(props) => props.theme['gray-700']};
    border-radius: 8px;
    padding: 1.5rem 2rem;
  }
`

export const Separator = styled.small`
  color: ${(props) => props.theme['green-500']};
  background-color: none;

  font-size: 8rem;
  padding-inline: 0.5rem;
`

export const ButtonSubmit = styled.button`
  color: ${(props) => props.theme['gray-100']};
  background-color: ${(props) => props.theme['green-500']};
  border-radius: 8px;

  font-weight: 700;

  padding: 1rem;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`
