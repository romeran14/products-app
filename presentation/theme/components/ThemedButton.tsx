import { Ionicons } from '@expo/vector-icons'
import { Text, PressableProps, Pressable, StyleSheet } from 'react-native'
import { useThemeColor } from '../hooks/useThemeColor';

interface Props extends PressableProps{
    icon?: keyof typeof Ionicons.glyphMap;
    children:string;
}

const ThemedButton = ({children, icon, ...rest}:Props) => {

    const primary = useThemeColor({}, 'primary')
    
  return (
    <Pressable
      style={({pressed}) => [
        style.container,
        {backgroundColor: pressed ? primary +'60' :  primary}
      ]}
      {...rest}
    >
      <Text style={style.text}>{children}</Text>
      {icon ? <Ionicons name={icon} size={24} color={"#fff"} /> : null}
    </Pressable>
  )
}

export default ThemedButton

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderRadius: 5,
    padding: 15,
    marginVertical: 20,
    
  },
  text: {
    color:"#fff"
  },
})