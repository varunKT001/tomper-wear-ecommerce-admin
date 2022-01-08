import React from 'react';
import { ProductsTable, SidebarWithHeader } from '../components';
import { useProductContext } from '../context/product_context';

function ProductsPage() {
  const { products } = useProductContext();
  return (
    <SidebarWithHeader>
      <ProductsTable products={products} />
    </SidebarWithHeader>
  );
}

export default ProductsPage;
