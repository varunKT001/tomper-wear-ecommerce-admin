import React, { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { formatPrice } from '../utils/helpers';
import { useProductContext } from '../context/product_context';
import { Link } from 'react-router-dom';
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
  HStack,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react';
import UpdateProductModal from './UpdateProductModal';

function ProductsTable({ products }) {
  const toast = useToast();
  const { fetchProducts, deleteProduct } = useProductContext();
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    setLoading(true);
    const response = await deleteProduct(id);
    setLoading(false);
    if (response.success) {
      toast({
        position: 'top',
        description: response.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      return await fetchProducts();
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

  return (
    <SimpleGrid bg='white' p={5} shadow='lg' borderRadius='lg' overflowX='auto'>
      {loading ? (
        <HStack my={8} alignItems='center' justifyContent='center'>
          <Spinner size='lg' color='brown.500' />
        </HStack>
      ) : (
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
              const { image, name, price, stock, category, company, id } =
                product;
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
                        <Link to={`/products/${id}`}>
                          <MenuItem>View</MenuItem>
                        </Link>
                        <MenuItem>
                          <UpdateProductModal id={id} />
                        </MenuItem>
                        <MenuItem onClick={() => handleDelete(id)}>
                          Delete
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}
    </SimpleGrid>
  );
}

export default ProductsTable;
