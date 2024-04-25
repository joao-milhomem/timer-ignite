import { ReactNode, createContext, useState } from 'react'

interface CycleProps {
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
  handleStartCycle: (data: CycleFormData) => void
  handleStopCycle: () => void
  setCycleAsComplete: (newCyles: CycleProps[]) => void
  currentCycleId: string | undefined
  currentCycle: CycleProps | undefined
  //   currentCycleId: string | undefined
  //   setCycleAsComplete: (cyles: CycleProps[]) => void
}

interface CycleContextContent {
  children: ReactNode
}

export const CycleContext = createContext({} as CycleContextProps)

export function CycleContextProvider({ children }: CycleContextContent) {
  const [cycles, setCycles] = useState<CycleProps[]>([])
  const [currentCycleId, setcurrentCycleId] = useState<string | undefined>()
  const currentCycle = cycles.find((cycle) => cycle.id === currentCycleId)

  function handleStartCycle(data: CycleFormData) {
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
    // reset()
  }

  function handleStopCycle() {
    const currentCycles = cycles.map((cycle) => {
      if (cycle.id === currentCycleId) {
        return {
          ...cycle,
          isActive: false,
          shutDownDate: new Date(),
        }
      } else {
        return cycle
      }
    })
    setCycles(currentCycles)
    setcurrentCycleId(undefined)
  }

  function setCycleAsComplete(newCycles: CycleProps[]) {
    setCycles(newCycles)
    setcurrentCycleId(undefined)
  }
  return (
    <CycleContext.Provider
      value={{
        cycles,
        currentCycle,
        currentCycleId,
        handleStartCycle,
        handleStopCycle,
        setCycleAsComplete,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
