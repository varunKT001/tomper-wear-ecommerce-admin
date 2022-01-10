import React from 'react';
import {
  ProductsTable,
  SidebarWithHeader,
  CreateNewProductModal,
} from '../components';
import { HStack, VStack, Spinner, Heading } from '@chakra-ui/react';
import { useProductContext } from '../context/product_context';

function ProductsPage() {
  const {
    products,
    products_loading: loading,
    products_error: error,
  } = useProductContext();

  if (loading) {
    return (
      <SidebarWithHeader>
        <VStack alignItems='center' justifyContent='center'>
          <Spinner size='lg' color='brown.500' />
        </VStack>
      </SidebarWithHeader>
    );
  }

  if (error) {
    return (
      <SidebarWithHeader>
        <VStack alignItems='center' justifyContent='center'>
          <Heading color='red.500'>There was an error</Heading>
        </VStack>
      </SidebarWithHeader>
    );
  }

  return (
    <SidebarWithHeader>
      <HStack mb={5}>
        <CreateNewProductModal />
      </HStack>
      <ProductsTable products={products} />
    </SidebarWithHeader>
  );
}

export default ProductsPage;
