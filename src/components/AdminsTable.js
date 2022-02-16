import React, { useState } from 'react';
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
  Spinner,
  Select,
  useToast,
  HStack,
} from '@chakra-ui/react';
import { useAdminContext } from '../context/admin_context';

function AdminsTable({ admins }) {
  const toast = useToast();
  const { updateAdminPrivilege, deleteAdmin, fetchAdmins } = useAdminContext();
  const [loading, setLoading] = useState(false);

  const handleEdit = async (e, id) => {
    setLoading(true);
    const privilege = e.target.value;
    const response = await updateAdminPrivilege(id, privilege);
    setLoading(false);
    if (response.success) {
      const { name, privilege } = response.data;
      toast({
        position: 'top',
        description: `${name}'s privilege changed to ${privilege}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      return await fetchAdmins();
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

  const handleDelete = async (id) => {
    setLoading(true);
    const response = await deleteAdmin(id);
    setLoading(false);
    if (response.success) {
      toast({
        position: 'top',
        description: response.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      return await fetchAdmins();
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
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Privilege</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {admins.map((admin, index) => {
              const { name, email, privilege, id: adminId } = admin;
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
                    <HStack spacing='5'>
                      <Select
                        maxW={125}
                        focusBorderColor='brown.500'
                        value={privilege}
                        onChange={(e) => handleEdit(e, adminId)}
                      >
                        <option value='super'>Super</option>
                        <option value='moderate'>Moderate</option>
                        <option value='low'>Low</option>
                      </Select>
                      <Button
                        variant='outline'
                        colorScheme='red'
                        onClick={() => handleDelete(adminId)}
                      >
                        Delete
                      </Button>
                    </HStack>
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

export default AdminsTable;
