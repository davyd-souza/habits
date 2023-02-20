// DEPENDENCY
import clsx from 'clsx'

// COMPONENT
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'

// STYLE
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated'

// TYPE
interface CheckboxProps extends TouchableOpacityProps {
  title: string
  checked?: boolean
}

export function Checkbox({
  title,
  checked = false,
  ...props
}: CheckboxProps): JSX.Element {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className='flex-row mb-2 items-center text-white'
      {...props}
    >
      {checked ? (
        <Animated.View
          className='w-8 h-8 bg-green-500 rounded-lg items-center justify-center'
          entering={ZoomIn}
          exiting={ZoomOut}
        >
          <Feather name='check' size={20} color={colors.white} />
        </Animated.View>
      ) : (
        <View className='w-8 h-8 bg-zinc-900 rounded-lg'></View>
      )}
      <Text
        className={clsx(`text-white text-base ml-3`, {
          'text-zinc-500': props.disabled,
        })}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}
