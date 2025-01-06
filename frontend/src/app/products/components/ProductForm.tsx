"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../../../utils/validation";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";

export interface ProductFormData {
  name: string;
  price: number;
  amount: number;
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
    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid grid">
      <div className="field col-12">
        <label htmlFor="name">Nome</label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <InputText
              id="name"
              {...field}
              className={errors.name ? "p-invalid" : ""}
            />
          )}
        />
        {errors.name && <small className="p-error">{errors.name.message}</small>}
      </div>

      <div className="field col-6">
        <label htmlFor="price">Preço</label>
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <InputNumber
              id="price"
              value={field.value}
              onValueChange={(e) => field.onChange(e.value)}
              mode="currency"
              currency="BRL"
              locale="pt-BR"
              min={0}
              className={errors.price ? "p-invalid" : ""}
            />
          )}
        />
        {errors.price && <small className="p-error">{errors.price.message}</small>}
      </div>

      <div className="field col-6">
        <label htmlFor="amount">Quantidade</label>
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <InputNumber
              id="amount"
              value={field.value}
              onValueChange={(e) => field.onChange(e.value)}
              min={0}
              className={errors.amount ? "p-invalid" : ""}
            />
          )}
        />
        {errors.amount && <small className="p-error">{errors.amount.message}</small>}
      </div>

      <div className="field col-12">
        <Button type="submit" label="Salvar" className="w-full" />
      </div>
    </form>
  );
};

export default ProductForm;
