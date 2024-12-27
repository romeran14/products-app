import { View,  KeyboardAvoidingView, useWindowDimensions,  ScrollView, TextInput, Alert  } from 'react-native'
import ThemedButton from '@/presentation/theme/components/ThemedButton';
import ThemedLink from '@/presentation/theme/components/ThemedLink';
import { ThemedText } from '@/presentation/theme/components/ThemedText';
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';
import { useState } from 'react';
import { useAuthStore } from '@/presentation/auth/store/useAuthStore';
import { router } from 'expo-router';



const LoginScreen = () => {

  const { login } = useAuthStore()

  const { height } = useWindowDimensions();
  const backgroundColor = useThemeColor({}, 'background')

  const [isPosting, setisPosting] = useState(false)

  const [form, setform] = useState({
    email:'',
    password:''
  })

  const OnLogin = async () => {

    const { email, password } = form
    console.log(email, password)
    if (form.email.length === 0 || form.password.length === 0) {
      return;
    }

    setisPosting(true)
    const wasSuccesFull = await login(email, password)
    setisPosting(false)

    if (wasSuccesFull) {
      console.log("wasSuccesFull")
        router.replace('/(products-app)/(home)')
        return;
    }

    Alert.alert('Error','Usuario o contrasena no son correctos')
  }

  return (
    <KeyboardAvoidingView
      behavior='padding'
      style={{ flex: 1 }}
    >
      <ScrollView style={{paddingHorizontal:40, backgroundColor:backgroundColor}}>

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
            value={form.email}
            onChangeText={(value) => setform({...form, email:value})}
          ></ThemedTextInput>
          <ThemedTextInput
            placeholder='Contrasena'
            autoCapitalize='none'
            secureTextEntry
            icon='lock-closed-outline'
            value={form.password}
            onChangeText={(value) => setform({...form, password:value})}
          ></ThemedTextInput>
        </View>

        <ThemedButton onPress={OnLogin} disabled={isPosting} icon='arrow-forward' >Ingresar</ThemedButton>

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