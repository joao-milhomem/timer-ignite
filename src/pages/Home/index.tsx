import { ButtonSubmit, HomeContainer, StopButton } from './styled'
import { FormProvider, useForm } from 'react-hook-form'
import { HandPalm, Play } from '@phosphor-icons/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Inputs } from '../../components/Inputs'
import { useContext } from 'react'
import { Timer } from '../../components/Timer'
import * as zod from 'zod'
import { CycleContext } from '../../contexts/CycleContextProvider'

const cycleFormSchema = zod.object({
  title: zod.string().min(1, 'Campo obrigatório.'),
  minutes: zod.number().min(1).max(60, 'Campo obrigatório.'),
})

type cycleFormInputs = zod.infer<typeof cycleFormSchema>

export function Home() {
  const { currentCycleId, createNewCycle, handleStopCycle } =
    useContext(CycleContext)

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

  function handleCreateNewCycle(data: cycleFormInputs) {
    createNewCycle(data)
    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
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
  )
}
