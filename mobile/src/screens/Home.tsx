// DEPENDENCY
import { useNavigation } from '@react-navigation/native'

// COMPONENT
import { Text, View, ScrollView, Alert } from 'react-native'
import { Header } from '../components/Header'
import { Loading } from '../components/Loading'
import { HabitDay, DAY_SIZE } from '../components/HabitDay'

// UTIL
import { generateRangeDatesFromYearStart } from '../utils/generate-range-between-dates'

// HOOKS
import { useFetch } from '../hooks/useFetch'

// TYPE
type ISummary = Array<{
  id: string
  date: string
  amount: number
  completed: number
}>

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const datesFromYearStart = generateRangeDatesFromYearStart()
const minimunSummaryDatesSize = 18 * 5 // 90
const amountOfDaysToFill = minimunSummaryDatesSize - datesFromYearStart.length

export function Home(): JSX.Element {
  const { navigate } = useNavigation()

  const { response: summary, error, isLoading } = useFetch<ISummary>('/summary')

  if (error) Alert.alert('Ops', 'Não foi possível pegar o sumário das tarefas')
  if (isLoading) return <Loading />

  return (
    <View className='flex-1 bg-background px-8 pt-16'>
      <Header />

      <View className='flex-row mt-6 mb-2'>
        {weekDays.map((weekDay, i) => (
          <Text
            key={`${weekDay}-${i}`}
            className='text-zinc-400 text-xl font-bold text-center mx-1'
            style={{ width: DAY_SIZE }}
          >
            {weekDay}
          </Text>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className='flex-row flex-wrap'>
          {datesFromYearStart.map((date) => {
            return (
              <HabitDay
                key={date.toISOString()}
                onPress={() => navigate('habit', { date: date.toISOString() })}
              />
            )
          })}

          {amountOfDaysToFill > 0 &&
            Array.from({ length: amountOfDaysToFill }).map((_, i) => (
              <View
                key={i}
                className='bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40'
                style={{ width: DAY_SIZE, height: DAY_SIZE }}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  )
}
