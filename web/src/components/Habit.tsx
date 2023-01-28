// DEPENDENCY
import React from 'react'

// TYPE
interface HabitProps {
  completed: number
}

export function Habit({ completed }: HabitProps): JSX.Element {
  return (
    <div
      className='
        bg-zinc-900 rounded
        w-10 h-10 m-2
        text-white
        flex items-center justify-center
      '
    >
      {completed}
    </div>
  )
}
