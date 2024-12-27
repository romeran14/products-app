import { useAuthStore } from '@/presentation/auth/store/useAuthStore';
import ThemedButton from '@/presentation/theme/components/ThemedButton';
import ThemedLink from '@/presentation/theme/components/ThemedLink';
import { ThemedText } from '@/presentation/theme/components/ThemedText';
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';
import { router } from 'expo-router';
import { useState } from 'react';
import { View,KeyboardAvoidingView, useWindowDimensions,  ScrollView, TextInput, Alert  } from 'react-native'


const RegisterScreen = () => {

  const { height } = useWindowDimensions();
  const backgroundColor = useThemeColor({}, 'background')

  
  const { register } = useAuthStore()

  const [isPosting, setisPosting] = useState(false)

  const [form, setform] = useState({
    fullName:'',
    email:'',
    password:''
  })

  const OnRegister = async () => {

    const { email, password, fullName } = form

    if ( form.fullName.length === 0 || form.email.length === 0 || form.password.length === 0) {
      return;
    }

    setisPosting(true)
    const wasSuccesFull = await register(fullName,email, password)
    setisPosting(false)

    if (wasSuccesFull) {
        router.replace('/(products-app)/(home)')
        return;
    }

    Alert.alert('Error','Error al registrar la cuenta')
  }

  return (
    <KeyboardAvoidingView
      behavior='padding'
      style={{ flex: 1 }}
    >

      <ScrollView style={{paddingHorizontal:40, backgroundColor:backgroundColor}}>

        <View style={{ paddingTop: height * 0.35 }}>
          <ThemedText type='title'>Crear Cuenta</ThemedText>
          <ThemedText style={{color:'gray'}} >Porfavor ingrese para continuar</ThemedText>
        </View>

        <View style={{ marginTop:20 }}>
        <ThemedTextInput
            placeholder='Nombre completo'
            autoCapitalize='none'
            icon={'person-outline'}
            onChangeText={(value) => setform({ ...form, fullName: value })}
            value={form.fullName}
          ></ThemedTextInput>
          <ThemedTextInput
            placeholder='correo electronico'
            autoCapitalize='none'
            keyboardType='email-address'
            icon='mail-outline'
            onChangeText={(value) => setform({ ...form, email: value })}
            value={form.email}
          ></ThemedTextInput>
          <ThemedTextInput
            placeholder='Contrasena'
            autoCapitalize='none'
            secureTextEntry
            icon='lock-closed-outline'
            onChangeText={(value) => setform({ ...form, password: value })}
            value={form.password}
          ></ThemedTextInput>
        </View>

        <ThemedButton onPress={OnRegister} icon='arrow-forward' >Crear cuenta</ThemedButton>

        <View style={{
          flexDirection:'row',
          justifyContent:'center',
          alignItems:'center',
          marginTop:20
        }}>
           <ThemedText>Ya tienes cuenta?</ThemedText>
           <ThemedLink href='/auth/login' style={{ marginHorizontal:5 }}>Iniciar sesion</ThemedLink>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen