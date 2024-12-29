import ProductList from '@/presentation/products/components/ProductList'
import { useProducts } from '@/presentation/products/hooks/useProducts'
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
    </View>
  )
}

export default HomeScreen