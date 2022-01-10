import React from 'react';
import { SidebarWithHeader, OrdersTable } from '../components';
import { useOrderContext } from '../context/order_context';
import { Heading, VStack, Spinner } from '@chakra-ui/react';

function OrdersPage() {
  const {
    orders,
    orders_loading: loading,
    orders_error: error,
  } = useOrderContext();

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
      <OrdersTable orders={orders} />
    </SidebarWithHeader>
  );
}

export default OrdersPage;
