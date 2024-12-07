import { Ionicons } from '@expo/vector-icons'
import { View, Text, type TextInputProps, TextInput, StyleSheet } from 'react-native'
import { useThemeColor } from '../hooks/useThemeColor'
import { useRef, useState } from 'react'

interface Props extends TextInputProps{
  icon: keyof typeof Ionicons.glyphMap
}

const ThemedTextInput = ({icon,...props}:Props) => {

    const text = useThemeColor({}, 'text')
    const primary = useThemeColor({}, 'primary')

    const [isActive, setIsActive] = useState(false)
    const inputRef = useRef<TextInput>(null)

  return (
    <View 
      style={{...styles.container, borderColor:isActive ? primary: "#ccc"}}
      onTouchStart={ ()=> inputRef.current?.focus() }
    >
        {icon ? <Ionicons name={icon} size={24} color={text} /> : null}
      
      <TextInput 
        ref={inputRef}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        placeholderTextColor={'#5C5C5C'} 
        style={[{...styles.input}, {color:text}]} 
        {...props}/>
    </View>
  )
}

export default ThemedTextInput

const styles = StyleSheet.create(
    {
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 5,
          padding: 10,
        },
        input: {
          flex: 1,
          marginRight:10
        },
      }
) 