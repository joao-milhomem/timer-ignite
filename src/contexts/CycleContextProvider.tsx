import { ReactNode, createContext, useReducer } from 'react'

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
  createNewCycle: (data: CycleFormData) => void
  handleStopCycle: () => void
  setCycleAsComplete: () => void
  currentCycleId: string | undefined
  currentCycle: CycleProps | undefined
}

interface CycleContextContent {
  children: ReactNode
}

interface StateCyclesProps {
  cycles: CycleProps[]
  currentCycleId: string | undefined
}

interface ActionProps {
  type: string
  payload: CycleProps
}

export const CycleContext = createContext({} as CycleContextProps)

export function CycleContextProvider({ children }: CycleContextContent) {
  // const [cycles, setCycles] = useState<CycleProps[]>([])

  const [stateCycles, dispatch] = useReducer(
    (state: StateCyclesProps, action: ActionProps) => {
      if (action.type === 'CREATE_NEW_CYCLE') {
        return {
          cycles: [...state.cycles, action.payload],
          currentCycleId: action.payload.id,
        }
      }

      if (action.type === 'SHUTDOWN_CYCLE') {
        // if (action.payload.id === state.currentCycleId) {
        return {
          cycles: state.cycles.map((cycle) => {
            if (cycle.id === action.payload.id) {
              return {
                ...cycle,
                isActive: false,
                shutDownDate: new Date(),
              }
            }
            return cycle
          }),
          currentCycleId: undefined,
        }
        // }
      }

      if (action.type === 'COMPLETE_CYCLE') {
        return {
          cycles: state.cycles.map((cycle) => {
            if (cycle.id === action.payload.id) {
              return {
                ...cycle,
                isActive: false,
                endDate: new Date(),
              }
            }
            return cycle
          }),
          currentCycleId: undefined,
        }
      }
      return state
    },
    {
      cycles: [],
      currentCycleId: undefined,
    },
  )
  const { cycles, currentCycleId } = stateCycles

  // const [currentCycleId, setcurrentCycleId] = useState<string | undefined>()
  const currentCycle = cycles.find(
    (cycle: CycleProps) => cycle.id === currentCycleId,
  )

  function createNewCycle(data: CycleFormData) {
    const newCycleID = String(new Date().getTime())
    // setcurrentCycleId(newCycleID)

    const newCycle: CycleProps = {
      id: newCycleID,
      title: data.title,
      minutes: data.minutes,
      isActive: true,
      startDate: new Date(),
    }

    dispatch({
      type: 'CREATE_NEW_CYCLE',
      payload: newCycle,
    })

    // setCycles((prevCycles) => [...prevCycles, newCycle])
    // reset()
  }

  function handleStopCycle() {
    currentCycle &&
      dispatch({
        type: 'SHUTDOWN_CYCLE',
        payload: currentCycle,
      })
    // const currentCycles = cycles.map((cycle) => {
    //   if (cycle.id === currentCycleId) {
    //     return {
    //       ...cycle,
    //       isActive: false,
    //       shutDownDate: new Date(),
    //     }
    //   } else {
    //     return cycle
    //   }
    // })
    // setCycles(currentCycles)
    // setcurrentCycleId(undefined)
  }

  function setCycleAsComplete() {
    currentCycle &&
      dispatch({
        type: 'COMPLETE_CYCLE',
        payload: currentCycle,
      })
    // setCycles(newCycles)
    // setcurrentCycleId(undefined)
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
