import { HandPalm, Play } from '@phosphor-icons/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { differenceInSeconds } from 'date-fns'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import {
  ButtonSubmit,
  HomeContainer,
  InputContainer,
  Separator,
  StopButton,
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
  startDate: Date
  endDate?: Date
}

export function Home() {
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

  const [cycles, setCycles] = useState<CycleProps[]>([])
  const [currentCycleId, setcurrentCycleId] = useState<string | undefined>()
  const [missedSeconds, setMissedSeconds] = useState<number>(0)

  const handleSubmitFn = (data: cycleFormInputs) => {
    const newCycleID = String(new Date().getTime())
    setcurrentCycleId(newCycleID)

    const newCycle: CycleProps = {
      id: newCycleID,
      title: data.title,
      minutes: data.minutes,
      isActive: true,
      startDate: new Date(),
    }

    setCycles((prevCycles) => [...prevCycles, newCycle])
    reset()
  }

  const handleStopCycle = () => {
    const currentCycles = cycles.map((cycle) => {
      if (cycle.id === currentCycleId) {
        return {
          ...cycle,
          isActive: false,
          endDate: new Date(),
        }
      } else {
        return cycle
      }
    })
    setCycles(currentCycles)
    setcurrentCycleId(undefined)
    setMissedSeconds(0)
  }

  const currentCycle = cycles.find((cycle) => cycle.id === currentCycleId)

  const fullSeconds = currentCycle ? currentCycle.minutes * 60 : 0
  const secondsLeft = currentCycle ? fullSeconds - missedSeconds : 0

  const minutes = currentCycle ? Math.floor(secondsLeft / 60) : 0
  const seconds = currentCycle ? secondsLeft % 60 : 0

  const minutesToDisplay = String(minutes).padStart(2, '0')
  const secondsToDisplay = String(seconds).padStart(2, '0')

  useEffect(() => {
    let cycleInterval: number

    if (currentCycle) {
      cycleInterval = setInterval(() => {
        const timer = differenceInSeconds(new Date(), currentCycle.startDate)

        if (timer >= fullSeconds) {
          setCycles((prevCycles) => {
            return prevCycles.map((cycle) => {
              if (cycle.id === currentCycle.id) {
                return {
                  ...cycle,
                  isActive: false,
                  endDate: new Date(),
                }
              } else {
                return cycle
              }
            })
          })
          setcurrentCycleId(undefined)
          setMissedSeconds(fullSeconds)
          clearInterval(cycleInterval)
        } else {
          setMissedSeconds(timer)
        }
      }, 1000)
    }

    return () => clearInterval(cycleInterval)
  }, [currentCycle, fullSeconds])

  useEffect(() => {
    if (currentCycleId) {
      document.title = `${minutesToDisplay}:${secondsToDisplay}`
    } else {
      document.title = '00:00'
    }
  }, [minutesToDisplay, secondsToDisplay, currentCycleId])

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

        <TimerContainer>
          <span>{minutesToDisplay[0]}</span>
          <span>{minutesToDisplay[1]}</span>
          <Separator>:</Separator>
          <span>{secondsToDisplay[0]}</span>
          <span>{secondsToDisplay[1]}</span>
        </TimerContainer>

        {currentCycleId ? (
          <StopButton type="button" onClick={handleStopCycle}>
            <HandPalm size={'2rem'} />
            Interromper
          </StopButton>
        ) : (
          <ButtonSubmit type="submit" disabled={!isSubmitDisable}>
            <Play size={'2rem'} />
            Começar
          </ButtonSubmit>
        )}
      </form>
    </HomeContainer>
  )
}
