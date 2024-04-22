import { styled } from 'styled-components'

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  font-weight: 700;
  font-size: 1.125rem;

  input {
    flex: 1;
    padding-block: 0.25rem;

    font-size: 1.125rem;
    font-weight: 700;
    text-align: center;

    border-top: 2px solid transparent;
    color: ${(props) => props.theme.white};
    border-bottom: 2px solid ${(props) => props.theme['gray-400']};

    &:focus {
      outline: none;
    }

    &[type='number'] {
      max-width: 2.5rem;
    }
  }
`
