import React from 'react';
import {
  SidebarWithHeader,
  AdminsTable,
  CreateNewAdminModal,
} from '../components';
import { useAdminContext } from '../context/admin_context';
import { HStack, Button } from '@chakra-ui/react';

function AdminsPage() {
  const { admins } = useAdminContext();

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
