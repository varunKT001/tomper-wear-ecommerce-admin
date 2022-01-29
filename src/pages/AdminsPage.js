import React from 'react';
import {
  SidebarWithHeader,
  AdminsTable,
  CreateNewAdminModal,
} from '../components';
import { useAdminContext } from '../context/admin_context';
import { HStack, Button, VStack, Spinner, Heading } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';

function AdminsPage() {
  const {
    admins,
    admins_loading: loading,
    admins_error: error,
    fetchAdmins,
  } = useAdminContext();

  const handleRefresh = async () => {
    await fetchAdmins();
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
        <CreateNewAdminModal />
        <Button
          colorScheme='brown'
          variant='outline'
          leftIcon={<MdOutlineRefresh />}
          onClick={handleRefresh}
        >
          Refresh
        </Button>
      </HStack>
      <AdminsTable admins={admins} />
    </SidebarWithHeader>
  );
}

export default AdminsPage;
