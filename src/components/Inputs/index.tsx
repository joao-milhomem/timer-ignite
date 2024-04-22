import { useFormContext } from 'react-hook-form'
import { CycleContext } from '../../pages/Home'
import { InputContainer } from './style'
import { useContext } from 'react'

export function Inputs() {
  const { register } = useFormContext()
  const { currentCycle } = useContext(CycleContext)

  return (
    <InputContainer>
      <label htmlFor="title">Vou trabalhar em</label>
      <input
        type="text"
        id="title"
        placeholder="De um nome para o seu projeto"
        list="task-suggestions"
        disabled={!!currentCycle}
        {...register('title')}
      />

      <datalist id="task-suggestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
      </datalist>

      <label htmlFor="minutes">durante</label>
      <input
        type="number"
        id="minutes"
        placeholder="00"
        disabled={!!currentCycle}
        step={5}
        min={1}
        max={60}
        {...register('minutes', {
          valueAsNumber: true,
        })}
      />

      <span>minutos.</span>
    </InputContainer>
  )
}
