/* eslint-disable @typescript-eslint/no-explicit-any */
import { CycleProps } from '../../contexts/CycleContextProvider'

interface StateCyclesProps {
  cycles: CycleProps[]
  currentCycleId: string | undefined
}

export enum ActionTypes {
  CREATE_NEW_CYCLE = 'CREATE_NEW_CYCLE',
  SHUTDOWN_CYCLE = 'SHUTDOWN_CYCLE',
  COMPLETE_CYCLE = 'COMPLETE_CYCLE',
}

// interface ActionProps {
//   type: ActionTypes
//   payload: CycleProps
// }

export function cyclesReducer(state: StateCyclesProps, action: any) {
  switch (action.type) {
    case ActionTypes.CREATE_NEW_CYCLE:
      return {
        cycles: [...state.cycles, action.payload],
        currentCycleId: action.payload.id,
      }

    case ActionTypes.SHUTDOWN_CYCLE:
      return {
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.currentCycleId) {
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

    case ActionTypes.COMPLETE_CYCLE:
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

    default:
      return state
  }
}
