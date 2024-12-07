import ThemedButton from '@/presentation/theme/components/ThemedButton';
import ThemedLink from '@/presentation/theme/components/ThemedLink';
import { ThemedText } from '@/presentation/theme/components/ThemedText';
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput';
import { View, Text, KeyboardAvoidingView, useWindowDimensions,  ScrollView, TextInput  } from 'react-native'


const LoginScreen = () => {
  const { height } = useWindowDimensions();
  return (
    <KeyboardAvoidingView
      behavior='padding'
      style={{ flex: 1 }}
    >

      <ScrollView style={{paddingHorizontal:40}}>

        <View style={{ paddingTop: height * 0.35 }}>
          <ThemedText type='title'>Ingresar</ThemedText>
          <ThemedText style={{color:'gray'}} >Porfavor ingrese para continuar</ThemedText>
        </View>

        <View style={{ marginTop:20 }}>
          <ThemedTextInput
            placeholder='correo electronico'
            autoCapitalize='none'
            keyboardType='email-address'
            icon='mail-outline'
          ></ThemedTextInput>
          <ThemedTextInput
            placeholder='Contrasena'
            autoCapitalize='none'
            secureTextEntry
            icon='lock-closed-outline'
          ></ThemedTextInput>
        </View>

        <ThemedButton icon='arrow-forward' >Ingresar</ThemedButton>

        <View style={{
          flexDirection:'row',
          justifyContent:'center',
          alignItems:'center',
          marginTop:20
        }}>
           <ThemedText>No tienes cuenta?</ThemedText>
           <ThemedLink href='/auth/register' style={{ marginHorizontal:5 }}>Crear cuenta</ThemedLink>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen