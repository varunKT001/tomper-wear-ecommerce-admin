import React from 'react';
import {
  SidebarWithHeader,
  AdminsTable,
  CreateNewAdminModal,
} from '../components';
import { useAdminContext } from '../context/admin_context';
import { HStack, VStack, Spinner, Heading } from '@chakra-ui/react';

function AdminsPage() {
  const {
    admins,
    admins_loading: loading,
    admins_error: error,
  } = useAdminContext();

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
      <HStack mb={5}>
        <CreateNewAdminModal />
      </HStack>
      <AdminsTable admins={admins} />
    </SidebarWithHeader>
  );
}

export default AdminsPage;
