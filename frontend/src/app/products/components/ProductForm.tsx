import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '../../../utils/validation';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';

interface ProductFormData {
  nome: string;
  preco: number;
  quantidade: number;
}

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  defaultValues: ProductFormData;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, defaultValues }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label htmlFor="nome">Nome</label>
        <Controller
          name="nome"
          control={control}
          render={({ field }) => (
            <InputText
              id="nome"
              {...field}
              className={errors.nome ? 'p-invalid' : ''}
            />
          )}
        />
        {errors.nome && <small className="p-error">{errors.nome.message}</small>}
      </div>

      <div className="field">
        <label htmlFor="preco">Preço</label>
        <Controller
          name="preco"
          control={control}
          render={({ field }) => (
            <InputNumber
              id="preco"
              {...field}
              min={0}
              className={errors.preco ? 'p-invalid' : ''}
            />
          )}
        />
        {errors.preco && <small className="p-error">{errors.preco.message}</small>}
      </div>

      <div className="field">
        <label htmlFor="quantidade">Quantidade</label>
        <Controller
          name="quantidade"
          control={control}
          render={({ field }) => (
            <InputNumber
              id="quantidade"
              {...field}
              min={0}
              className={errors.quantidade ? 'p-invalid' : ''}
            />
          )}
        />
        {errors.quantidade && <small className="p-error">{errors.quantidade.message}</small>}
      </div>

      <Button type="submit" label="Salvar" />
    </form>
  );
};

export default ProductForm;
