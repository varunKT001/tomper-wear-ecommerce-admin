import React from 'react';
import { SidebarWithHeader, AdminsTable } from '../components';
import { useAdminContext } from '../context/admin_context';

function AdminsPage() {
  const { admins } = useAdminContext();

  return (
    <SidebarWithHeader>
      <AdminsTable admins={admins} />
    </SidebarWithHeader>
  );
}

export default AdminsPage;
