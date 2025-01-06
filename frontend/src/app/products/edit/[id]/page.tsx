import ProductForm from '../../components/ProductForm';
import { useProdutos } from '../../../../hooks/useProducts';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  amount: number;
}

interface ProductFormData {
  name: string;
  price: number;
  amount: number;
}

interface EditProdutoPageProps {
  params: { id: number };
}

const EditProdutoPage = ({ params }: EditProdutoPageProps) => {
  const { updateProduto, produtos } = useProdutos();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const currentProduct = produtos?.find((p) => p.id === params.id);
    if (currentProduct && currentProduct !== product) {
      setProduct(currentProduct);
    }
  }, [produtos, params.id, product]);

  const handleSubmit = (data: ProductFormData) => {
    const updatedProduct = {
      name: data.name,
      price: data.price,
      amount: data.amount,
    };

    updateProduto.mutate(
      { id: params.id, updatedProduct },
      {
        onSuccess: () => router.push('/produtos'),
      }
    );
  };

  if (!product) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Editar Produto</h1>
      <ProductForm onSubmit={handleSubmit} defaultValues={product} />
    </div>
  );
};

export default EditProdutoPage;
