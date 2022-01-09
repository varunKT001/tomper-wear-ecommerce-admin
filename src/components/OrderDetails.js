import { Box, HStack, VStack, Text, Badge } from '@chakra-ui/react';
import React from 'react';
import OrderItemsList from './OrderItemsList';
import {
  formatAddress,
  formatPrice,
  getOrderStatusColor,
} from '../utils/helpers';

function OrderDetails({
  order_status,
  shippingPrice,
  totalPrice,
  paymentInfo = { id: '', status: '' },
  user = { name: '', email: '' },
  shippingInfo = {
    address: '',
    city: '',
    state: '',
    country: '',
    pinCode: '',
    phoneNumber: '',
  },
  orderItems = [
    {
      name: '',
      price: '',
      quantity: '',
      image: '',
      color: '',
      product: '',
      _id: '',
    },
  ],
}) {
  return (
    <Box>
      <VStack alignItems='flex-start' spacing='8'>
        <VStack alignItems='flex-start' spacing='3'>
          <HStack alignItems='flex-start'>
            <Text as='b'>ORDER STATUS: </Text>
            <Badge colorScheme={getOrderStatusColor(order_status)}>
              {order_status}
            </Badge>
          </HStack>
          <HStack alignItems='flex-start'>
            <Text as='b'>PAYMENT: </Text>
            <Badge colorScheme='green'>{paymentInfo.status}</Badge>
          </HStack>
          <HStack alignItems='flex-start'>
            <Text as='b'>SHIPPING: </Text>
            <Text color='green'>{formatPrice(shippingPrice)}</Text>
          </HStack>
          <HStack alignItems='flex-start'>
            <Text as='b'>ORDER TOTAL: </Text>
            <Text color='green'>{formatPrice(totalPrice)}</Text>
          </HStack>
          <VStack alignItems='flex-start' spacing='1'>
            <Text as='b'>DELIVERY: </Text>
            <Text color='grey.500'>
              {user.name}, {shippingInfo.phoneNumber}
            </Text>
            <Text color='grey.500'>{formatAddress(shippingInfo)}</Text>
          </VStack>
        </VStack>
        <OrderItemsList orderItems={orderItems} />
      </VStack>
    </Box>
  );
}

export default OrderDetails;
