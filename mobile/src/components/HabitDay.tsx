// DEPENDENCY
import clsx from 'clsx'
import dayjs from 'dayjs'

// COMPONENT
import {
  TouchableOpacity,
  Dimensions,
  TouchableOpacityProps,
} from 'react-native'

// UTIL
import { generateProgressPercentage } from '../utils/generate-progress-percentage'

// TYPE
interface HabitDayProps extends TouchableOpacityProps {
  amount?: number
  completed?: number
  date: Date
}

const WEEK_DAYS = 7
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5

export const DAY_MARGIN_BETWEEN = 8
export const DAY_SIZE =
  Dimensions.get('screen').width / WEEK_DAYS - (SCREEN_HORIZONTAL_PADDING + 5)

export function HabitDay({
  amount = 0,
  completed = 0,
  date,
  ...props
}: HabitDayProps): JSX.Element {
  const completedPercentage =
    amount > 0 ? generateProgressPercentage(amount, completed) : 0

  const today = dayjs().startOf('day').toDate()
  const isCurrentDay = dayjs(date).isSame(today)

  return (
    <TouchableOpacity
      className={clsx(`bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800`, {
        'bg-zinc-900 border-zinc-800': completedPercentage === 0,
        'bg-violet-900 border-violet-700':
          completedPercentage > 0 && completedPercentage < 20,
        'bg-violet-800 border-violet-600':
          completedPercentage >= 20 && completedPercentage < 40,
        'bg-violet-700 border-violet-500':
          completedPercentage >= 40 && completedPercentage < 60,
        'bg-violet-600 border-violet-500':
          completedPercentage >= 60 && completedPercentage < 80,
        'bg-violet-500 border-violet-400': completedPercentage >= 80,
        'border-white border-2': isCurrentDay,
      })}
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      activeOpacity={0.7}
      {...props}
    />
  )
}
