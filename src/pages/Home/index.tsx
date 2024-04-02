import {
  ButtonSubmit,
  HomeContainer,
  InputContainer,
  Separator,
  TimerContainer,
} from './styled'

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <InputContainer>
          <label htmlFor="">Vou trabalhar em</label>
          <input type="text" />

          <label htmlFor="">durante</label>
          <input type="number" />
          <span>minutos.</span>
        </InputContainer>

        <TimerContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </TimerContainer>

        <ButtonSubmit type="submit">Começar</ButtonSubmit>
      </form>
    </HomeContainer>
  )
}
