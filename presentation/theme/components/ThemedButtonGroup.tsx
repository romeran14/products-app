import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useThemeColor } from '../hooks/useThemeColor';

interface Props{
    options: string[];
    selectedOption: string[];
    onSelect: (option: string) => void;
}

const ThemedButtonGroup = ({ onSelect, options, selectedOption}:Props) => {

    const primaryColor = useThemeColor({}, 'primary')

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity style={[
            styles.button,
            selectedOption.includes(option) ? {
                ...styles.selectedButton,
                backgroundColor: primaryColor
             }: null] 
        
            
          
        }  key={option} onPress={() => onSelect(option)}>
            <Text
                style={[
                    styles.buttonText,
                    selectedOption.includes(option) ? styles.selectedButtonText : null
                ]} >
            {option}
            </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default ThemedButtonGroup

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems:"center"
    },
    button:{
        padding:10,
        margin:5
    },
    selectedButton:{
        backgroundColor: 'blue',
        color: 'white',
        padding: 10,
        borderRadius: 5,
        margin: 5
    },
    buttonText:{
        fontSize:16,
        textTransform:'capitalize'
    },
    selectedButtonText:{
        color: 'white'
    }

})