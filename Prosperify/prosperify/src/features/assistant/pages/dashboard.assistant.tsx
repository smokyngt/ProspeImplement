import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarAssistant from '../components/sidebar.assistant';
import DashboardLayout from '@/components/layout/DashboardLayout';

const DashboardAssistant: React.FC = () => {
  return (
    <DashboardLayout
      sidebar={<SidebarAssistant title={'Dashboard'} />}
      paddingClassName="sm:p-6 space-y-4"
    >
      <Outlet /> {/* This will render nested assistant routes */}
    </DashboardLayout>
  );
};

export default DashboardAssistant;