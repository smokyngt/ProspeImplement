import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/home/home';
import type { IStaticMethods } from 'preline/preline';
import 'preline';

import DashboardAssistant from './features/assistant/pages/dashboard.assistant';
import IndexAssistant from './features/assistant/pages/index.assistant';
import Sources from './features/assistant/pages/sources.assistant';
import Export from './features/assistant/pages/export.assistant';
import SettingsAssistant from './features/assistant/pages/settings.assistant';
import Playground from './features/chat/pages/playground';
import DashboardUser from './features/user/pages/dashboard.user';
import DashboardOrga from './features/organization/pages/dashboard.orga';

import TableUsers from './features/organization/components/tableUser.orga';
import Invite from './features/organization/pages/invite.orga';
import TableLogs from './features/organization/components/tableLogs.orga';
import OrganizationInput from './features/organization/components/organizationInput.orga';
import SettingsUser from './features/user/pages/settings/settings.user';
import CreateAssistantOrga from './features/organization/components/createAssistant.orga';
import GridAssistantOrganization from './features/organization/components/gridAssitant.orga';
import ApiKeys from './features/organization/pages/apiKeys.orga';
import RoleManagementTable from './features/organization/components/roleManagementTable.orga';

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
          <Route path="settings-user" element={<SettingsUser />} />
          <Route path="stats" element={<div>Stats</div>} />
        </Route>
        

        {/* Assistant */}
        <Route path="/assistant/:id/" element={<DashboardAssistant />}>
          <Route index element={<IndexAssistant />} />
          <Route path="settings" element={<SettingsAssistant />} />
          <Route path="export" element={<Export />} />
          <Route path="sources" element={<Sources />} />
        </Route>

        {/* Chat/Playground - Route séparée avec sa propre interface */}
      
          <Route path="/assistant/:id/playground" element={<Playground />} />
       

      {/* Dashboard Orga layout + nested routes */}
        <Route path="/dashboard-orga" element={<DashboardOrga />}>
          <Route index element={<GridAssistantOrganization />} />
          <Route path="create-assistant" element={<CreateAssistantOrga />} />
          <Route path="role" element={<RoleManagementTable />} />
          <Route path="user" element={<TableUsers />} />
          <Route path="invite" element={<Invite />} />
          <Route path="logs" element={<TableLogs />} />
          <Route path="organization" element={<OrganizationInput />} />
          <Route path="apikeys" element={<ApiKeys /> } />
          <Route path="statistics" element={<div>Statistiques</div>} />
          <Route path="members" element={<div>Gestion des Membres</div>} />
        </Route>
      </Routes>
  );
};


export default App;
