import React from 'react';
import { getAdminPrivilegeColor } from '../utils/helpers';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Button,
  SimpleGrid,
  ButtonGroup,
} from '@chakra-ui/react';

function AdminsTable({ admins }) {
  return (
    <SimpleGrid bg='white' p={5} shadow='lg' borderRadius='lg'>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Privilege</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {admins.map((admin, index) => {
            const { name, email, privilege } = admin;
            return (
              <Tr key={index}>
                <Td>{name}</Td>
                <Td>{email}</Td>
                <Td>
                  <Badge colorScheme={getAdminPrivilegeColor(privilege)}>
                    {privilege}
                  </Badge>
                </Td>
                <Td>
                  <ButtonGroup variant='outline' spacing='5'>
                    <Button>EDIT PRIVILEGE</Button>
                    <Button colorScheme='red'>DELETE</Button>
                  </ButtonGroup>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </SimpleGrid>
  );
}

export default AdminsTable;
