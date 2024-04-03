import { Play } from '@phosphor-icons/react'
import {
  ButtonSubmit,
  HomeContainer,
  InputContainer,
  Separator,
  TimerContainer,
} from './styled'
import { useForm } from 'react-hook-form'

export function Home() {
  const { register, handleSubmit, watch } = useForm()

  const title = watch('title')
  const isSubmitDisable = title

  const handleSubmitFn = (data: unknown) => {
    console.log(data)
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleSubmitFn)}>
        <InputContainer>
          <>
            <label htmlFor="title">Vou trabalhar em</label>
            <input
              type="text"
              id="title"
              placeholder="De um nome para o seu projeto"
              list="task-suggestions"
              {...register('title')}
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
              {...register('minutes')}
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

        <ButtonSubmit type="submit" disabled={!isSubmitDisable}>
          <Play size={'2rem'} />
          Começar
        </ButtonSubmit>
      </form>
    </HomeContainer>
  )
}
