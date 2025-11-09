import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/home/home';
import type { IStaticMethods } from 'preline/preline';
import 'preline';

import DashboardAssistant from './features/assistant/pages/dashboard.assistant';
import IndexAssistant from './features/assistant/pages/index.assistant';
import Sources from './features/upload/components/uploadDocuments';
import SettingsAssistant from './features/assistant/pages/settings.assistant';
import Playground from './features/chat/pages/playground';
import DashboardUser from './features/user/pages/dashboard.user';
import DashboardOrga from './features/organization/pages/dashboard.orga';
import SettingsOrganization from './features/organization/pages/settingsOrga';

import TableUsers from './features/logs/userLogs.orga';
import InviteModal from './features/invites/inviteModal';
import TableLogs from './features/logs/activityLogs.orga';
import OrganizationInput from './features/organization/components/organizationInput.orga';
import SettingsUser from './features/user/pages/settings.user';
import AssistantsPage from './features/assistant/pages/assistantPage';
import AssistantsList from './features/assistant/components/assistantList';
import TableApiKeys from './features/apiKeys/tableApiKeys';
import RoleManagementTable from './features/roles/roleManagementTable.orga';
import MetricsOverview from './features/metrics/metricsEg';


import Login from './features/auth/pages/login.auth';
import Register from './features/auth/pages/register.auth';

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

const App: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Re-scan the DOM for Preline components after navigation or initial mount
    window.HSStaticMethods?.autoInit?.();
  }, [location.pathname]);

  return (
      <Routes>
        <Route path="/" element={<Home />} />

        {/* User Dashboard (nested) */}
        <Route path="/dashboard-user" element={<DashboardUser />}>
          <Route path="settings-user" element={<SettingsUser/>} />
          <Route path="stats" element={<div>Stats</div>} />
        </Route>
        

        {/* Assistant */}
        <Route path="/assistant/:id/" element={<DashboardAssistant />}>
          <Route index element={<IndexAssistant />} />
          <Route path="settings" element={<SettingsAssistant />} />
          <Route path="sources" element={<Sources />} />
        </Route>

        {/* Chat/Playground - Route séparée avec sa propre interface */}
      
          <Route path="/assistant/:id/playground" element={<Playground />} />
       

      {/* Dashboard Orga layout + nested routes */}
        <Route path="/dashboard-orga" element={<DashboardOrga />}>
          <Route index element={<AssistantsList />} />
          <Route path="create-assistant" element={<AssistantsPage />} />
          <Route path="role" element={<RoleManagementTable />} />
          <Route path="user" element={<TableUsers />} />
          <Route path="invite" element={<InviteModal />} />
          <Route path="logs" element={<TableLogs />} />
          <Route path="organization" element={<OrganizationInput />} />
          <Route path="apikeys" element={<TableApiKeys />} />
          <Route path="statistics" element={<MetricsOverview />} />
          <Route path="members" element={<div>Gestion des Membres</div>} />
          <Route path="settings-orga" element={<SettingsOrganization />} />
        </Route>


        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
  );
};


export default App;
