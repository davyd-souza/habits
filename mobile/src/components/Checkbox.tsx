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
      className='flex-row mb-2 items-center'
      {...props}
    >
      {checked ? (
        <View className='w-8 h-8 bg-green-500 rounded-lg items-center justify-center'>
          <Feather name='check' size={20} color={colors.white} />
        </View>
      ) : (
        <View className='w-8 h-8 bg-zinc-900 rounded-lg'></View>
      )}
      <Text className='text-white text-base ml-3'>{title}</Text>
    </TouchableOpacity>
  )
}
