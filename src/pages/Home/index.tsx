import { HandPalm, Play } from '@phosphor-icons/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { createContext, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'
import {
  ButtonSubmit,
  HomeContainer,
  // InputContainer,
  // Separator,
  StopButton,
  // TimerContainer,
} from './styled'
import { Inputs } from '../../components/Inputs'
import { Timer } from '../../components/Timer'

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

interface CycleContextProps {
  currentCycle: CycleProps | undefined
  missedSeconds: number
  handleStopCycle: () => void
  addMissedSecond: (time: number) => void
}

export const CycleContext = createContext({} as CycleContextProps)

export function Home() {
  const newHookForm = useForm<cycleFormInputs>({
    resolver: zodResolver(cycleFormSchema),
    defaultValues: {
      title: '',
      minutes: 0,
    },
  })

  const { handleSubmit, watch, reset } = newHookForm

  const titleInputValue = watch('title')
  const minutesInputValue = watch('minutes')
  const isSubmitDisable = titleInputValue && minutesInputValue

  const [cycles, setCycles] = useState<CycleProps[]>([])
  const [currentCycleId, setcurrentCycleId] = useState<string | undefined>()
  const [missedSeconds, setMissedSeconds] = useState<number>(0)

  function handleStartCycle(data: cycleFormInputs) {
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

  function handleStopCycle() {
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

  function addMissedSecond(time: number) {
    setMissedSeconds(time)
  }

  const currentCycle = cycles.find((cycle) => cycle.id === currentCycleId)

  return (
    <CycleContext.Provider
      value={{ currentCycle, missedSeconds, handleStopCycle, addMissedSecond }}
    >
      <HomeContainer>
        <form onSubmit={handleSubmit(handleStartCycle)}>
          <FormProvider {...newHookForm}>
            <Inputs />
          </FormProvider>

          <Timer />

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
    </CycleContext.Provider>
  )
}
