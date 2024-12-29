import { useState } from 'react';
import { Product } from '@/core/products/interfaces/product.interface'
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import { ProductCard } from './ProductCard';
import { useQueryClient } from '@tanstack/react-query';


interface Props{
    products:Product[];
    loadNextPage:()=>void
}

const ProductList = ({ products, loadNextPage}:Props) => {

    const [isRefreshing, setisRefreshing] = useState(false)
    const queryClient = useQueryClient()

    const onPullToRefresh = async () => {
        setisRefreshing(true)
        await new Promise((resolve) => setTimeout(resolve, 200))
        queryClient.invalidateQueries({ queryKey: ['products', 'infinite'] })
        setisRefreshing(false)
    }

    return (
        <FlatList
            data={products}
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ProductCard product={item}/>}
            onEndReached={loadNextPage}
            onEndReachedThreshold={0.8}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} ></RefreshControl>
            }
        />
    )
}

export default ProductList

const styles = StyleSheet.create({})