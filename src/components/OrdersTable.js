import React from 'react';
import { formatPrice, getOrderStatusColor } from '../utils/helpers';
import { BiChevronDown } from 'react-icons/bi';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  SimpleGrid,
  VStack,
  Text,
  HStack,
} from '@chakra-ui/react';

function OrdersTable({ orders }) {
  return (
    <SimpleGrid bg='white' p={5} shadow='lg' borderRadius='lg'>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Customer</Th>
            <Th>Items</Th>
            <Th>Payment</Th>
            <Th>Status</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order, index) => {
            const {
              user: { name },
              orderItems,
              paymentInfo: { status },
              orderStatus,
            } = order;
            return (
              <Tr key={index}>
                <Td>{name}</Td>
                <Td>
                  <VStack alignItems='flex-start' spacing={5}>
                    {orderItems.map((item, index) => {
                      const { image, name, price } = item;
                      return (
                        <HStack key={index}>
                          <Image
                            src={image}
                            boxSize='50px'
                            objectFit='cover'
                            borderRadius='lg'
                          />
                          <VStack alignItems='flex-start' spacing={1}>
                            <Text as='b'>{name.substring(0, 21)}...</Text>
                            <Text fontSize='sm' color='green.500'>
                              {formatPrice(price)}
                            </Text>
                          </VStack>
                        </HStack>
                      );
                    })}
                  </VStack>
                </Td>
                <Td color='green.500'>
                  <Badge colorScheme='green'>{status}</Badge>
                </Td>
                <Td>
                  <Badge colorScheme={getOrderStatusColor(orderStatus)}>
                    {orderStatus}
                  </Badge>
                </Td>
                <Td>
                  <Menu>
                    <MenuButton as={Button} rightIcon={<BiChevronDown />}>
                      Actions
                    </MenuButton>
                    <MenuList>
                      <MenuItem>VIEW</MenuItem>
                      <MenuItem>DELETE</MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </SimpleGrid>
  );
}

export default OrdersTable;
