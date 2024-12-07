import { useAuthStore } from '@/presentation/auth/store/useAuthStore'
import { View, Text, ActivityIndicator } from 'react-native'
import { useEffect } from 'react';
import { Redirect, Stack } from 'expo-router';


const ProductsAppLayout = () => {

    const {checkStatus, status} = useAuthStore()

    useEffect(() => {
        checkStatus()
    }, [])

    if (status === 'checking') {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom:5 }} >
               <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }

    if (status ==='unauthenticated') {
        return (
           <Redirect href={'/auth/login'}></Redirect>
        )
    }

    
  return (
    <Stack>
        <Stack.Screen name='(home)/index' options={{ title: 'Productos' }} />
    </Stack>
  )
}

export default ProductsAppLayout