import { ReactNode, createContext, useEffect, useReducer } from 'react'
import { cyclesReducer } from '../reducers/cycles/reducer'
import {
  createNewCycleAction,
  setCycleAsCompleteAction,
  shutDownCicleAction,
} from '../reducers/cycles/actions'

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
  const [stateCycles, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      currentCycleId: undefined,
    },
    (initialStateCyles) => {
      const cyclesOnStorage = localStorage.getItem(
        '@ignite-timer:state-cyles-1.0.0:',
      )

      if (cyclesOnStorage) {
        return JSON.parse(cyclesOnStorage)
      }

      return initialStateCyles
    },
  )

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

    dispatch(createNewCycleAction(newCycle))
  }

  function handleStopCycle() {
    dispatch(shutDownCicleAction())
  }

  function setCycleAsComplete() {
    dispatch(setCycleAsCompleteAction())
  }

  useEffect(() => {
    const stateCylesToJson = JSON.stringify(stateCycles)
    localStorage.setItem('@ignite-timer:state-cyles-1.0.0:', stateCylesToJson)
  }, [stateCycles])

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
