import { ReactNode, createContext, useReducer } from 'react'
import { ActionTypes, StateCycleReducer } from '../reduces/StateCycleReducer'

export interface CycleProps {
  id: string
  title: string
  minutes: number
  isActive: boolean
  startDate: Date
  endDate?: Date
  shutDownDate?: Date
}

interface CycleFormData {
  title: string
  minutes: number
}

interface CycleContextProps {
  cycles: CycleProps[]
  createNewCycle: (data: CycleFormData) => void
  handleStopCycle: () => void
  setCycleAsComplete: () => void
  currentCycleId: string | undefined
  currentCycle: CycleProps | undefined
}

interface CycleContextContent {
  children: ReactNode
}

export const CycleContext = createContext({} as CycleContextProps)

export function CycleContextProvider({ children }: CycleContextContent) {
  const [stateCycles, dispatch] = useReducer(StateCycleReducer, {
    cycles: [],
    currentCycleId: undefined,
  })

  const { cycles, currentCycleId } = stateCycles

  const currentCycle = cycles.find(
    (cycle: CycleProps) => cycle.id === currentCycleId,
  )

  function createNewCycle(data: CycleFormData) {
    const newCycleID = String(new Date().getTime())

    const newCycle: CycleProps = {
      id: newCycleID,
      title: data.title,
      minutes: data.minutes,
      isActive: true,
      startDate: new Date(),
    }

    dispatch({
      type: ActionTypes.CREATE_NEW_CYCLE,
      payload: newCycle,
    })
  }

  function handleStopCycle() {
    currentCycle &&
      dispatch({
        type: ActionTypes.SHUTDOWN_CYCLE,
        payload: currentCycle,
      })
  }

  function setCycleAsComplete() {
    currentCycle &&
      dispatch({
        type: ActionTypes.COMPLETE_CYCLE,
        payload: currentCycle,
      })
  }

  return (
    <CycleContext.Provider
      value={{
        cycles,
        currentCycle,
        currentCycleId,
        createNewCycle,
        handleStopCycle,
        setCycleAsComplete,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
