import { CycleProps } from '../../contexts/CycleContextProvider'
import { ActionTypes } from './reducer'

export function createNewCycleAction(newCycle: CycleProps) {
  return {
    type: ActionTypes.CREATE_NEW_CYCLE,
    payload: newCycle,
  }
}

export function shutDownCicleAction() {
  return {
    type: ActionTypes.SHUTDOWN_CYCLE,
  }
}

export function setCycleAsCompleteAction() {
  return {
    type: ActionTypes.COMPLETE_CYCLE,
  }
}
