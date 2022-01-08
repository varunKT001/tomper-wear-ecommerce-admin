import React from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { formatPrice } from '../utils/helpers';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  SimpleGrid,
  VStack,
  Text,
} from '@chakra-ui/react';

function ProductsTable({ products }) {
  return (
    <SimpleGrid bg='white' p={5} shadow='lg' borderRadius='lg'>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Image</Th>
            <Th>Name</Th>
            <Th>Category</Th>
            <Th>Stock</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product, index) => {
            const { image, name, price, stock, category, company } = product;
            return (
              <Tr key={index}>
                <Td>
                  <Image
                    src={image}
                    boxSize='100px'
                    objectFit='cover'
                    borderRadius='lg'
                  />
                </Td>
                <Td>
                  <VStack alignItems='flex-start' spacing={1}>
                    <Text as='b'>{name.substring(0, 21)}...</Text>
                    <Text fontSize='sm' color='green.500'>
                      {formatPrice(price)}
                    </Text>
                  </VStack>
                </Td>
                <Td>
                  <VStack alignItems='flex-start' spacing={1}>
                    <Text as='b'>{category.toUpperCase()}</Text>
                    <Text fontSize='sm' color='brown.500'>
                      {company}
                    </Text>
                  </VStack>
                </Td>
                <Td>{stock}</Td>
                <Td>
                  <Menu>
                    <MenuButton as={Button} rightIcon={<BiChevronDown />}>
                      Actions
                    </MenuButton>
                    <MenuList>
                      <MenuItem>EDIT</MenuItem>
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

export default ProductsTable;
