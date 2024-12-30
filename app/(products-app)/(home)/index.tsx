import ProductList from '@/presentation/products/components/ProductList'
import { useProducts } from '@/presentation/products/hooks/useProducts'
import { FAB } from '@/presentation/theme/components/FAB'
import { router } from 'expo-router'
import { View, Text, ActivityIndicator } from 'react-native'


const HomeScreen = () => {

  const { productQuery, loadNextpage} = useProducts()

  if (productQuery.isLoading) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large" />
      </View>

    )
  }
  return (
    <View style={{padding:30}}>
      <ProductList  products={productQuery.data?.pages.flatMap((page) => page) ?? []} loadNextPage={loadNextpage}/>
      <FAB iconName='add-outline' onPress={() => router.push("/(products-app)/product/new")} ></FAB>
    </View>
  )
}

export default HomeScreen