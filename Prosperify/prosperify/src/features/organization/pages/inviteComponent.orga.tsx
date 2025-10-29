import React, { useState } from 'react';
import AlertError from '@/components/ui/base/Alert/alertError';

const Invite: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [showInviteLink, setShowInviteLink] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"Admin" | "Editor" | "Viewer" | null>(null);

  const existingRoles = ['Admin', 'Editor', 'Viewer'];
  const roleToPermissionsMap = {
    Admin: ['Manage organization', 'Manage User', 'View logs'],
    Editor: ['View assistant', 'Manage threads'],
    Viewer: ['View assistant', 'View role']
  };

  const handleRoleSelection = (role: "Admin" | "Editor" | "Viewer") => {
    setSelectedRole(selectedRole === role ? null : role);
    setShowInviteLink(false);
    setTimeout(() => setShowInviteLink(true), 100);
  };

  const simulateError = () => {
    setError('An error occurred while loading the content.');
    setTimeout(() => setError(null), 5000);
  };

  const getBadgeColor = (role: "Admin" | "Editor" | "Viewer") => {
    const permissionCount = roleToPermissionsMap[role].length;
    if (permissionCount > 5) return 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500';
    if (permissionCount > 3) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500';
    if (permissionCount > 1) return 'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500';
    return 'bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-white';
  };

  return (
    <div>
      <div className="p-4 bg-white w-1/2">
        <h2 className="text-base font-semibold mb-2">Invites</h2>
        <p className="text-sm text-custom-gray-dark mb-4">Invite new users to your organization and manage their roles.</p>
      </div>
      
      <div className="p-4">
        {error && (
          <div className="fixed top-4 right-4 z-50">
            <AlertError message={error} onClose={() => setError(null)} description={''} />
          </div>
        )}
          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 mb-4 w-1/2">
            <h3 className="text-base font-semibold mb-1">Existing Roles</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {existingRoles.map((role) => (
                <div key={role} className="relative">
                  <div className={`hs-tooltip [--trigger:hover] inline-block ${selectedRole && selectedRole !== role ? 'pointer-events-none' : ''}`}>
                    <span
                      className={`inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium cursor-pointer ${getBadgeColor(role as "Admin" | "Editor" | "Viewer")} ${selectedRole && selectedRole !== role ? 'opacity-50' : ''}`}
                      onClick={() => handleRoleSelection(role as "Admin" | "Editor" | "Viewer")}
                    >
                      {role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {showInviteLink && (
              <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 mt-4 transition-transform transform duration-500 ease-out">
                <h3 className="text-base font-semibold mb-1">Invite Link</h3>
                <p className="text-sm text-custom-gray-dark mb-2">
                  Share this invite link with the user to grant them access.
                </p>
                <textarea
                  readOnly
                  value={`https://example.com/invite?role=${selectedRole}`}
                  className="w-full p-1 mb-2 border border-gray-200 rounded bg-white text-sm text-custom-gray-dark"
                  rows={2}
                  placeholder="Invite link"
                />
                <button className="w-full px-2 py-1 bg-gray-100 text-sm font-semibold text-gray-700 rounded hover:bg-gray-200">
                  Copy Link
                </button>
              </div>
            )}
          </div>
          <button onClick={simulateError} className="mt-4 py-2 px-4 bg-red-600 text-white rounded">
            Simulate Error
          </button>
      
      </div>
    </div>
  );
};

export default Invite;
