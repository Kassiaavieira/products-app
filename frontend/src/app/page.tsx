"use client";

import { useState } from 'react';
import ProductTable from './products/components/ProductTable';
import ProductForm, { ProductFormData } from './products/components/ProductForm';
import { useProdutos } from '../hooks/useProducts';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

interface Product {
  id: number;
  name: string;
  price: number;
  amount: number;
}

const HomePage = () => {
  const { produtos, isLoading, createProduto, updateProduto, deleteProduto } = useProdutos();
  const [isDialogVisible, setDialogVisible] = useState<boolean>(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const handleEdit = (product: Product): void => {
    setProductToEdit(product);
    setDialogVisible(true);
  };

  const handleDelete = (id: number): void => {
    deleteProduto.mutate(id);
  };

  const handleDialogClose = (): void => {
    setDialogVisible(false);
    setProductToEdit(null);
  };

  const handleSubmit = (data: ProductFormData): void => {
    const productData = productToEdit
      ? { ...data, id: productToEdit.id }
      : { ...data, id: 0 };

    if (productToEdit) {
      updateProduto.mutate({ id: productToEdit.id, updatedProduct: data });
    } else {
      createProduto.mutate(productData as Product);
    }
    handleDialogClose();
  };

  if (isLoading) return <p>Carregando produtos...</p>;

  return (
    <div>
      <h1>Bem-vindo ao Gerenciador de Produtos</h1>
      <Button label="Cadastrar Produto" icon="pi pi-plus" onClick={() => setDialogVisible(true)} />
      <ProductTable
        produtos={produtos || []}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Dialog visible={isDialogVisible} onHide={handleDialogClose}>
        <ProductForm
          onSubmit={handleSubmit}
          defaultValues={productToEdit || { name: '', price: 0, amount: 0 }}
        />
      </Dialog>
    </div>
  );
};

export default HomePage;
