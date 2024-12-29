import { View, Text, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { Redirect, useLocalSearchParams, useNavigation } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { ThemedView } from '@/presentation/theme/components/ThemedView'
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput'
import { useProduct } from '@/presentation/products/hooks/useProduct'
import ProductImages from '@/presentation/products/components/ProductImages'

const ProductScreen = () => {

    const { id } = useLocalSearchParams()
    const navigation =  useNavigation()

    const { productQuery } = useProduct(`${id}`)

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Ionicons 
                    name="camera-outline"
                    size={24}
                />
            )
        })
    }, [])

    useEffect(() => {
        navigation.setOptions({
            title: productQuery.data?.title ?? 'Producto'
        })
    }, [productQuery.data])
    

    if (productQuery.isLoading) {
        return (
        <View style={{ flex:1, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator size="large" />
        </View>
        )
    }

    if (!productQuery.data) {
        return <Redirect href={'/(products-app)/(home)'} />
    }

    const product = productQuery.data
    
    return (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding': undefined}
        >
            <ScrollView>
            <ProductImages images={product.images}/>
            <ThemedView style={{ marginHorizontal:10, marginTop:20 }}>
                <ThemedTextInput placeholder='Titulo' style={{marginVertical:10}} />
                <ThemedTextInput placeholder='Slug' style={{marginVertical:10}} />
                <ThemedTextInput placeholder='Descripcion' style={{marginVertical:10}} numberOfLines={5} multiline />
            </ThemedView>
            <ThemedView style={{ marginHorizontal:10, marginVertical:20, flexDirection:'row', gap:10 }}>
            <ThemedTextInput placeholder='Precio' style={{marginVertical:5, flex:1}} />
            <ThemedTextInput placeholder='Inventario' style={{marginVertical:5, flex:1}} />
            </ThemedView>
            </ScrollView>
        </KeyboardAvoidingView>

    )
}

export default ProductScreen