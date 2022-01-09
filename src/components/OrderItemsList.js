import { HStack, VStack, Text, Image, Box } from '@chakra-ui/react';
import React from 'react';
import { formatPrice } from '../utils/helpers';

function OrderItemsList({ orderItems }) {
  return (
    <VStack alignItems='flex-start' spacing='4'>
      {orderItems.map((item, index) => {
        const { name, price, quantity, image, color } = item;
        return (
          <HStack key={index} alignItems='flex-start' spacing='5'>
            <Image
              src={image}
              boxSize='100px'
              objectFit='cover'
              borderRadius='lg'
            />
            <VStack alignItems='flex-start'>
              <HStack spacing='3'>
                <Text as='b'>{name}</Text>
                <Box bg={color} p='2' borderRadius='5' />
              </HStack>
              <Text color='green'>{formatPrice(price)}</Text>
              <Text color='blue'>{quantity}</Text>
            </VStack>
          </HStack>
        );
      })}
    </VStack>
  );
}

export default OrderItemsList;
