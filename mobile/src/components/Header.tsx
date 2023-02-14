// COMPONENT
import { View, TouchableOpacity, Text } from 'react-native'

// STYLE
import colors from 'tailwindcss/colors'
import { MaterialIcons } from '@expo/vector-icons'

// ASSET
import Logo from '../assets/logo.svg'

export function Header(): JSX.Element {
  return (
    <View className='w-full flex-row items-center justify-between'>
      <Logo />

      <TouchableOpacity
        activeOpacity={0.7}
        className='flex-row items-center px-4 py-3 border border-violet-500 rounded-lg'
      >
        <MaterialIcons name='add' color={colors.violet[500]} size={20} />

        <Text className='text-white font-semibold text-base pl-3'>Novo</Text>
      </TouchableOpacity>
    </View>
  )
}
