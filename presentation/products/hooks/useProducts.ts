
import { getProducts } from "@/core/products/actions/get-products.action";
import { useInfiniteQuery } from "@tanstack/react-query"


export const useProducts = () => {
    const productQuery = useInfiniteQuery({
        queryKey: ['products', 'infinite'],
        queryFn: ({ pageParam }) => getProducts(20, pageParam * 20 ),
        getNextPageParam: (lastPage, pages) => pages.length,
        initialPageParam: 0,
        staleTime: 1000 * 60 * 60
    })
  return {
    productQuery,
    loadNextpage : productQuery.fetchNextPage
  }}