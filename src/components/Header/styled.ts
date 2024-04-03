import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > img {
    height: 2rem;
    width: 2rem;
  }

  > nav {
    display: flex;
    gap: 0.5rem;

    a {
      width: 3rem;
      height: 3rem;

      display: grid;
      place-content: center;

      color: ${(props) => props.theme.white};
      border-top: 2px solid transparent;
      border-bottom: 2px solid transparent;

      &.active {
        color: ${(props) => props.theme['green-500']};
        border-bottom: 2px solid ${(props) => props.theme['green-500']};
      }
    }
  }
`
