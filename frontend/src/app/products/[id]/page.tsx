"use client"
import { useParams, useRouter } from 'next/navigation';
import { useFetchProduct } from '../../../hooks/useProducts';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { ProgressSpinner } from 'primereact/progressspinner';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const { data: product, isLoading, error } = useFetchProduct(Number(id));

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <ProgressSpinner />
        </div>
      );
    }

    const errorMessage = error ? 'Erro ao carregar o produto.' : 'Produto não encontrado.';

    return (
      <div className="flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Card title={error ? "Erro" : "Detalhes do Produto"} className="p-shadow-5" style={{ width: '400px' }}>
          {error ? (
            <p>{errorMessage}</p>
          ) : (
            <>
              <div className="mb-3">
                <strong>Nome:</strong> {product?.name}
              </div>
              <div className="mb-3">
                <strong>Preço:</strong> R$ {product?.price.toFixed(2)}
              </div>
              <div className="mb-3">
                <strong>Quantidade:</strong> {product?.amount}
              </div>
            </>
          )}
          <Button
            label="Voltar"
            icon="pi pi-arrow-left"
            className="p-button-secondary"
            onClick={() => router.push('/')}
          />
        </Card>
      </div>
    );
  };

  return renderContent();
};

export default ProductDetailsPage;
