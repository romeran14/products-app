
import { API_URL, productsApi } from "@/core/api/productsApi"
import { Gender, type Product } from '../interfaces/product.interface';

const emptyProduct: Product = {
    id: '',
    title: 'Nuevo Producto',
    description:'',
    price: 0,
    stock: 0,
    images: [],
    gender:Gender.Men,
    sizes: [],
    tags: [],
    slug: '',

  };

export const getProductsById = async (id: string): Promise<Product> => {

   if (id === 'new') {
      return emptyProduct;
    } 
  
    try {
      const { data } = await productsApi.get<Product>(`/products/${id}`);
      return {
        ...data,
        images: data.images.map((image) => `${API_URL}/files/product/${image}`),
      };
    } catch (error) {
      throw new Error(`product with id ${id} not found`);
    }
  };