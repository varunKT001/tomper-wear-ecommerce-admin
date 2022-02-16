import {
  Heading,
  HStack,
  Spinner,
  VStack,
  Select,
  Text,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SidebarWithHeader, OrderDetails } from '../components';
import { useOrderContext } from '../context/order_context';
import { orderStatusList } from '../utils/constants';

function SingleOrderPage() {
  const { id } = useParams();
  const [statusList, setStatusList] = useState([...orderStatusList]);
  const toast = useToast();
  const {
    single_order_loading: loading,
    single_order_error: error,
    single_order: order,
    single_order_status,
    fetchSingleOrder,
    updateOrderStatus,
  } = useOrderContext();

  const handleChange = async (e) => {
    const status = e.target.value;
    const response = await updateOrderStatus(status, id);
    if (response.success) {
      return toast({
        position: 'top',
        description: `Order ${response.status}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } else {
      return toast({
        position: 'top',
        description: response.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchSingleOrder(id);
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    let tempList = [...orderStatusList];
    if (
      single_order_status === 'processing' ||
      single_order_status === 'rejected'
    ) {
      tempList.splice(3, 2);
      setStatusList([...tempList]);
    }
    if (single_order_status === 'confirmed') {
      tempList.splice(0, 2);
      setStatusList([...tempList]);
    }
    if (single_order_status === 'shipped') {
      tempList.splice(0, 3);
      setStatusList([...tempList]);
    }
    if (single_order_status === 'delivered') {
      tempList.splice(0, 4);
      setStatusList([...tempList]);
    }
  }, [id, single_order_status]);

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
      <HStack bg='white' p={5} mb={5} shadow='sm' borderRadius='lg'>
        <Text>STATUS: </Text>
        <Select
          variant='filled'
          focusBorderColor='brown.500'
          value={single_order_status}
          onChange={handleChange}
        >
          {statusList.map((status, index) => {
            const { name, value } = status;
            return (
              <option key={index} value={value}>
                {name}
              </option>
            );
          })}
        </Select>
      </HStack>
      <VStack
        spacing='5'
        p={5}
        bg='white'
        alignItems='flex-start'
        shadow='sm'
        borderRadius='lg'
      >
        <OrderDetails {...order} order_status={single_order_status} />
      </VStack>
    </SidebarWithHeader>
  );
}

export default SingleOrderPage;
