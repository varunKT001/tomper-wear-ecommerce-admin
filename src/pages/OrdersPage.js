import React from 'react';
import { SidebarWithHeader, OrdersTable } from '../components';
import { useOrderContext } from '../context/order_context';
import { Heading, VStack, HStack, Button, Spinner } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';

function OrdersPage() {
  const {
    orders,
    orders_loading: loading,
    orders_error: error,
    fetchOrders,
  } = useOrderContext();

  const handleRefresh = async () => {
    await fetchOrders();
  };

  if (loading) {
    return (
      <SidebarWithHeader>
        <HStack mb={5}>
          <Button
            colorScheme='brown'
            variant='outline'
            leftIcon={<MdOutlineRefresh />}
            onClick={handleRefresh}
          >
            Refresh
          </Button>
        </HStack>
        <VStack alignItems='center' justifyContent='center'>
          <Spinner size='lg' color='brown.500' />
        </VStack>
      </SidebarWithHeader>
    );
  }

  if (error) {
    return (
      <SidebarWithHeader>
        <HStack mb={5}>
          <Button
            colorScheme='brown'
            variant='outline'
            leftIcon={<MdOutlineRefresh />}
            onClick={handleRefresh}
          >
            Refresh
          </Button>
        </HStack>
        <VStack alignItems='center' justifyContent='center'>
          <Heading color='red.500'>There was an error</Heading>
        </VStack>
      </SidebarWithHeader>
    );
  }

  return (
    <SidebarWithHeader>
      <HStack mb={5}>
        <Button
          colorScheme='brown'
          variant='outline'
          leftIcon={<MdOutlineRefresh />}
          onClick={handleRefresh}
        >
          Refresh
        </Button>
      </HStack>
      <OrdersTable orders={orders} />
    </SidebarWithHeader>
  );
}

export default OrdersPage;
