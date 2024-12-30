import { updateCreateProduct } from "@/core/products/actions/create-update-product.action"
import { getProductsById } from "@/core/products/actions/get-products-by-id.action"
import { Product } from "@/core/products/interfaces/product.interface"
import { useMutation, useQuery, QueryClient, useQueryClient } from '@tanstack/react-query';
import { useRef } from "react";
import { Alert } from "react-native"


export const useProduct = ( productId: string) => {

  const queryClient = useQueryClient()
  const productIdRef = useRef<string>(productId)

  const productQuery = useQuery({
    queryKey: ['products', productId],
    queryFn: () => getProductsById(productId),
    staleTime: 1000 * 60 * 60
  })

  const productMutation = useMutation({
    mutationFn: async (data: Product) => updateCreateProduct({
      ...data,
      id: productIdRef.current,
    }),
    onSuccess(data:Product) {
      productIdRef.current = data.id
      //Invalidate the cache
      queryClient.invalidateQueries({ queryKey: ['products', 'infinite'] })
      queryClient.invalidateQueries({ queryKey: ['products', data.id] })
     
      Alert.alert('Producto actualizado', `El ${data.title} se actualizo correctamente`)
    },
  })
  
  return { productQuery, productMutation }
}
