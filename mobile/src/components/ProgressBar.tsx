// DEPENDENCY
import { useEffect } from 'react'

// COMPONENT
import { View } from 'react-native'

// STYLE
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

// TYPE
interface ProgressBarProps {
  progress?: number
}

export function ProgressBar({ progress = 0 }: ProgressBarProps): JSX.Element {
  const sharedProgress = useSharedValue(progress)

  const style = useAnimatedStyle(() => ({
    width: `${sharedProgress.value}%`,
  }))

  useEffect(() => {
    sharedProgress.value = withTiming(progress)
  }, [progress])

  return (
    <View className='w-full h-3 rounded-xl bg-zinc-700 mt-4'>
      <Animated.View className='h-3 rounded-xl bg-violet-600' style={style} />
    </View>
  )
}
