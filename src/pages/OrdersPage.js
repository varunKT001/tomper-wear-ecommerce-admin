import React from 'react';
import { SidebarWithHeader, DashboardCards, OrdersTable } from '../components';
import { useOrderContext } from '../context/order_context';

function OrdersPage() {
  const { orders } = useOrderContext();
  return (
    <SidebarWithHeader>
      <OrdersTable orders={orders} />
    </SidebarWithHeader>
  );
}

export default OrdersPage;
