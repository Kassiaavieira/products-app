import ProductForm from '../components/ProductForm';
import { useProdutos } from '../../../hooks/useProducts';
import { useForm } from "react-hook-form";

interface Product {
  name: string;
  price: number;
  amount: number;
}

interface ProductFormData {
  name: string;
  price: number;
  amount: number;
}

const CreateProductPage = () => {
  const { createProduto } = useProdutos();
  const { reset, setValue } = useForm<ProductFormData>();

  const onSubmit = (data: ProductFormData) => {
    const newProduct: Omit<Product, "id"> = {
      name: data.name,
      price: data.price,
      amount: data.amount,
    };

    createProduto.mutate(newProduct, {
      onSuccess: () => {
        reset();
        setValue("name", "");
        setValue("price", 0);
        setValue("amount", 0);
      },
    });
  };

  return (
    <div>
      <h1>Criar Produto</h1>
      <ProductForm onSubmit={onSubmit} defaultValues={{ name: '', price: 0, amount: 0 }} />
    </div>
  );
};

export default CreateProductPage;
