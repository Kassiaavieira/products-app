import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../utils/api';

interface Product {
  id: string;
  name: string;
  price: number;
  amount: number;
}

const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await api.get('/produtos');
  return data;
};

const createProduct = async (newProduct: Product): Promise<Product> => {
  const { data } = await api.post('/produtos', newProduct);
  return data;
};

const updateProduct = async (id: string, updatedProduct: Partial<Product>): Promise<Product> => {
  const { data } = await api.put(`/produtos/${id}`, updatedProduct);
  return data;
};

const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/produtos/${id}`);
};

export const useProducts = () => {
  const queryClient = useQueryClient();

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const mutationCreateProduct = useMutation({
    mutationFn: createProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });

  const mutationUpdateProduct = useMutation({
    mutationFn: ({ id, updatedProduct }: { id: string; updatedProduct: Partial<Product> }) =>
      updateProduct(id, updatedProduct),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });

  const mutationDeleteProduct = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });

  return {
    products,
    isLoading,
    createProduct: mutationCreateProduct,
    updateProduct: mutationUpdateProduct,
    deleteProduct: mutationDeleteProduct,
  };
};
