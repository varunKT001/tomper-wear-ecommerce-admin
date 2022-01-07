import React, { ReactNode } from 'react';
import { SidebarWithHeader } from '../components';
import { Heading } from '@chakra-ui/react';

export default function Dashboard() {
  return (
    <SidebarWithHeader>
      <Heading>This is dashboard</Heading>
    </SidebarWithHeader>
  );
}
