import React, { useState } from 'react';

const SettingsContentOrganization: React.FC = () => {
  const [notificationsActive, setNotificationsActive] = useState(true);
  const [externalSources, setExternalSources] = useState(false);

  return (
    <div>
      <div className="mt-4">
        <label className="font-semibold block text-base mb-2">Notifications</label>
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-600">Recevoir les notifications par e-mail.</p>
          <input
            type="checkbox"
            checked={notificationsActive}
            onChange={() => setNotificationsActive(!notificationsActive)}
            className="w-5 h-5 accent-blue-600"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="font-semibold block text-base mb-2">Sources externes</label>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">Autoriser l'accès à des données externes.</p>
          <input
            type="checkbox"
            checked={externalSources}
            onChange={() => setExternalSources(!externalSources)}
            className="w-5 h-5 accent-blue-600"
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsContentOrganization;
