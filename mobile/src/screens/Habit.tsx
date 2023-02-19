// DEPENDENCY
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { useRoute } from '@react-navigation/native'
import clsx from 'clsx'

// COMPONENT
import { Alert, ScrollView, Text, View } from 'react-native'
import { BackButton } from '../components/BackButton'
import { ProgressBar } from '../components/ProgressBar'
import { Checkbox } from '../components/Checkbox'
import { Loading } from '../components/Loading'
import { HabitsEmpty } from '../components/HabitsEmpty'

// HOOK
import { useFetch } from '../hooks/useFetch'

// UTIL
import { generateProgressPercentage } from '../utils/generate-progress-percentage'

// LIB
import { api } from '../lib/axios'

// TYPE
interface RouteParams {
  date: string
}

interface DayInfo {
  possibleHabits: Array<{
    id: string
    title: string
    created_at: string
  }>
  completedHabits: string[]
}

export function Habit(): JSX.Element {
  const [completedHabits, setCompletedHabits] = useState<string[]>([])

  const route = useRoute()
  const { date } = route.params as RouteParams

  const parsedDate = dayjs(date)
  const isDateInPast = parsedDate.endOf('day').isBefore(new Date())
  const dayOfWeek = parsedDate.format('dddd')
  const dayAndMonth = parsedDate.format('DD/MM')

  const {
    response: dayInfo,
    error,
    isLoading,
  } = useFetch<DayInfo>('day', {
    params: { date: new Date(date).toISOString() },
  })

  const habitsProgress = dayInfo?.possibleHabits.length
    ? generateProgressPercentage(
        dayInfo.possibleHabits.length,
        completedHabits.length
      )
    : 0

  useEffect(() => {
    if (dayInfo) {
      setCompletedHabits(dayInfo.completedHabits)
    }
  }, [dayInfo])

  if (error) {
    Alert.alert('Ops', 'Não foi possível carregar as informações dos hábitos')
  }

  async function handleToggleHabit(habitId: string) {
    try {
      await api.patch(`/habits/${habitId}/toggle`)

      if (completedHabits.includes(habitId)) {
        setCompletedHabits((prevState) =>
          prevState.filter((habit) => habit !== habitId)
        )
      } else {
        setCompletedHabits((prevState) => [...prevState, habitId])
      }
    } catch (err) {
      console.log(err)
      Alert.alert('Ops', 'Não foi possível atualizar o status do hábito')
    }
  }

  return (
    <View className='flex-1 bg-background px-8 pt-16'>
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <BackButton />

          <Text className='mt-6 text-zinc-400 font-semibold text-base lowercase'>
            {dayOfWeek}
          </Text>

          <Text className='text-white font-extrabold text-3xl'>
            {dayAndMonth}
          </Text>

          <ProgressBar progress={habitsProgress} />

          <View
            className={clsx('mt-6', {
              'opacity-50': isDateInPast,
            })}
          >
            {dayInfo?.possibleHabits.length ? (
              dayInfo.possibleHabits.map((habit) => (
                <Checkbox
                  key={habit.id}
                  title={habit.title}
                  checked={completedHabits.includes(habit.id)}
                  onPress={() => handleToggleHabit(habit.id)}
                  disabled={isDateInPast}
                />
              ))
            ) : (
              <HabitsEmpty />
            )}
          </View>

          {isDateInPast && (
            <Text className='text-white mt-10 text-center'>
              Você não pode editar hábitos de uma data que já passou
            </Text>
          )}
        </ScrollView>
      )}
    </View>
  )
}
