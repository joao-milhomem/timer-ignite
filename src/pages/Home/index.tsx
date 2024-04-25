import { ButtonSubmit, HomeContainer, StopButton } from './styled'
import { FormProvider, useForm } from 'react-hook-form'
import { HandPalm, Play } from '@phosphor-icons/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Inputs } from '../../components/Inputs'
import { /* createContext */ useContext /* useState */ } from 'react'
import { Timer } from '../../components/Timer'
import * as zod from 'zod'
import { CycleContext } from '../../contexts/CycleContextProvider'

const cycleFormSchema = zod.object({
  title: zod.string().min(1, 'Campo obrigatório.'),
  minutes: zod.number().min(1).max(60, 'Campo obrigatório.'),
})

type cycleFormInputs = zod.infer<typeof cycleFormSchema>

// interface CycleProps {
//   id: string
//   title: string
//   minutes: number
//   isActive: boolean
//   startDate: Date
//   endDate?: Date
//   shutDownDate?: Date
// }

// interface CycleContextProps {
//   cycles: CycleProps[]
//   currentCycleId: string | undefined
//   setCycleAsComplete: (cyles: CycleProps[]) => void
// }

// export const CycleContext = createContext({} as CycleContextProps)

export function Home() {
  const { cycles, currentCycleId, handleStartCycle, handleStopCycle } =
    useContext(CycleContext)

  console.log(cycles)

  const newHookForm = useForm<cycleFormInputs>({
    resolver: zodResolver(cycleFormSchema),
    defaultValues: {
      title: '',
      minutes: 0,
    },
  })

  const { handleSubmit, watch } = newHookForm

  const titleInputValue = watch('title')
  const minutesInputValue = watch('minutes')
  const isSubmitDisable = titleInputValue && minutesInputValue

  // const [cycles, setCycles] = useState<CycleProps[]>([])
  // const [currentCycleId, setcurrentCycleId] = useState<string | undefined>()

  // function handleStartCycle(data: cycleFormInputs) {
  //   const newCycleID = String(new Date().getTime())
  //   setcurrentCycleId(newCycleID)

  //   const newCycle: CycleProps = {
  //     id: newCycleID,
  //     title: data.title,
  //     minutes: data.minutes,
  //     isActive: true,
  //     startDate: new Date(),
  //   }

  //   setCycles((prevCycles) => [...prevCycles, newCycle])
  //   reset()
  // }

  // function handleStopCycle() {
  //   const currentCycles = cycles.map((cycle) => {
  //     if (cycle.id === currentCycleId) {
  //       return {
  //         ...cycle,
  //         isActive: false,
  //         shutDownDate: new Date(),
  //       }
  //     } else {
  //       return cycle
  //     }
  //   })
  //   setCycles(currentCycles)
  //   setcurrentCycleId(undefined)
  // }

  // function setCycleAsComplete(newCycles: CycleProps[]) {
  //   setCycles(newCycles)
  //   setcurrentCycleId(undefined)
  // }

  return (
    // <CycleContext.Provider
    //   value={{ currentCycleId, cycles, setCycleAsComplete }}
    // >
    <HomeContainer>
      <form onSubmit={handleSubmit(handleStartCycle)}>
        <FormProvider {...newHookForm}>
          <Inputs />
        </FormProvider>

        <Timer />

        {currentCycleId ? (
          <StopButton type="button" onClick={() => handleStopCycle()}>
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
    // </CycleContext.Provider>
  )
}
