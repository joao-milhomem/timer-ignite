import { Play } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ButtonSubmit,
  HomeContainer,
  InputContainer,
  Separator,
  TimerContainer,
} from './styled'

const cycleFormSchema = zod.object({
  title: zod.string().min(1, 'Campo obrigatório.'),
  minutes: zod.number().min(1).max(60, 'Campo obrigatório.'),
})

type cycleFormInputs = zod.infer<typeof cycleFormSchema>

interface CycleProps {
  id: string
  title: string
  minutes: number
  isActive: boolean
}

export function Home() {
  const [cycles, setCycles] = useState<CycleProps[]>([])
  const [currentCycleID, setCurrentCycleID] = useState<string | null>(null)
  const [missedSeconds, setMissedSeconds] = useState<number>(0)

  const { register, handleSubmit, watch, reset } = useForm<cycleFormInputs>({
    resolver: zodResolver(cycleFormSchema),
    defaultValues: {
      title: '',
      minutes: 0,
    },
  })

  const titleInputValue = watch('title')
  const minutesInputValue = watch('minutes')

  const isSubmitDisable = titleInputValue && minutesInputValue

  const handleSubmitFn = (data: cycleFormInputs) => {
    const newCycle: CycleProps = {
      id: String(new Date().getTime()),
      title: data.title,
      minutes: data.minutes,
      isActive: true,
    }
    setCycles((prevCycles) => [...prevCycles, newCycle])
    setCurrentCycleID(newCycle.id)
    reset()
  }

  const currentCycle = cycles.find((cycle) => cycle.id === currentCycleID)

  const totalInSeconds = currentCycle ? currentCycle.minutes * 60 : 0
  const realTimeSeconds = currentCycle ? totalInSeconds - missedSeconds : 0

  const minutes = String(Math.floor(realTimeSeconds / 60)).padStart(2, '0')
  const seconds = String(realTimeSeconds % 60).padStart(2, '0')

  useEffect(() => {
    if (currentCycleID) {
      setInterval(() => {
        setMissedSeconds((prev) => prev + 1)
      }, 1000)
    }
  }, [currentCycleID])

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleSubmitFn)}>
        <InputContainer>
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

          <label htmlFor="minutes">durante</label>
          <input
            type="number"
            id="minutes"
            placeholder="00"
            step={5}
            min={1}
            // max={60}
            {...register('minutes', {
              valueAsNumber: true,
            })}
          />

          <span>minutos.</span>
        </InputContainer>

        <TimerContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </TimerContainer>

        <ButtonSubmit type="submit" disabled={!isSubmitDisable}>
          <Play size={'2rem'} />
          Começar
        </ButtonSubmit>
      </form>
    </HomeContainer>
  )
}
