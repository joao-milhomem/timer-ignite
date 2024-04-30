/* eslint-disable @typescript-eslint/no-explicit-any */
import { produce } from 'immer'
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

export function cyclesReducer(state: StateCyclesProps, action: any) {
  switch (action.type) {
    case ActionTypes.CREATE_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload)
        draft.currentCycleId = action.payload.id
      })

    case ActionTypes.SHUTDOWN_CYCLE:
      return produce(state, (draft) => {
        const cycleToBeFinished = draft.cycles.find(
          (cycle) => cycle.id === state.currentCycleId,
        )

        if (cycleToBeFinished) {
          cycleToBeFinished.isActive = false
          cycleToBeFinished.shutDownDate = new Date()
          draft.currentCycleId = undefined
        }
      })

    case ActionTypes.COMPLETE_CYCLE:
      return produce(state, (draft) => {
        const cycleCompleted = draft.cycles.find(
          (cycle) => cycle.id === state.currentCycleId,
        )

        if (cycleCompleted) {
          cycleCompleted.isActive = false
          cycleCompleted.endDate = new Date()
          draft.currentCycleId = undefined
        }
      })

    default:
      return state
  }
}
