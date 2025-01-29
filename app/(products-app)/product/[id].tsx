import { View, Text, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { Redirect, router, useLocalSearchParams, useNavigation } from 'expo-router'
import { ThemedView } from '@/presentation/theme/components/ThemedView'
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput'
import { useProduct } from '@/presentation/products/hooks/useProduct'
import ProductImages from '@/presentation/products/components/ProductImages'
import ThemedButtonGroup from '@/presentation/theme/components/ThemedButtonGroup'
import ThemedButton from '@/presentation/theme/components/ThemedButton'
import { Formik } from 'formik'
import { Size } from '@/core/products/interfaces/product.interface'
import MenuIconButton from '@/presentation/theme/components/MenuIconButton'
import { useCameraStore } from '../../../presentation/store/useCameraStore';

const ProductScreen = () => {

    const { id } = useLocalSearchParams()
    const navigation =  useNavigation()

    const { productQuery, productMutation } = useProduct(`${id}`)

    const { selectedImages, clearImages } = useCameraStore()

    useEffect(() => {
    
    
      return () => {
       clearImages()
      }
    }, [])
    

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <MenuIconButton icon='camera-outline' onPress={() => router.push('/camera')}/>
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
        <Formik
            initialValues={product}
            onSubmit={productMutation.mutate}
        >
            {
                ({ values , handleSubmit, handleChange, setFieldValue}) => (
                    <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding': undefined}
                  >
                      <ScrollView>
                      <ProductImages images={[...values.images,...selectedImages]}/>
                      <ThemedView style={{ marginHorizontal:10, marginTop:20 }}>
                          <ThemedTextInput placeholder='Titulo' style={{marginVertical:10}} value={values.title} onChangeText={ handleChange('title')} />
                          <ThemedTextInput placeholder='Slug' style={{marginVertical:10}} value={values.slug} onChangeText={ handleChange('slug')} />
                          <ThemedTextInput placeholder='Descripcion' style={{marginVertical:10}} numberOfLines={5} multiline value={values.description} onChangeText={ handleChange('description')} />
                      </ThemedView>
                      <ThemedView style={{ marginHorizontal:10, marginVertical:20, flexDirection:'row', gap:10 }}>
                        <ThemedTextInput placeholder='Precio' style={{marginVertical:5, flex:1}} value={values.price.toString()} onChangeText={ handleChange('price')} />
                        <ThemedTextInput placeholder='Inventario' style={{marginVertical:5, flex:1}} value={values.stock.toString()} onChangeText={ handleChange('stock')} />
                      </ThemedView>
                      <ThemedView style={{marginHorizontal:10}}>
                          <ThemedButtonGroup 
                            options={["XS", "S", "M", "L", "XL", "XXL", "XXXL"]}
                            selectedOption={values.sizes}
                            onSelect={ (selectedOption) => {
                                if (values.sizes.includes(selectedOption as Size)) {
                                    setFieldValue('sizes', [...values.sizes].filter((size) => size !== selectedOption))
                                } else {
                                    setFieldValue('sizes', [...values.sizes, selectedOption])
                                }
                            } 
                             }
                          />
                          <ThemedButtonGroup 
                            options={["kid", "men", "women", "unisex"]}
                            selectedOption={[values.gender]}
                            onSelect={ (selectedOption) => setFieldValue('gender',selectedOption)}
                          />
                      </ThemedView>
                      <View style={{marginHorizontal:10, marginBottom:40}}>
                          <ThemedButton onPress={() => handleSubmit()} icon='save-outline'>Guardar</ThemedButton>
                      </View>
                      </ScrollView>
                  </KeyboardAvoidingView>
                )
            }

        </Formik>


    )
}

export default ProductScreen