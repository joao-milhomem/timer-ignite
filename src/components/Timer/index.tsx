import { useContext, useEffect, useState } from 'react'
import { Separator, TimerContainer } from './style'

import { differenceInSeconds } from 'date-fns'
import { CycleContext } from '../../contexts/CycleContextProvider'

export function Timer() {
  const { cycles, setCycleAsComplete, currentCycle } = useContext(CycleContext)

  const [missedSeconds, setMissedSeconds] = useState<number>(0)

  const totalSeconds = currentCycle ? currentCycle.minutes * 60 : 0
  const secondsLeft = currentCycle ? totalSeconds - missedSeconds : 0

  const minutes = currentCycle ? Math.floor(secondsLeft / 60) : 0
  const seconds = currentCycle ? secondsLeft % 60 : 0

  const minutesToDisplay = String(minutes).padStart(2, '0')
  const secondsToDisplay = String(seconds).padStart(2, '0')

  useEffect(() => {
    let cycleInterval: number
    setMissedSeconds(0)

    if (currentCycle) {
      cycleInterval = setInterval(() => {
        const timer = differenceInSeconds(new Date(), currentCycle.startDate)

        if (timer >= totalSeconds) {
          const currentCycles = cycles.map((cycle) => {
            if (cycle.id === currentCycle.id) {
              return {
                ...cycle,
                isActive: false,
                endDate: new Date(),
              }
            } else {
              return cycle
            }
          })
          setCycleAsComplete(currentCycles)
        } else {
          setMissedSeconds(timer)
        }
      }, 1000)
    }

    return () => clearInterval(cycleInterval)
  }, [currentCycle, totalSeconds, cycles, setCycleAsComplete])

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
