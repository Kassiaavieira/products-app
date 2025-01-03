import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

interface Product {
    id: string | number;
    name: string;
    price: number;
    amount: number;
}
  
interface ProductTableProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (id: string | number) => void;
}
  
const ProductTable: React.FC<ProductTableProps> = ({ products, onEdit, onDelete }) => {
    return (
      <DataTable value={products} paginator rows={10} responsiveLayout="scroll">
        <Column field="name" header="Name" />
        <Column field="price" header="Price" />
        <Column field="amount" header="Amount" />
        <Column
          header="Actions"
          body={(rowData) => (
            <>
              <Button label="Edit" onClick={() => onEdit(rowData)} />
              <Button label="Delete" onClick={() => onDelete(rowData.id)} className="p-button-danger" />
            </>
          )}
        />
      </DataTable>
    );
  };
  
export default ProductTable;
  