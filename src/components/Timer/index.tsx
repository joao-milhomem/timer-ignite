import { useContext, useEffect } from 'react'
import { Separator, TimerContainer } from './style'
import { CycleContext } from '../../pages/Home'
import { differenceInSeconds } from 'date-fns'

export function Timer() {
  const { currentCycle, missedSeconds, handleStopCycle, addMissedSecond } =
    useContext(CycleContext)

  const totalSeconds = currentCycle ? currentCycle.minutes * 60 : 0
  const secondsLeft = currentCycle ? totalSeconds - missedSeconds : 0

  const minutes = currentCycle ? Math.floor(secondsLeft / 60) : 0
  const seconds = currentCycle ? secondsLeft % 60 : 0

  const minutesToDisplay = String(minutes).padStart(2, '0')
  const secondsToDisplay = String(seconds).padStart(2, '0')

  useEffect(() => {
    let cycleInterval: number

    if (currentCycle) {
      cycleInterval = setInterval(() => {
        const timer = differenceInSeconds(new Date(), currentCycle.startDate)

        if (timer >= totalSeconds) {
          handleStopCycle()
        } else {
          addMissedSecond(timer)
        }
      }, 1000)
    }

    return () => clearInterval(cycleInterval)
  }, [currentCycle, totalSeconds, handleStopCycle, addMissedSecond])

  useEffect(() => {
    if (currentCycle) {
      document.title = `${minutesToDisplay}:${secondsToDisplay}`
    } else {
      document.title = '00:00'
    }
  }, [minutesToDisplay, secondsToDisplay, currentCycle])
  return (
    <TimerContainer>
      <span>{minutesToDisplay[0]}</span>
      <span>{minutesToDisplay[1]}</span>
      <Separator>:</Separator>
      <span>{secondsToDisplay[0]}</span>
      <span>{secondsToDisplay[1]}</span>
    </TimerContainer>
  )
}
