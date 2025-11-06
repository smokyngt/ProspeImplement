import React, { useMemo, useState } from 'react';
import CreateRoleModal from './create-role.orga';
import AlertSuccess from '@/components/ui/base/Alert/alertSuccess';
import AlertError from '@/components/ui/base/Alert/alertError';
import {
  useRoles,
  useCreateRole,
  useDeleteRole,
  type RoleScope,
  type AssistantScope,
} from './hooks/roleStore';

const RoleManagementTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [success, setSuccess] = useState<string | null>(null);

  // ✅ React Query hooks
  const { data, isLoading, error } = useRoles();
  const roles = data?.items ?? [];
  const createRole = useCreateRole();
  const deleteRole = useDeleteRole();

  const filteredRoles = useMemo(
    () => roles.filter((r) => r.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [roles, searchTerm]
  );

  const handleCreateRole = async (
    roleName: string,
    scopes: RoleScope[],
    assistants: Array<{ id: string; scopes: AssistantScope[] }>
  ) => {
    try {
      await createRole.mutateAsync({ name: roleName, scopes, assistants });
      setSuccess('Role created successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      console.error('Failed to create role:', err);
    }
  };

  const handleDeleteRole = async (roleId: string) => {
    try {
      await deleteRole.mutateAsync(roleId);
      setSuccess('Role deleted successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      console.error('Failed to delete role:', err);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const mapScopesToPermissions = (scopes?: RoleScope[]): string[] => {
    if (!scopes) return [];

    const permissionMap: Record<RoleScope, string> = {
      owner: 'Owner',
      organization: 'Manage Organization',
      assistants: 'Manage Assistants',
      roles: 'Manage Roles',
      members: 'Manage Members',
      logs: 'View Logs',
      apiKeys: 'Manage API Keys',
      invitations: 'Manage Invitations',
    };

    return scopes.map((scope) => permissionMap[scope] || scope);
  };

  return (
    <>
      {/* Alerts */}
      {error && (
        <div className="fixed top-4 right-4 z-50">
          <AlertError
            message={(error as Error).message || 'Error loading roles'}
            onClose={() => {}}
            description=""
          />
        </div>
      )}

      {createRole.error && (
        <div className="fixed top-4 right-4 z-50">
          <AlertError
            message={(createRole.error as any)?.message || 'Error creating role'}
            onClose={() => createRole.reset()}
            description=""
          />
        </div>
      )}

      {deleteRole.error && (
        <div className="fixed top-4 right-4 z-50">
          <AlertError
            message={(deleteRole.error as any)?.message || 'Error deleting role'}
            onClose={() => deleteRole.reset()}
            description=""
          />
        </div>
      )}

      {success && (
        <div className="fixed top-4 right-4 z-50">
          <AlertSuccess message={success} onClose={() => setSuccess(null)} />
        </div>
      )}

      <section className="w-full max-w-6xl p-4">
        <header className="mb-4">
          <h2 className="text-base font-semibold mb-1">Manage Roles</h2>
          <p className="text-sm text-gray-600">
            View and manage roles with their permissions and assistant access.
          </p>
        </header>

        <div className="border border-gray-200 rounded-xl shadow-sm bg-white overflow-hidden">
          <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200">
            <div className="relative max-w-sm">
              <input
                type="text"
                placeholder="Search by name"
                className="py-2 pl-10 pr-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              data-hs-overlay="#hs-basic-modal"
              disabled={isLoading || createRole.isPending}
            >
              <svg
                className="shrink-0 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              Create Role
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-start text-xs font-semibold uppercase text-gray-800">
                    Name
                  </th>
                  <th className="px-6 py-3 text-start text-xs font-semibold uppercase text-gray-800">
                    Permissions
                  </th>
                  <th className="px-6 py-3 text-start text-xs font-semibold uppercase text-gray-800">
                    Created
                  </th>
                  <th className="px-6 py-3 text-end"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    </td>
                  </tr>
                ) : filteredRoles.length > 0 ? (
                  filteredRoles.map((role) => (
                    <tr key={role.id}>
                      <td className="px-6 py-3 whitespace-nowrap">
                        <span className="text-sm font-semibold text-gray-800">{role.name}</span>
                      </td>
                      <td className="px-6 py-3">
                        <span className="text-sm text-gray-800">
                          {mapScopesToPermissions(role.scopes).join(', ')}
                        </span>
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap">
                        <span className="text-sm text-gray-500">{formatDate(role.createdAt)}</span>
                      </td>
                      <td className="px-6 py-1.5 text-end">
                        <button
                          className="text-sm text-red-600 hover:text-red-800 disabled:opacity-50"
                          onClick={() => handleDeleteRole(role.id)}
                          disabled={deleteRole.isPending}
                        >
                          {deleteRole.isPending ? 'Deleting...' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-500">
                      No roles found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <CreateRoleModal onCreateRole={handleCreateRole} />
      </section>
    </>
  );
};

export default RoleManagementTable;