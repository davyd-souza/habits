// DEPENDENCY
import { useNavigation } from '@react-navigation/native'

// COMPONENT
import { TouchableOpacity } from 'react-native'

// STYLE
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'

export function BackButton(): JSX.Element {
  const { goBack } = useNavigation()

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
      <Feather name='arrow-left' size={32} color={colors.zinc[400]} />
    </TouchableOpacity>
  )
}
