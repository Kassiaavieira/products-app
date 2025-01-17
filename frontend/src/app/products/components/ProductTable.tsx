import { useRouter } from 'next/navigation';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

interface Product {
  id: number;
  name: string;
  price: number;
  amount: number;
}

interface ProductTableProps {
  produtos: Product[] | undefined;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ produtos, onEdit, onDelete }) => {
  const router = useRouter();

  const handleViewDetails = (id: number) => {
    router.push(`/products/${id}`);
  };

  const handleDelete = (id: number) => {
    confirmDialog({
      message: 'Tem certeza de que deseja excluir este produto?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => onDelete(id),
      reject: () => {},
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
    });
  };

  return (
    <>
      <DataTable value={produtos} paginator rows={4} responsiveLayout="scroll">
        <Column field="name" header="Nome" />
        <Column field="price" header="Preço" />
        <Column field="amount" header="Quantidade" />
        <Column
          header="Ações"
          body={(rowData) => (
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button label="Detalhes" onClick={() => handleViewDetails(rowData.id)} />
              <Button label="Editar" onClick={() => onEdit(rowData)} />
              <Button
                label="Deletar"
                onClick={() => handleDelete(rowData.id)}
                className="p-button-danger"
              />
            </div>
          )}
        />
      </DataTable>
      <ConfirmDialog />
    </>
  );
};

export default ProductTable;
