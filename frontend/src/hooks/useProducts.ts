import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../utils/api';

interface Product {
  id: number;
  name: string;
  price: number;
  amount: number;
}

interface NewProduct {
  name: string;
  price: number;
  amount: number;
}

const fetchProdutos = async (): Promise<Product[]> => {
  const { data } = await api.get('/produtos');
  return data;
};

const fetchProductById = async (id: number): Promise<Product> => {
  const { data } = await api.get(`/produtos/${id}`);
  return data;
};

const createProduto = async (newProduct: NewProduct): Promise<Product> => {
  const { data } = await api.post('/produtos', newProduct);
  return data;
};

const updateProduto = async (id: number, updatedProduct: Partial<Product>): Promise<Product> => {
  const { data } = await api.put(`/produtos/${id}`, updatedProduct);
  return data;
};

const deleteProduto = async (id: number): Promise<void> => {
  await api.delete(`/produtos/${id}`);
};

export const useFetchProduct = (id: number) => {
  return useQuery<Product, Error>({
    queryKey: ['produto', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });
};

export const useProdutos = () => {
  const queryClient = useQueryClient();

  const { data: produtos, isLoading } = useQuery<Product[]>({
    queryKey: ['produtos'],
    queryFn: fetchProdutos,
  });

  const mutationCreateProduto = useMutation({
    mutationFn: createProduto,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['produtos'] }),
  });

  const mutationUpdateProduto = useMutation({
    mutationFn: ({ id, updatedProduct }: { id: number; updatedProduct: Partial<Product> }) =>
      updateProduto(id, updatedProduct),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['produtos'] }),
  });

  const mutationDeleteProduto = useMutation({
    mutationFn: deleteProduto,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['produtos'] }),
  });

  return {
    produtos,
    isLoading,
    createProduto: mutationCreateProduto,
    updateProduto: mutationUpdateProduto,
    deleteProduto: mutationDeleteProduto,
  };
};
