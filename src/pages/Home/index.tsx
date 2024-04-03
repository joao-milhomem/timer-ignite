import { Play } from '@phosphor-icons/react'
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
          <>
            <label htmlFor="title">Vou trabalhar em</label>
            <input
              type="text"
              id="title"
              placeholder="De um nome para o seu projeto"
              list="task-suggestions"
            />

            <datalist id="task-suggestions">
              <option value="Projeto 1" />
              <option value="Projeto 2" />
              <option value="Projeto 3" />
            </datalist>
          </>

          <>
            <label htmlFor="minutes">durante</label>
            <input
              type="number"
              id="minutes"
              placeholder="00"
              step={5}
              min={5}
              max={60}
            />
          </>

          <span>minutos.</span>
        </InputContainer>

        <TimerContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </TimerContainer>

        <ButtonSubmit type="submit" disabled>
          <Play size={'2rem'} />
          Começar
        </ButtonSubmit>
      </form>
    </HomeContainer>
  )
}
