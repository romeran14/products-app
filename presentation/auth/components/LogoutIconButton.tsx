import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor'
import { View, Text, TouchableOpacity } from 'react-native'
import { useAuthStore } from '../store/useAuthStore'
import { Ionicons } from '@expo/vector-icons'


const LogoutIconButton = () => {

    const primaryColor = useThemeColor({}, 'primary')
    const { logout } = useAuthStore()
    
  return (
    <TouchableOpacity
      onPress={logout}
      style={{ marginRight:10 }}
    >
        <Ionicons name='log-out-outline' size={24} color={primaryColor}></Ionicons>
    </TouchableOpacity>
  )
}

export default LogoutIconButton